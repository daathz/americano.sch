const redirectMW = require('../middlewares/user/redirect')
const authUserMW = require('../middlewares/user/authUser')
const inverseAuthUserMW = require('../middlewares/user/inverseAuthUser')
const createUserMW = require('../middlewares/user/createUser')
const getUserMW = require('../middlewares/user/getUserById')
const getUsersMW = require('../middlewares/user/getUsers')
const updateUserMW = require('../middlewares/user/updateUser')
const loginUserMW = require('../middlewares/user/loginUser')
const forgotPasswordMW = require('../middlewares/user/forgotPassword')
const logoutUserMW = require('../middlewares/user/logoutUser')
const authAdminMW = require('../middlewares/user/authAdmin')
const renderMW = require('../middlewares/render')

const userModel = require('../models/user')

module.exports = (app) => {
  let objRepo = {
    userModel: userModel
  }


  app.get('/',
    redirectMW(objRepo))

  app.use('/login',
    inverseAuthUserMW(objRepo),
    loginUserMW(objRepo),
    renderMW(objRepo, 'login'))

  app.use('/register',
    inverseAuthUserMW(objRepo),
    createUserMW(objRepo),
    renderMW(objRepo, 'register'))

  app.use('/forgot',
    inverseAuthUserMW(objRepo),
    forgotPasswordMW(objRepo),
    renderMW(objRepo, 'forgot'))

  app.use('/settings',
    authUserMW(objRepo),
    getUserMW(objRepo),
    updateUserMW(objRepo),
    renderMW(objRepo, 'settings'))

  app.use('/users',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    getUsersMW(objRepo),
    renderMW(objRepo, 'users'))

  app.get('/logout',
    logoutUserMW(objRepo),
    (req, res) => res.redirect('/'))
}