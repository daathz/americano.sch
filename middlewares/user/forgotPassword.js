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
        if (err || !user) {
          res.tpl.error.push('There is no user with this email address')
          return next(user)
        }
        else {
          res.tpl.info.push('Your password is set to: "default"')
          return next()
        }
      })
  }
}