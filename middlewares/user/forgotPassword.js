/**
 * Check the email address and if it exists reset the password for them
 */
module.exports = (objRepo) => {

  let userModel = objRepo.userModel

  return (req, res, next) => {
    if ((typeof req.body === 'undefined') ||
      (typeof req.body.email === 'undefined')) {
      return next()
    }

    userModel.findOneAndUpdate({email: req.body.email}, {password: 'default'},
      (err, user) => {
        if (err || !user) return next(user)
        else {
          res.tpl.info = 'Your password is set to: "default"'
          return next()
        }
      })
  }
}