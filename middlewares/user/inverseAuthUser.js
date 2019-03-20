/**
 * Authenticate the user, if he is logged in, redirects to /
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.isAdm = false

    if (req.session.admin === true) {
      res.tpl.isAdm = true
    }

    if (typeof req.session.userid !== 'undefined') {
      res.tpl.isUser = true
      return res.redirect('/')
    }
    res.tpl.isUser = false
    return next()
  }
}