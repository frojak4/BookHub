const express = require('express');
const sql = require('./config.js');
const PORT = 3002;

const app = express();

app.get('/all', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM BOOKS', (err, result) => {
        if (err) {
            res.status(400).send('Could not fetch books');
            console.log(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

app.get('/ranked', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM BOOKS ORDER BY Score DESC', (err, result) => {
        if (err) {
            res.status(400).send('Could not fetch books');
            console.log(err);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

app.get('/books/:id', (req, res) => {
    const request = new sql.Request();
    request.query(`SELECT * FROM BOOKS WHERE ID = ${req.params.id}`, (err, result) => {
        if (err) {
            res.status(404).send(`Book with ID ${req.params.id} could not be found`);
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

app.get('/authorsort', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM BOOKS ORDER BY Author', (err, result) => {
    if (err) {
        res.status(400).send('Could not fetch Books');
    } else {
        res.status(200).send(result.recordset);
    }
})
})

app.get('/titlesort', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM BOOKS ORDER BY Title', (err, result) => {
        if (err) {
            res.status(400).send('Could not fetch Books');
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const request = new sql.Request();
    request.query(`DELETE FROM BOOKS WHERE ID = ${req.params.id}`, (err, result) => {
        if (err) {
            res.status(400).send(`Could not delete book with id ${req.params.id}`);
        } else {
            res.status(200).send(req.params.id);
        }
    })
})


app.listen(PORT, () => {
    console.log(`Now listening at PORT: ${PORT}`)
});