const moment = require('moment')

/**
 * Create an event if the start and end dates are correct
 */
module.exports = (objRepo) => {

  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (typeof req.body.startdate === 'undefined') ||
      (typeof req.body.starttime === 'undefined') ||
      (typeof req.body.enddate === 'undefined') ||
      (typeof req.body.endtime === 'undefined')) {
      return next()
    }

    let startevent = moment(req.body.startdate + ' ' + req.body.starttime,
      'YYYY-MM_DD HH:mm')
    let endevent = moment(req.body.enddate + ' ' + req.body.endtime,
      'YYYY-MM_DD HH:mm')

    if (startevent < endevent) {
      eventModel.findOne({
        start: {$lte: endevent},
        end: {$gte: startevent}
      }, (err, event) => {
        if (err || event) {
          res.tpl.error.push('Events cannot overlap each other!')
          return next()
        } else {
          eventModel.create({
            start: startevent,
            end: endevent
          }, (err) => {
            if (err) return next(err)
            res.redirect('/events')
          })
        }
      })
    } else {
      res.tpl.error.push('End date cannot be less than start date!')
      return next()
    }
  }
}