module.exports = (objRepo) => {
  return (req, res, next) => {
    console.log(req.body)
    return next()
  }
}