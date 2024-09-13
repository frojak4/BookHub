const express = require('express');
const sql = require('./config.js');

const connectionRouter = express.Router();


connectionRouter.get('/find/:user1/:user2', (req, res) => {
    const request = new sql.Request();

    request.input('user1', sql.Int, req.params.user1);
    request.input('user2', sql.Int, req.params.user2);

    request.query('SELECT * FROM connections WHERE user1ID = @user1 AND user2ID = @user2', (err, result) => {
        if (err){
            res.status(400).send(err);
        } else if (result.recordset.length === 0){
            res.status(200).send(false);
        } else {
            res.status(200).send(true);
        }
    })
})

connectionRouter.get('/followers/:user', (req, res) => {
    const request = new sql.Request();

    request.input('user', sql.Int, req.params.user);

    request.query(`SELECT * FROM connections INNER JOIN users ON user1ID = users.user_id WHERE user2ID = @user`, (err, result) => {
        if (err){
            res.status(400).send(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

connectionRouter.get('/following/:user', (req, res) => {
    const request = new sql.Request();

    request.input('user', sql.Int, req.params.user);

    request.query(`SELECT * FROM connections INNER JOIN users ON user2ID = users.user_id WHERE user1ID = @user`, (err, result) => {
        if (err){
            res.status(400).send(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

connectionRouter.get('/followingcount/:user', (req, res) => {
    const request = new sql.Request();

    request.input('user', sql.Int, req.params.user);

    request.query(`SELECT Count(*) AS following FROM connections WHERE user1ID = @user`, (err, result) => {
        if (err){
            res.status(400).send(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

connectionRouter.get('/followercount/:user', (req, res) => {
    const request = new sql.Request();

    request.input('user', sql.Int, req.params.user);

    request.query(`SELECT Count(*) AS followers FROM connections WHERE user2ID = @user`, (err, result) => {
        if (err){
            res.status(400).send(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})


connectionRouter.post('/create/:user1/:user2', (req, res) => {
    const request = new sql.Request();
    request.input('user1', sql.Int, req.params.user1);
    request.input('user2', sql.Int, req.params.user2);
    request.query(`INSERT INTO connections(user1ID, user2ID)
                    VALUES(@user1, @user2)`, (err, result) => {
                        if (err){
                            res.status(400).send(err);
                        } else {
                            res.status(200).send(result.recordset);
                        }
                    })
})

connectionRouter.delete('/delete/:user1/:user2', (req, res) => {
    const request = new sql.Request();
    request.input('user1', sql.Int, req.params.user1);
    request.input('user2', sql.Int, req.params.user2);
    request.query(`DELETE FROM connections WHERE user1ID = @user1 AND user2ID = @user2;`, (err, result) => {
                        if (err){
                            res.status(400).send(err);
                        } else {
                            res.status(200).send(result.recordset);
                        }
                    })
})



module.exports = connectionRouter;