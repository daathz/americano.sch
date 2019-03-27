/**
 * Update the name and description of the selected food
 */
module.exports = (objRepo) => {

  let foodModel = objRepo.foodModel

  return (req, res, next) => {
    if ((typeof req.body === 'undefined') ||
      (typeof req.body.name === 'undefined') ||
      (typeof req.body.description === 'undefined')) {
      return next()
    }

    foodModel.findByIdAndUpdate(req.params.foodid, {
      name: req.body.name,
      description: req.body.description
    }, (err) => {
      if (err) return next(err)
      res.redirect('/foods')
    })
  }
}