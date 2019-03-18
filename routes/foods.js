const authUserMW = require('../middlewares/user/authUser')
const getFoodListMW = require('../middlewares/food/getFoods')
const deleteFoodMW = require('../middlewares/food/deleteFood')
const updateFoodMW = require('../middlewares/food/updateFood')
const renderMW = require('../middlewares/render')


module.exports = (app) => {
  let objRepo = {}

  app.get('/foods',
    authUserMW(objRepo),
    getFoodListMW(objRepo),
    renderMW(objRepo, 'foods'))

  app.get('/foods/new',
    authUserMW(objRepo),
    updateFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))

  app.get('/foods/:foodid',
    authUserMW(objRepo),
    updateFoodMW(objRepo),
    renderMW(objRepo, 'newfood'))

  app.use('/foods/delete',
    authUserMW(objRepo),
    deleteFoodMW(objRepo),
    renderMW(objRepo, 'foods'))
}