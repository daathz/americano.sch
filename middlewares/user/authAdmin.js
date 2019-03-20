/**
 * Authenticate the user, if he is and admin grant acces to admin pages
 */
module.exports = (objRepo) => {
  return (req, res, next) => {

    if ((typeof req.session.admin === 'undefined') ||
      (req.session.admin === false)) {
      return res.redirect('/')
    }
    res.tpl.isAdm = true
    return next()
  }
}