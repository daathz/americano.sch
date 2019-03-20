/**
 * Authenticate the user, if he is not logged in, redirects to login page
 */
module.exports = (objRepo) => {
  return (req, res, next) => {

    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/login')
    }
    return next()
  }
}