const express = require('express');
const sql = require('./config.js');

const userRouter = express.Router();

userRouter.get('/:name', (req, res) => {
    const request = new sql.Request()
    request.input('name', sql.VarChar, req.params.name);
    request.query(`SELECT * FROM users WHERE username = @name`, (err, result) => {
        if (err){
            res.status(400).send(err);
        } else if (result.recordset.length === 0) {
            res.status(400).send('Could not fetch user');
        }
         else {
            res.status(200).send(result.recordset);
        }
    })
})

userRouter.get('/allbooks/:id/status/:status', (req, res) => {
    const request = new sql.Request();
    request.input('id', sql.Int, req.params.id);
    request.input('status', sql.VarChar, req.params.status);
    request.query(`SELECT * FROM BOOKS JOIN entries on entries.bookID = BOOKS.ID WHERE entries.userID = @ID AND entries.ReadingStatus = @status`, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else if (result.recordset.length === 0){
            res.status(400).send('Could not fetch users books')
        } else {
            res.status(200).send(result.recordset)
        }
    })
})

userRouter.get('/allbooks/:id/authorsort', (req, res) => {
    const request = new sql.Request();
    request.input('id', sql.Int, req.params.id);
    request.query(`SELECT * FROM BOOKS JOIN entries on entries.bookID = BOOKS.ID WHERE entries.userID = @ID ORDER BY Author`, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else if (result.recordset.length === 0){
            res.status(400).send('Could not fetch users books')
        } else {
            res.status(200).send(result.recordset)
        }
    })
})

userRouter.get('/allbooks/:id/status', (req, res) => {
    const request = new sql.Request();
    request.input('id', sql.Int, req.params.id);
    request.query(`SELECT * FROM BOOKS JOIN entries on entries.bookID = BOOKS.ID WHERE entries.userID = @ID ORDER BY entries.ReadingStatus`, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else if (result.recordset.length === 0){
            res.status(400).send('Could not fetch users books')
        } else {
            res.status(200).send(result.recordset)
        }
    })
})


userRouter.get('/allbooks/:id/titlesort', (req, res) => {
    const request = new sql.Request();
    request.input('id', sql.Int, req.params.id);
    request.query(`SELECT * FROM BOOKS JOIN entries on entries.bookID = BOOKS.ID WHERE entries.userID = @ID ORDER BY Title`, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else if (result.recordset.length === 0){
            res.status(400).send('Could not fetch users books')
        } else {
            res.status(200).send(result.recordset)
        }
    })
})

userRouter.get('/allbooks/:id/ranked', (req, res) => {
    const request = new sql.Request();
    request.input('id', sql.Int, req.params.id);
    request.query(`SELECT * FROM BOOKS JOIN entries on entries.bookID = BOOKS.ID WHERE entries.userID = @ID ORDER BY Score`, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else if (result.recordset.length === 0){
            res.status(400).send('Could not fetch users books')
        } else {
            res.status(200).send(result.recordset)
        }
    })
})

userRouter.get('/stats/:id', (req, res) => {
    const request = new sql.Request()
    request.input('id', sql.Int, req.params.id);
    request.query(`SELECT SUM(PagesRead) AS Pages, COUNT(*) AS Total FROM BOOKS JOIN entries on entries.bookID = BOOKS.ID WHERE entries.userID = @ID`, (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else if (result.recordset.length === 0) {
            res.status(400).send('No books found')
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

userRouter.get('/getentry/:bookid/:userid', (req, res) => {
    const request = new sql.Request();
    request.input('userid', sql.Int, req.params.userid);
    request.input('bookid', sql.VarChar, req.params.bookid);

    request.query(`SELECT * FROM entries WHERE GoogleID = @bookid AND userID = @userid`, (err, result) => {
        if (err){
            res.status(400).send(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

userRouter.get('/search/:name', (req, res) => {
    const request = new sql.Request();
    

    request.query(`SELECT * from users WHERE username LIKE '%${req.params.name}%'`, (err, result) => {
        if (err){
            res.status(400).send(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})



module.exports = userRouter;