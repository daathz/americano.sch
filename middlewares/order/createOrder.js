/**
 * Create an order for the user
 */
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
    let quantities = []
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== '' && req.body[key] >= 1) {
        order.foods.push({name: key, quantity: req.body[key]})
        quantities.push(req.body[key])
      }
    })

    if (order.foods.length === 0) return next()

    let currentDate = new Date()
    eventModel.findOne({
      start: {$lte: currentDate},
      end: {$gte: currentDate}
    }, (err, event) => {
      if (err || !event) {
        res.tpl.error.push('There is currently no event!')
        return next(err)
      }
      order._event = event._id
      quantities.forEach((quantity => {
        event.orders += parseInt(quantity)
      }))
      if (event.orders > event.maxOrders) {
        res.tpl.error.push('There is no more food for this event!')
        return next()
      }
      event.save((err) => {
        if (err) return next(err)
        order.save((err) => {
          if (err) return next(err)
          res.redirect('/order')
        })
      })
    })
  }
}