const authUserMW = require('../middlewares/user/authUser')
const authAdminMW = require('../middlewares/user/authAdmin')
const getFoodMW = require('../middlewares/food/getFoodById')
const getFoodListMW = require('../middlewares/food/getFoods')
const deleteFoodMW = require('../middlewares/food/deleteFood')
const createFoodMW = require('../middlewares/food/createFood')
const updateFoodMW = require('../middlewares/food/updateFood')
const renderMW = require('../middlewares/render')

const foodModel = require('../models/food')
const eventModel = require('../models/event')

module.exports = (app) => {
  let objRepo = {
    foodModel: foodModel,
    eventModel: eventModel
  }

  app.use('/foods/new',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    createFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))

  app.use('/foods/:foodid/delete',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    deleteFoodMW(objRepo),
    (req, res) => res.redirect('/foods')
  )

  app.use('/foods/:foodid',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    getFoodMW(objRepo),
    updateFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))


  app.use('/foods',
    authUserMW(objRepo),
    authAdminMW(objRepo),
    getFoodListMW(objRepo),
    renderMW(objRepo, 'foods'))
}