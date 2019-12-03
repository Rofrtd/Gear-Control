const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgresql://postgres:@localhost:5432/gear-control'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/index.html', appAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/', appAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(express.static('public'))

function appAuth(req, res, next) {
    try {
        jwt.verify(req.cookies.access_token, 'abc');
        next()
    } catch(err) {
        return res.redirect(307, '/login')
    }
}

function apiAuth(req, res, next) {
    try {
        jwt.verify(req.cookies.access_token, 'abc');
        next()
    } catch(err) {
        return res.status(401).json({ message: 'UNAUTHORISED!' })
    }
}

const apiRouter = express.Router()

apiRouter.use(apiAuth)

apiRouter.get('/projects', async (req, res) => {
    res.json((await knex('projects')))
});

apiRouter.post('/add-project', async (req, res) => {
    const trx = await knex.transaction();
    const uId = uuidv1()

    try{
        await knex('projects').insert({
            id: uId,
            name: req.body.name,
            customer_id: req.body.customer,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        })

        await Promise.all(req.body.equipmentIds.map((equipmentId) =>{
            return trx('equipment_allocation')
                .insert({
                    project_id: uId,
                    equipment_id: equipmentId
                })
        }))

        await trx.commit();
        console.log(req.body)
        res.json({ message: "OK" });
        
    } catch(error) {
        trx.rollback()   
        console.log(error)
        res.status(500).json({ message: error.message })
   
    }

})

apiRouter.get('/edit-project/:projectId', async (req, res) => {
    try { 
        const data = await knex.raw(`select
                projects.*, customers.name as customer_name, equipment_allocation.equipment_id, equipment.internal_id
            from 
                projects
            left join
                customers on projects.customer_id = customers.id 
            left join 
                equipment_allocation on projects.id = equipment_allocation.project_id
            left join
                equipment on equipment_allocation.equipment_id = equipment.id
            where 
                projects.id = ?
            `, [req.params.projectId])

            let project = {
                id: data.rows[0].id,
                name: data.rows[0].name,
                created_on: data.rows[0].created_on,
                customer_id: data.rows[0].customer_id,
                start_date: data.rows[0].start_date,
                end_date: data.rows[0].end_date,
                customer_name: data.rows[0].customer_name,
                equipment: [{
                    id: data.rows[0].equipment_id,
                    internal_id: data.rows[0].internal_id
                }]
            }
            
            for(let i = 1; i < data.rows.length; i++){
                project.equipment.push({
                    id: data.rows[i].equipment_id, 
                    internal_id: data.rows[i].internal_id 
                })
            }
                res.json({project, equipment: []})
        }
    catch(error) {
        console.log(error)
         res.status(500).json({ message: error.message })
    }
});

apiRouter.put('/edit-project/:projectId', async (req, res) => {
    const trx = await knex.transaction();
    
    try {
        await trx.raw(`
            UPDATE 
                projects 
            SET 
                name= ?,
                start_date= ?,
                end_date= ?
            WHERE
                id = ?;
            `, [
                req.body.name,
                req.body.start_date, 
                req.body.end_date, 
                req.params.projectId
            ])

        await trx.raw(`
            DELETE FROM
                equipment_allocation
            WHERE
                project_id = ?;
            `,[req.params.projectId])
        
        await Promise.all(req.body.equipmentIds.map((equipmentId) =>{
            return trx.raw(`
                INSERT INTO
                    equipment_allocation
                    (project_id, equipment_id)    
                VALUES
                    (?, ?);
            `, [req.params.projectId, equipmentId])
        }))
    
        await trx.commit();
        res.json({ message: "OK" })
    }
    catch(error) {
        trx.rollback()  
        console.log(error)
        res.status(500).json({ message: error.message })
    }
});
    
apiRouter.get('/equipment_allocation', async (req, res) => {
    res.json((await knex('equipment_allocation')))
});

apiRouter.get('/customers', async (req, res) => {
    res.json((await knex('customers')))
});

apiRouter.post('/add-customer', async (req, res) => {
    try {
         await knex('customers').insert({
             id: uuidv1(),
             name: req.body.name,
             country: req.body.country,
             state: req.body.state,
             street: req.body.street,
             suburb: req.body.suburb
         })
     
         res.json({ message: "OK" });
    } catch(error){   
         console.log(error)
         res.status(500).json({ message: error.message })
    }
 })

apiRouter.get('/equipment', async (req, res) => {
    res.json((await knex('equipment')))
});

apiRouter.post('/add-equipment', async (req, res) => {
   try {
        await knex('equipment').insert({
            id: uuidv1(),
            type: req.body.equipment_type,
            model: req.body.equipment_model,
            serial_number: req.body.equipment_serial_number,
            internal_id: req.body.equipment_id,
            last_calibration: req.body.equipment_last_calibration_date,
            calibration_period: req.body.equipment_calibration_period,
            notification: req.body.equipment_calibration_notification,
        })
    
        res.json({ message: "OK" });
   } catch(error){   
        console.log(error)
        res.status(500).json({ message: error.message })
   }
})

app.post(`/login`, async(req, res) => {
    if(req.body.username == process.env.ADMIN_USERNAME && req.body.password == process.env.ADMIN_PASSWORD){
        const token = jwt.sign({ }, 'abc');
        res.status(201)
        .cookie('access_token', token, {
            expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
        })
        .redirect(301, '/')
    } else {
        res.redirect(301, '/login')
    }
})

app.get('/login', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.use('/api', apiRouter)

app.get(/^((?!\/api).)*$/, appAuth, (req, res) => {
    //falls back 404 to index.html so that SPA handles 404 pages
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

