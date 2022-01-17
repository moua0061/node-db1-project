const Accounts = require('./accounts-model');
const db = require('./../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const error = {status: 400}
  const {name, budget} = req.body

  if (name === undefined || budget === undefined) {
      error.message = 'name and budget are required'
  } else if (name.trim().length < 3 || name.trim().length > 100) {
      error.message = 'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
      error.message = 'budget of account must be a number'
  } else if (budget < 0 || budget > 100000) {
      error.message = 'budget of account is too large or too small'
  }
  if (error.message) {
      next(error)
  } else {
      next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  //when a new account is created, check if the name exist
  //if the name exists, respond with status 400 & message that name is taken
  try {
    const existing = await db('accounts').where('name', req.body.name.trim()).first()

    if(existing) {
        next({status: 400, message: 'that name is taken'})
    } else {
        next()
    }
}
catch (err) {
    next(err)
}
}

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      if(!account) {
        next({
          status: 404,
          message: 'account not found'
        })
      } else {
        req.account = account
        next()
      }
    })
    .catch(next)

}
