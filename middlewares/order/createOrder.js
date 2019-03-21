module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel
  let userModel = objRepo.userModel
  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (Object.keys(req.body).length === 0)) {
      return next()
    }

    let order = new orderModel()
    order.comment = req.body.comment
    userModel.findById(req.session.userid, 'name room',
      (err, user) => {
        order.customer = user.name
        order.room = user.room
        order._user = user._id
      })

    delete req.body['comment']
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== '' && req.body[key] >= 1) {
        order.foods.push({name: key, quantity: req.body[key]})
      }
    })

    if (order.foods.length === 0) return next()

    eventModel.findOne({}, (err, event) => {
      if (err || !event) return next(err)
      //FIXME
      order._event = event._id
      //FIXME
      event.orders += 1
      event.save((err, result) => {
        if (err) return next(err)
        order.save((err, order) => {
          if (err) return next(err)
          res.redirect('/order')
        })
      })


    })
  }
}