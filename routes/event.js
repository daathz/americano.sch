const authAdminMW = require('../middlewares/user/authAdmin')
const getEventsMW = require('../middlewares/event/getEvents')
const createEventMW = require('../middlewares/event/createEvent')
const renderMW = require('../middlewares/render')
const getOrdersMW = require('../middlewares/event/getOrdersOfEvent')

module.exports = (app) => {
  let objRepo = {}

  app.get('/events',
    authAdminMW(objRepo),
    getEventsMW(objRepo),
    renderMW(objRepo, 'events'))

  app.use('/events/new',
    authAdminMW(objRepo),
    createEventMW(objRepo),
    renderMW(objRepo, 'newevent'))

  app.get('/events/:eventid',
    authAdminMW(objRepo),
    getOrdersMW(objRepo),
    renderMW(objRepo, 'orders'))
}