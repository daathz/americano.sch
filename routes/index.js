const redirectMW = require('../middlewares/user/redirect')
const authUserMW = require('../middlewares/user/authUser')
const createUserMW = require('../middlewares/user/createUser')
const loginUserMW = require('../middlewares/user/loginUser')
const forgotPasswordMW = require('../middlewares/user/forgotPassword')
const logoutUserMW = require('../middlewares/user/logoutUser')
const renderMW = require('../middlewares/render')

const userModel = require('../models/user')

module.exports = (app) => {
  let objRepo = {
    userModel: userModel
  }


  app.get('/',
    redirectMW(objRepo))

  app.use('/login',
    loginUserMW(objRepo),
    renderMW(objRepo, 'login'))

  app.use('/register',
    createUserMW(objRepo),
    renderMW(objRepo, 'register'))

  app.use('/forgot',
    forgotPasswordMW(objRepo),
    renderMW(objRepo, 'forgot'))

  app.get('/logout',
    logoutUserMW(objRepo),
    (req, res) => res.redirect('/'))
}