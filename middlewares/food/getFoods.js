/**
 * Get the list of all food and collect it to send to view
 */
module.exports = (objRepo) => {

  let foodModel = objRepo.foodModel

  return (req, res, next) => {

    res.tpl.foods = []
    foodModel.find({}, (err, foods) => {
      res.tpl.foods = foods
      return next()
    })

  }
}