/**
 * Get the orders the authenticated user
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {
    res.tpl.orders = []

    orderModel.find({_user: req.session.userid}, (err, orders) => {
      if (err || !orders) next(err)
      res.tpl.orders = orders
      return next()
    })
  }
}