module.exports = (objRepo) => {
  return (req, res, next) => {

    let eventModel = objRepo.eventModel

    if ((typeof req.body === 'undefined') ||
      (typeof req.body.startevent === 'undefined') ||
      (typeof req.body.endevent === 'undefined')) {
      return next()
    }

    eventModel.create({
      start: req.body.startevent,
      end: req.body.endevent
    }, (err, event) => {
      return res.redirect('/events')
    })
  }
}