/**
 * Delete a selected order if it is checked
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {

    orderModel.findById(req.params.orderid, (err, order) => {
      if ((order._user === req.session.userid) || req.session.admin) {
        orderModel.deleteOne({ _id: req.params.orderid }, (err, order) => {
          if (err) return next(err)
          return next()
        })
      }
    })
  }
}