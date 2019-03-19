/**
 * Logout the user
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    req.session.destroy((err) => next())
  }
}