module.exports = (objRepo) => {

  let foodModel = objRepo.foodModel

  return (req, res, next) => {

    foodModel.findById(req.params.foodid, (err, food) => {
      if (err) return next(err)
      res.tpl.food = food
      return next()
    })
  }
}