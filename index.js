const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser')

const knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgresql://postgres:@localhost:5432/gear-control'
})

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/api/projects', async (req, res) => {
    res.json((await knex('projects')))
});

app.post('/api/add-project', async (req, res) => {
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

app.get('/api/edit-project/:projectId', async (req, res) => {
    res.json((await knex('projects')
        .where({id: req.params.projectId})
        .select('*')))
        console.log(req.params.projectId)
});
    
app.get('/api/equipment_allocation', async (req, res) => {
    res.json((await knex('equipment_allocation')))
});

app.get('/api/customers', async (req, res) => {
    res.json((await knex('customers')))
});

app.post('/api/add-customer', async (req, res) => {
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

 app.get('/api/equipment', async (req, res) => {
    res.json((await knex('equipment')))
});

app.post('/api/add-equipment', async (req, res) => {
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

app.get(/^((?!\/api).)*$/, (req, res) => {
    //falls back 404 to index.html so that SPA handles 404 pages
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

