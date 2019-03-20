/**
 * Create a food with name and description
 */
module.exports = (objRepo) => {

  let foodModel = objRepo.foodModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (typeof req.body.name === 'undefined') ||
      (typeof req.body.description === 'undefined')) {
      return next()
    }

    //create
    let food = foodModel()
    food.name = req.body.name
    food.description = req.body.description
    food.save((err, result) => res.redirect('/foods'))
  }
}