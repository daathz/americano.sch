/**
 * Get the orders the authenticated user
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel
  let eventModel = objRepo.eventModel

  return (req, res, next) => {
    res.tpl.orders = []
    let currentDate = new Date()

    eventModel.findOne({
      start: {$lte: currentDate},
      end: {$gte: currentDate}
    }, (err, event) => {
      if (err || !event) return next(err)
      orderModel.find({
        _user: req.session.userid,
        _event: event
      }, (err, orders) => {
        if (err || !orders) return next(err)
        res.tpl.orders = orders
        return next()
      })
    })
  }
}