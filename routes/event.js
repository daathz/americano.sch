const authUserMW = require('../middlewares/user/authUser')
const authAdminMW = require('../middlewares/user/authAdmin')
const getEventsMW = require('../middlewares/event/getEvents')
const createEventMW = require('../middlewares/event/createEvent')
const getOrdersMW = require('../middlewares/event/getOrdersOfEvent')
const renderMW = require('../middlewares/render')

const eventModel = require('../models/event')
const orderModel = require('../models/order')

module.exports = (app) => {
  let objRepo = {
    eventModel: eventModel,
    orderModel: orderModel
  }


  app.use('/events/new',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    createEventMW(objRepo),
    renderMW(objRepo, 'newevent'))

  app.get('/events/:eventid',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    getOrdersMW(objRepo),
    renderMW(objRepo, 'orders'))

  app.get('/events',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    getEventsMW(objRepo),
    renderMW(objRepo, 'events'))
}