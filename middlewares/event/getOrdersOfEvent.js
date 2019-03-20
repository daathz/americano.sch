module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.orders = []
    next()
  }
}