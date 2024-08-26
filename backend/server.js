const express = require('express');
const sql = require('./config.js');
const PORT = 3000;
const utility = require('./utility.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

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

app.post('/create', (req, res) => {
    if (utility.checkNewBook(req.body)) {
    const request = new sql.Request();
    request.query(`INSERT INTO BOOKS (ISBN,Author, Title, Published, Done, Score, Pages)
                    VALUES (${req.body.ISBN}, '${req.body.Author}', '${req.body.Title}', 
                    '${req.body.Published}', ${req.body.Done}, ${req.body.Score}, ${req.body.Pages});`, (err, result) => {
                  if (err) {
                      res.status(400).send(err)
                 } else {
                     res.status(200).send(req.body);
                }
            })
} else {
    res.send(400).status('Invalid details for book.')
    console.log("Check");
}
})




app.listen(PORT, () => {
    console.log(`Now listening at PORT: ${PORT}`)
});