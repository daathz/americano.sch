/**
 * Delete the selected food from database
 */
module.exports = (objRepo) => {

  let foodModel = objRepo.foodModel

  return (req, res, next) => {

    foodModel.findOneAndDelete({ _id: req.params.foodid}, (err, result) => {
      if (err) next(err)
      return next()
    })
  }
}