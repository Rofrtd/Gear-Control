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
   try {
        await knex('projects').insert({
            id: uuidv1(),
            name: req.body.name,
            created_on: 'NOW()',
            customer_id: req.body.customer,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        })
    
        res.json({ message: "OK" });
   } catch(error){   
        console.log(error)
        res.status(500).json({ message: error.message })
   }
})

app.get('/api/customers', async (req, res) => {
    res.json((await knex('customers')))
});

app.post('/api/add-customer', async (req, res) => {
    try {
         await knex('customers').insert({
             id: uuidv1(),
             name: req.body.name,
             created_on: 'NOW()',
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

app.get(/^((?!\/api).)*$/, (req, res) => {
    //falls back 404 to index.html so that SPA handles 404 pages
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

