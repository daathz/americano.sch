const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.tpl = {}
  return next()
})

require('./routes/index')(app)
require('./routes/order')(app)
require('./routes/foods')(app)
require('./routes/event')(app)

const server = app.listen(port, () =>
  console.log(`App started on port ${port}`))