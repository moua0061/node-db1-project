const db = require('../../data/db-config');

const getAll = () => {
  // select * from accounts
  return db('accounts')
}

const getById = id => {
  // select * from accounts where id = 1;
  return db('accounts').where('id', id).first()
}

const create = async account => {
  // insert into accounts (name, budget) values ('account12', '8347');
  const [ id ] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  // update accounts set name='updated account', budget='6588' where id = 14;
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = id => {
  // delete from accounts where id = 14;
  return db('accounts').where('id', id).del()
}

const findName = name => {
  return db('accounts').where('name', name).trim().first()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  findName
}
