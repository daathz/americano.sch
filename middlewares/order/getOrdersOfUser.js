/**
 * Get the orders the authenticated user
 */
module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.orders = [
      {
        _id: 1, name: 'Feri', room: 123, food: 'Hamburger', quantity: 3,
        comment: '', event_id: 1, user_id: 1
      },
      {
        _id: 2, name: 'Feri', room: 123, food: 'Hot-Dog', quantity: 1,
        comment: 'Lorem Ipsum', event_id: 1, user_id: 1
      }
    ]
    return next()
  }
}