/**
 * Get the list of all food and collect it to send to view
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.foods = [
      {
        _id: 1, name: 'Hamburger', description: 'óriás buci, marhahús, ' +
          'saláta, paradicsom, uborka, hagyma, sajt, ketchup,' +
          'mustár, majonéz, speckó szósz', admin: false
      },
      {
        _id: 1, name: 'Hot-dog', description: 'friss kifli, pulykavirsli, ' +
          'saláta, paradicsom, uborka, hagyma, ketchup, mustár, majonéz, sajt',
        admin: false
      }
    ]
    return next()
  }
}