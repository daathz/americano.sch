/**
 * Delete a selected order by ID
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel
  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    let quantities = []
    orderModel.findOne({_id: req.params.orderid}, (err, order) => {
      if (err || !order) return next(err)
      order.foods.forEach((food) => {
        quantities.push(parseInt(food.quantity))
      })
      eventModel.findOne({_id: order._event}, (err, event) => {
        if (err || !event) return next(err)
        quantities.forEach((quantity) => {
          event.orders -= quantity
        })
        orderModel.deleteOne({_id: req.params.orderid}, (err) => {
          if (err) return next(err)
          event.save()
          return next()
        })
      })
    })
  }
}