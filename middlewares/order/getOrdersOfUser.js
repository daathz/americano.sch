/**
 * Get the orders the authenticated user
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {
    res.tpl.orders = []

    orderModel.find({_user: req.session.userid}, (err, orders) => {
      //TODO only list the orders of the actual event
      if (err || !orders) next(err)
      res.tpl.orders = orders
      return next()
    })
  }
}