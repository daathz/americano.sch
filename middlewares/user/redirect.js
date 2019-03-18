/**
 * Redirect the user if he is logged in
 */
module.exports = (objRepo) => {
  return (req, res) => {
    res.redirect('/login')
  }
}