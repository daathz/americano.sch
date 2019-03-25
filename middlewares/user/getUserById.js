module.exports = (objRepo) => {

  let userModel = objRepo.userModel

  return (req, res, next) => {

    userModel.findOne({_id: req.session.userid}, (err, user) => {
      if (err || !user) return next(err)
      else {
        res.tpl.user = user
        return next()
      }
    })
  }
}