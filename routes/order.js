const authUserMW = require('../middlewares/user/authUser')
const createOrderMW = require('../middlewares/order/createOrder')
const updateOrderMW = require('../middlewares/order/updateOrder')
const getOrderOfUserMW = require('../middlewares/order/getOrdersOfUser')
const getOrderByIdMW = require('../middlewares/order/getOrderById')
const deleteOrderMW = require('../middlewares/order/deleteOrder')
const getFoodListMW = require('../middlewares/food/getFoods')
const renderMW = require('../middlewares/render')

const userModel = require('../models/user')
const orderModel = require('../models/order')
const foodModel = require('../models/food')
const eventModel = require('../models/event')

module.exports = (app) => {
  let objRepo = {
    userModel: userModel,
    orderModel: orderModel,
    foodModel: foodModel,
    eventModel: eventModel
  }

  app.use('/order/:orderid/delete',
    authUserMW(objRepo),
    deleteOrderMW(objRepo),
    (req, res) => res.redirect('/order'))

  app.use('/order/:orderid',
    authUserMW(objRepo),
    getFoodListMW(objRepo),
    getOrderByIdMW(objRepo),
    updateOrderMW(objRepo),
    renderMW(objRepo, 'modorder'))

  app.use('/order',
    authUserMW(objRepo),
    getFoodListMW(objRepo),
    getOrderOfUserMW(objRepo),
    createOrderMW(objRepo),
    renderMW(objRepo, 'order'))
}