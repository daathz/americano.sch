const authUserMW = require('../middlewares/user/authUser')
const updateOrderMW = require('../middlewares/order/updateOrder')
const getOrderOfUserMW = require('../middlewares/order/getOrdersOfUser')
const deleteOrderMW = require('../middlewares/order/deleteOrder')
const getFoodListMW = require('../middlewares/food/getFoods')
const renderMW = require('../middlewares/render')

const foodModel = require('../models/food')

module.exports = (app) => {
  let objRepo = {
    foodModel: foodModel
  }

  app.get('/order',
    authUserMW(objRepo),
    getFoodListMW(objRepo),
    getOrderOfUserMW(objRepo),
    renderMW(objRepo, 'order'))

  app.post('/order',
    authUserMW(objRepo),
    updateOrderMW(objRepo),
    (req, res) => {
      return res.redirect('/order')
    })

  app.use('/order/:orderid',
    authUserMW(objRepo),
    updateOrderMW(objRepo),
    renderMW(objRepo, 'editorder'))

  app.use('/order/delete/:orderid',
    authUserMW(objRepo),
    deleteOrderMW(objRepo),
    renderMW(objRepo, 'order'))
}