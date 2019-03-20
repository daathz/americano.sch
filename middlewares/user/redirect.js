/**
 * Redirect the user if he is logged in
 */
module.exports = (objRepo) => {
  return (req, res) => {
    if (req.session.userid === 'undefined') {
      return res.redirect('/login')
    } else {
      return res.redirect('/order')
    }
  }
}