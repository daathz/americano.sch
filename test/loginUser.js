const expect = require('chai').expect
const loginUserMW = require('../middlewares/user/loginUser')

describe('loginUser middleware', () => {

  describe('should call next when', () => {
    it('no parameters are given', (done) => {
      let req = {}
      let res = {}
      let userModelMock = {
        findOne: (condition, callback) => {
          callback()
        }
      }

      loginUserMW({userModel: userModelMock})(req, res, (err) => {
        expect(req.body).to.eql(undefined)
        done()
      })
    })

    it('no email address is given', (done) => {
      let req = {body: {}}
      let res = {}
      let userModelMock = {
        findOne: (conditions, callback) => {
          callback()
        }
      }

      loginUserMW({userModel: userModelMock})(req, res, (err) => {
        expect(req.body.email).to.eql(undefined)
        done()
      })
    })

    it('no password is given', (done) => {
      let req = {
        body: {
          email: 'kutyafule@macskafarka.hu'
        }
      }
      let res = {}
      let userModelMock = {
        findOne: (conditions, callback) => {
          callback()
        }
      }

      loginUserMW({userModel: userModelMock})(req, res, (err) => {
        expect(req.body.email).to.eql('kutyafule@macskafarka.hu')
        expect(req.body.password).to.eql(undefined)
        done()
      })
    })

    it('the password is wrong', (done) => {
      let req = {
        body: {
          email: 'kutyafule@macskafarka.hu',
          password: 'example1'
        }
      }
      let res = {
        tpl: {
          error: []
        }
      }
      let userModelMock = {
        findOne: (conditions, callback) => {
          callback(undefined, 'password')
        }
      }

      loginUserMW({userModel: userModelMock})(req, res, (err, user) => {
        expect(req.body.password).to.not.eql('password')
        done()
      })
    })
  })

  it('should return error when there is no user in the db', (done) => {
    let req = {
      body: {
        email: 'kutyafule@macskafarka.hu',
        password: 'example1'
      }
    }
    let res = {}
    let userModelMock = {
      findOne: (conditions, callback) => {
        callback('error', undefined)
      }
    }

    loginUserMW({userModel: userModelMock})(req, res, (err, user) => {
      expect(err).to.eql('error')
      expect(user).to.eql(undefined)
      done()
    })
  })

  it('should login successfully if everything is correct', (done) => {
    let req = {
      body: {
        email: 'kutyafule@macskafarka.hu',
        password: 'example1'
      },
      session: {}
    }
    let res = {
      redirect: (url) => {
        expect(url).to.eql('/')
        done()
      }
    }
    let userModelMock = {
      findOne: (condition, callback) => {
        callback(undefined, {
          email: 'kutyafule@macskafarka.hu',
          password: 'example1'
        })
      }
    }

    loginUserMW({userModel: userModelMock})(req, res, (err, user) => {
      expect(user.email).to.eql(req.body.email)
      expect(user.password).to.eql(req.body.password)
      done()
    })
  })
})
