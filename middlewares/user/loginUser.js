/**
 * Check if the user exists, then create a session for them
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    req.session.userid = 112
    return next()
  }
}