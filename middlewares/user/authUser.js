/**
 * Authenticate the user, if he is not logged in, redirects to login page
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.isAdm = false
    res.tpl.isUser = false

    if (req.session.admin === true) {
      res.tpl.isAdm = true
    }

    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/login')
    }
    res.tpl.isUser = true
    return next()
  }
}