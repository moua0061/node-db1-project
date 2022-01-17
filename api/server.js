const express = require("express");
const AccountsRouter = require('../api/accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1> what is this? </h1>
    `)
})

server.get('*', (req, res) => {
    res.status(404).json({
        message: `[${req.method}] ${req.baseUrl} not found!`
    })
})

module.exports = server;
