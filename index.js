const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static('public'))

app.use((req, res) => {
    if (req.get('Content-Type') === 'application/json') {
        res.status(404).send({ message: 'Not found' });
    } else {
        // falls back to index.html so that the SPA can handle 404
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

