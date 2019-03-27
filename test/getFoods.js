const expect = require('chai').expect
const getFoodsMW = require('../middlewares/food/getFoods')

describe('getFoods middleware', () => {
  it('should return error when there is a db error', (done) => {
    let req = {}
    let res = {
      tpl: {}
    }
    let foodModelMock = {
      find: (conditions, callback) => {
        callback(true, undefined)
      }
    }

    getFoodsMW({
      foodModel: foodModelMock
    })(req, res, (err, foods) => {
      expect(true).to.eql(err)
      done()
    })
  })

  it('should set the foods tpl to found objects and call next', (done) => {
    let req = {}
    let res = {
      tpl: {}
    }
    let foodModelMock = {
      find: (conditions, callback) => {
        callback(undefined, [{food: 'Hambi', description: 'finom'}])
      }
    }

    getFoodsMW({foodModel: foodModelMock})(req, res, (err, foods) => {
      expect(err).to.eql(undefined)
      expect(res.tpl.foods).to.deep.eql([{food: 'Hambi', description: 'finom'}])
      done()
    })
  })
})