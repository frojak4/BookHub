const express = require('express');
const sql = require('./config.js');

const entryRouter = express.Router();

entryRouter.put('/update', (req, res) => {
    const request = new sql.Request();
    const entry = req.body;
    request.input('Pages', sql.Int, entry.Pages);
    request.input('Status', sql.VarChar, entry.Status);
    request.input('Score', sql.Int, entry.Score);
    request.input('ID', sql.Int, entry.ID);
    request.input('userID', sql.Int, entry.userID)
    request.input('Date', sql.DateTime, entry.Date);

    request.query(`UPDATE entries SET PagesRead = @Pages, ReadingStatus = @Status, Score = @Score, Date = @Date WHERE entryID = @ID AND userID = @userID`, (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(entry);
        }
    })
})

entryRouter.post('/create', (req, res) => {
    const request = new sql.Request();
    const entry = req.body;
    request.input('Pages', sql.Int, entry.Pages);
    request.input('Status', sql.VarChar, entry.Status);
    request.input('Score', sql.Int, entry.Score);
    request.input('bookID', sql.Int, entry.ID);
    request.input('userID', sql.Int, entry.userID);
    request.input('GoogleID', sql.VarChar, entry.GoogleID);
    request.input('Date', sql.DateTime, entry.Date);
    
    request.query(`INSERT INTO entries (BookID, userID, PagesRead, ReadingStatus, Score, GoogleID, Date)
                    VALUES (@bookID, @userID, @Pages, @Status, @Score, @GoogleID, @Date)`, (err, result) => {
                        if (err) {
                            res.status(400).send(err);
                        } else{
                            res.status(200).send(entry);
                        }
                    })
})

entryRouter.get('/following/:id', (req, res) => {
    const request = new sql.Request();
    request.input('id', sql.Int, req.params.id)
    request.query(`SELECT * FROM entries
                    JOIN connections on entries.userID = connections.user2ID
                    JOIN users on users.user_id = connections.user2ID 
                    JOIN BOOKS on BOOKS.ID = entries.bookID
                    WHERE connections.user1ID = @id ORDER BY entries.Date DESC`, (err, result) => {
                        if (err){
                            res.status(400).send(err);
                        } else {
                            res.status(200).send(result.recordset)
                        }
                    })
})


module.exports = entryRouter;