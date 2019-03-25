/**
 * Update the selected order
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel
  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (Object.keys(req.body).length === 0)) {
      return next()
    }

    let modFoods = []
    let quantities = []
    let modComment = req.body.comment
    delete req.body['comment']
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== '' && req.body[key] >= 1) {
        modFoods.push({name: key, quantity: req.body[key]})
        quantities.push(parseInt(req.body[key]))
      }
    })

    if (modFoods.length === 0) return next()

    orderModel.findOneAndUpdate({_id: req.params.orderid}, {
      foods: modFoods,
      comment: modComment
    },
    (err, order) => {
      if (err || !order) return next(err)
      eventModel.findOne({_id: order._event}, (err, event) => {
        if (err || !event) return next(err)
        delete event.orders
        event.orders = 0
        quantities.forEach((quantity) => {
          event.orders += quantity
        })
        event.save((err) => {
          res.redirect('/order')
        })
      })
    })
  }
}