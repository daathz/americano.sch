module.exports = (objRepo) => {

  let userModel = objRepo.userModel

  return (req, res, next) => {
    if ((typeof req.body === 'undefined') ||
      (typeof req.body.name === 'undefined') ||
      (typeof req.body.room === 'undefined') ||
      (typeof req.body.password === 'undefined') ||
      (typeof req.body.passwordC === 'undefined')) {
      return next()
    }

    if ((req.body.password === '') ||
      (req.body.password !== req.body.passwordC)) {
      res.tpl.error.push('Password confirmation failed!')
      return next()
    }

    userModel.findOne({_id: req.session.userid}, (err, user) => {
      if (err || !user) return next(err)
      else {
        user.name = req.body.name
        user.room = req.body.room
        user.password = req.body.password
        user.save((err) => {
          if (err) return next(err)
          res.redirect('/')
        })
      }
    })
  }
}