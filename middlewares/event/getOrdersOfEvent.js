/**
 * Get the orders of the selected event and send them to the next middleware
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {

    orderModel.find({ _event: req.params.eventid }, (err, orders) => {
      if (err || !orders) return next()
      res.tpl.orders = orders
      return next()
    })
  }
}