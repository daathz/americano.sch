/**
 * Create an event if the start and end dates are correct
 */
module.exports = (objRepo) => {

  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (typeof req.body.startevent === 'undefined') ||
      (typeof req.body.endevent === 'undefined')) {
      return next()
    }

    if (req.body.startevent < req.body.endevent) {
      eventModel.findOne({
        start: {$lte: req.body.endevent},
        end: {$gte: req.body.startevent}
      }, (err, event) => {
        if (err || event) return next()
        else {
          eventModel.create({
            start: req.body.startevent,
            end: req.body.endevent
          }, (err) => {
            if (err) return next(err)
            res.redirect('/events')
          })
        }
      })
    } else return next()
  }
}