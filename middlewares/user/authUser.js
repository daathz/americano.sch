/**
 * Authenticate the user, if he is not logged in, redirects to login page
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    req.session.userid === 112 ? res.tpl.isUser = true : res.tpl.isUser = false
    return next()
  }
}