/**
 * Delete the selected food from database
 */
module.exports = (objRepo) => {

  let foodModel = objRepo.foodModel
  let eventModel = objRepo.eventModel
  let currentDate = new Date()

  return (req, res, next) => {

    foodModel.findOne({_id: req.params.foodid}, (err, food) => {
      if (err || !food) return next(err)
      else {
        eventModel.findOne({
          start: {$lte: currentDate},
          end: {$gte: currentDate}
        }, (err, event) => {
          if (err) return next(err)
          else if (event) {
            res.tpl.error.push('You cannot delete food during events!')
            return next()
          } else {
            foodModel.remove({_id: req.params.foodid}, (err) => {
              if (err) return next(err)
              return next()
            })
          }
        })
      }
    })
  }
}