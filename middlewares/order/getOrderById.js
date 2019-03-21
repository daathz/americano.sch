module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {

    res.tpl.order = {}
    orderModel.findOne({ _id: req.params.orderid }, (err, order) => {
      if (err) return next(err)
      res.tpl.order = order
      return next()
    })
  }
}