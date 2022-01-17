
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

const router = require('express').Router()

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique,(req, res, next) =>{
  const name = req.body.name.trim()
  const budget = req.body.budget

  Accounts.create({name, budget})
      .then(newAccount => {
          res.status(201).json(newAccount)
      })
      .catch(next)
})

router.put('/:id',  checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(updatedAccount => {
      res.json(updatedAccount)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(deletedAccount => {
      res.json(deletedAccount)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
