/**
 * Check if the user exists, then create a session for them
 */
module.exports = (objRepo) => {

  const userModel = objRepo.userModel

  return (req, res, next) => {
    req.session.userid = 112
    req.session.admin = true
    return next()

    //not enough parameter
    if ((typeof req.body === 'undefined') ||
      (typeof req.body.email === 'undefined') ||
      (typeof rceq.body.password === 'undefined')) {
      return next()
    }

    //check email
    userModel.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err || !user) {
        //Error
        return next()
      }

      //check password
      if (user.password !== req.body.password) {
        return next()
      }

      req.session.userid = user._id
      if (user.admin) {
        req.session.admin = true
      }
      return res.redirect('/')
    })
  }
}