const authUserMW = require('../middlewares/user/authUser')
const createOrderMW = require('../middlewares/order/createOrder')
const getOrderOfUserMW = require('../middlewares/order/getOrdersOfUser')
const deleteOrderMW = require('../middlewares/order/deleteOrder')
const getFoodListMW = require('../middlewares/food/getFoods')
const renderMW = require('../middlewares/render')

module.exports = (app) => {
  let objRepo = {}

  app.get('/order',
    authUserMW(objRepo),
    getFoodListMW(objRepo),
    getOrderOfUserMW(objRepo),
    renderMW(objRepo, 'order'))

  app.use('/order',
    authUserMW(objRepo),
    createOrderMW(objRepo),
    renderMW(objRepo, 'order'))

  app.use('/order/delete',
    authUserMW(objRepo),
    deleteOrderMW(objRepo),
    renderMW(objRepo, 'order'))
}