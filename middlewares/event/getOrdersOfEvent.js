module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {

    orderModel.find({ _event: req.params.eventid }, (err, orders) => {
      if (err) return next()
      res.tpl.orders = orders
      return next()
    })
  }
}