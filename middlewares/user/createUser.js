/**
 * Check the email address and validate it, then register the account
 */
module.exports = (objRepo) => {
  let userModel = objRepo.userModel

  return (req, res, next) => {

    if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
      (typeof req.body.password === 'undefined') ||
      (typeof req.body.name === 'undefined') || (typeof req.body.room === 'undefined')) {
      return next()
    }

    userModel.findOne({
      email: req.body.email
    }, (err, user) => {
      if (user.email === req.body.email) {
        return next()
      }
    })

    let newUser = new userModel()
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.room = req.body.room
    newUser.password = req.body.password
    newUser.save((err) => {
      return next()
    })
  }
}