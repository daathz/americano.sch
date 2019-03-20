/**
 * Get the orders the authenticated user
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.orders = []
    return next()
  }
}