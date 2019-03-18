/**
 * Renders the view with the template engine
 */
module.exports = (objRepo, view) => {
  return (req, res) => {
    res.render(view)
  }
}