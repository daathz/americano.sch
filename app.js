const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))

app.get('/', (req, res) => res.sendFile('login.html', { root: __dirname + '/static' }))

const server = app.listen(port, () => console.log(`App started on port ${port}`))