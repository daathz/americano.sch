/**
 * Delete a selected order by ID
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel
  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    orderModel.findById(req.params.orderid, (err, order) => {
      if ((order._user === req.session.userid) || req.session.admin) {
        orderModel.findOne({ _id: req.params.orderid }, (err, order) => {
          if (err) return next(err)
          let eventid = order._event
          orderModel.remove({ _id: req.params.orderid }, (err) => {
            if (err) return next(err)
            eventModel.findOne({ _id: eventid }, (err, event) => {
              if (err) return next(err)
              event.orders -= 1
              event.save((err) => {
                if (err) return next(err)
                return next()
              })
            })
          })
        })
      }
    })
  }
}