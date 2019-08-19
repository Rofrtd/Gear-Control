const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const { Pool } = require('pg')
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser')

const pool = new Pool({  
    connectionString: 'postgresql://postgres:@localhost:5432/gear-control'
})

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/api/projects', async (req, res) => {
    res.json((await pool.query("SELECT * FROM projects")).rows)
});

app.post('/api/add-project', async (req, res) => {
   try {
        await pool.query({
            text: 'INSERT INTO projects(id, name, created_on) VALUES($1, $2 , NOW())',
            values: [uuidv1(), req.body.name]
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

