/**
 * Create an order
 */
module.exports = (objRepo) => {

  let orderModel = objRepo.orderModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (Object.keys(req.body).length === 0)) {
      orderModel.findOne({_id: req.params.orderid}, (err, order) => {
        res.tpl.order = order
        if (err) return next(err)
        return next()
      })
    }

    let mods = []
    delete req.body['comment']
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== '' && req.body[key] >= 1) {
        mods.push({name: key, quantity: req.body[key]})
      }
    })

    console.log(mods)
    orderModel.findOneAndUpdate({_id: req.params.orderid}, {foods: mods},
      (err, order) => {
        if (err) return next(err)
        res.tpl.order = order
        return next()
      }
    )
  }
}