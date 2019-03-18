const authUserMW = require('../middlewares/user/authUser')
const getFoodListMW = require('../middlewares/food/getFoods')
const deleteFoodMW = require('../middlewares/food/deleteFood')
const createFoodMW = require('../middlewares/food/createFood')
const renderMW = require('../middlewares/render')


module.exports = (app) => {
  let objRepo = {}

  app.get('/foods',
    authUserMW(objRepo),
    getFoodListMW(objRepo),
    renderMW(objRepo, 'foods'))

  app.use('/foods/new',
    authUserMW(objRepo),
    createFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))

  app.use('/foods/delete',
    authUserMW(objRepo),
    deleteFoodMW(objRepo),
    renderMW(objRepo, 'foodlist'))
}