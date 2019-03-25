/**
 * Check if the user exists, then create a session for them
 */
module.exports = (objRepo) => {

  const userModel = objRepo.userModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') ||
      (typeof req.body.email === 'undefined') ||
      (typeof req.body.password === 'undefined')) {
      return next()
    }

    userModel.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err || !user) return next(err)

      if (user.password !== req.body.password) {
        return next()
      }

      req.session.userid = user._id
      if (user.admin) req.session.admin = true
      return res.redirect('/')
    })
  }
}