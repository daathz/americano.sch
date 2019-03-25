/**
 * Get the data of the selected order
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {

    res.tpl.order = {}
    orderModel.findOne({ _id: req.params.orderid }, (err, order) => {
      if (err || !order) return next(err)
      res.tpl.order = order
      return next()
    })
  }
}