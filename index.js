const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static('public'))

app.use((req, res) => {
    // falls back 404 to index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

