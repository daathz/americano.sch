const redirectMW = require('../middlewares/user/redirect')
const authUserMW = require('../middlewares/user/authUser')
const createUserMW = require('../middlewares/user/createUser')
const loginUserMW = require('../middlewares/user/loginUser')
const forgotPasswordMW = require('../middlewares/user/forgotPassword')
const logoutUserMW = require('../middlewares/user/logoutUser')
const renderMW = require('../middlewares/render')

const deleteOrderMW = require('../middlewares/order/deleteOrder')
const getOrdersMW = require('../middlewares/order/getAllOrder')

module.exports = (app) => {
  let objRepo = {}


  app.get('/',
    redirectMW(objRepo))


  app.get('/login',
    authUserMW(objRepo),
    loginUserMW(objRepo),
    renderMW(objRepo, 'login'))

  app.use('/register',
    authUserMW(objRepo),
    createUserMW(objRepo),
    renderMW(objRepo, 'register'))

  app.use('/forgot',
    authUserMW(objRepo),
    forgotPasswordMW(objRepo),
    renderMW(objRepo, 'forgot'))

  app.get('logout',
    logoutUserMW(objRepo),
    (req, res) => res.redirect('/'))

  app.get('/orders',
    authUserMW(objRepo),
    getOrdersMW(objRepo),
    renderMW(objRepo, 'orders'))
  app.use('/orders/delete',
    authUserMW(objRepo),
    deleteOrderMW(objRepo),
    renderMW(objRepo, 'orders'))
}