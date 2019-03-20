const authUserMW = require('../middlewares/user/authUser')
const authAdminMW = require('../middlewares/user/authAdmin')
const getFoodListMW = require('../middlewares/food/getFoods')
const deleteFoodMW = require('../middlewares/food/deleteFood')
const updateFoodMW = require('../middlewares/food/updateFood')
const renderMW = require('../middlewares/render')

const foodModel = require('../models/food')

module.exports = (app) => {
  let objRepo = {
    foodModel: foodModel
  }

  app.get('/foods',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    getFoodListMW(objRepo),
    renderMW(objRepo, 'foods'))

  app.get('/foods/new',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    updateFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))

  app.get('/foods/:foodid',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    updateFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))

  app.use('/foods/delete',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    deleteFoodMW(objRepo),
    renderMW(objRepo, 'foods'))
}