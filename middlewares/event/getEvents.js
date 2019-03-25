/**
 * Get all of the events and send it tot the next middlewares to list them
 */
const moment = require('moment')

module.exports = (objRepo) => {

  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    res.tpl.events = []
    eventModel.find({}, (err, events) => {
      if (err || !events) return next(err)
      res.tpl.events = []
      events.forEach((event) => {
        let startDate = (moment(event.start)
          .format('YYYY-MM-DD HH:mm'))
        let endDate = (moment(event.end)
          .format('YYYY-MM-DD HH:mm'))
        res.tpl.events.push({
          start: startDate,
          end: endDate,
          _id: event._id,
          orders: event.orders
        })

      })
      return next()
    })
  }
}