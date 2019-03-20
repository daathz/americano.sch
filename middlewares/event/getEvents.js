module.exports = (objRepo) => {

  let eventModel = objRepo.eventModel

  return (req, res, next) => {

    res.tpl.events = []
    eventModel.find({}, (err, events) => {
      res.tpl.events = events
      return next()
    })
  }
}