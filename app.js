const dateFormat = require('dateformat')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  res.tpl = {
    foods: [
      { _id: 1, name: 'Hamburger', seo_name: 'hamburger', description: 'óriás buci, marhahús, ' +
          'saláta, paradicsom, uborka, hagyma, sajt, ketchup,' +
          'mustár, majonéz, speckó szósz', admin: false},
      {_id: 1, name: 'Hot-dog', seo_name: 'hotdog', description: 'friss kifli, pulykavirsli, ' +
          'saláta, paradicsom, uborka, hagyma, ketchup, mustár, majonéz, sajt',
      admin: false}
    ],
    orders: [
      { _id: 1, name: 'Feri', room: 123, food: 'Hamburger', quantity: 3,
        comment: '', event_id: 1},
      {_id: 2, name: 'Feri', room: 123, food: 'Hot-Dog', quantity: 1,
        comment: 'Lorem Ipsum', event_id: 1}
    ],
    events: [
      {_id: 1, start: dateFormat(new Date(2018, 2, 17),
        'yyyy-mm-dd h:MM:ss'),
      end: dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss'),
      numberOfOrders: 6,}
    ]
  }
  return next()
})

require('./routes/index')(app)
require('./routes/order')(app)
require('./routes/foods')(app)
require('./routes/event')(app)

const server = app.listen(port, () =>
  console.log(`App started on port ${port}`))