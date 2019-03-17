const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))

require('./routes/index')(app)

const server = app.listen(port, () => console.log(`App started on port ${port}`))