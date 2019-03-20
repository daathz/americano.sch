module.exports = (objRepo) => {

  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (typeof req.body.startevent === 'undefined') ||
      (typeof req.body.endevent === 'undefined')) {
      return next()
    }

    if (req.body.startevent < req.body.endevent) {
      eventModel.create({
        start: req.body.startevent,
        end: req.body.endevent
      }, (err, event) => {
        return res.redirect('/events')
      })
    } else {
      console.log('lel')
      return next()
    }
  }
}