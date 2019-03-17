const redirectMW = require('../middlewares/user/redirect')
const authUserMW = require('../middlewares/user/authUser')
const createUserMW = require('../middlewares/user/createUser')
const loginUserMW = require('../middlewares/user/loginUser')
const forgotPasswordMW = require('../middlewares/user/forgotPassword')
const renderMW = require('../middlewares/render')
const createOrderMW = require('../middlewares/order/createOrder')
const deleteOrderMW = require('../middlewares/order/deleteOrder')
const getOrderOfUserMW = require('../middlewares/order/getOrdersOfUser')
const getOrdersMW = require('../middlewares/order/getAllOrder')
const getFoodListMW = require('../middlewares/food/getFoods')
const deleteFoodMW = require('../middlewares/food/deleteFood')
const createFoodMW = require('../middlewares/food/createFood')

module.exports = (app) => {

  let objRepo = {
  }

  app.use('/',
    redirectMW(objRepo))

  app.use('login',
    authUserMW(objRepo),
    loginUserMW(objRepo),
    renderMW(objRepo, 'login'))
  app.use('register',
    authUserMW(objRepo),
    createUserMW(objRepo),
    renderMW(objRepo, 'register'))
  app.use('forgot',
    authUserMW(objRepo),
    forgotPasswordMW(objRepo),
    renderMW(objRepo, 'forgot'))

  app.get('order',
    authUserMW(objRepo),
    getOrderOfUserMW(objRepo),
    renderMW(objRepo, 'order'))
  app.post('order',
    authUserMW(objRepo),
    createOrderMW(objRepo),
    renderMW(objRepo, 'order'))
  app.use('order/delete',
    authUserMW(objRepo),
    deleteOrderMW(objRepo),
    renderMW(objRepo, 'order'))

  app.get('orders',
    authUserMW(objRepo),
    getOrdersMW(objRepo),
    renderMW(objRepo, 'orders'))
  app.use('orders/delete',
    authUserMW(objRepo),
    deleteOrderMW(objRepo),
    renderMW(objRepo, 'orders'))

  app.get('foodlist',
    authUserMW(objRepo),
    getFoodListMW(objRepo),
    renderMW(objRepo, 'foodlist'))
  app.use('foodlist/new',
    authUserMW(objRepo),
    createFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))
  app.use('foodlist/delete',
    authUserMW(objRepo),
    deleteFoodMW(objRepo),
    renderMW(objRepo), 'foodlist')
}