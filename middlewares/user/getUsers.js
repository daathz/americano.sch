/**
 * Get the list of all users
 */
module.exports = (objRepo) => {

  let userModel = objRepo.userModel

  return (req, res, next) => {
    userModel.find({}, (err, users) => {
      if (err) return next(err)
      res.tpl.users = users
      return next()
    })
  }
}