const express = require('express');
const sql = require('./config.js');
const PORT = 3000;
const utility = require('./utility.js');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const app = express();


app.use(cors(
    {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
))

app.use(bodyParser.json());

const userRouter = require('./users.js');
app.use('/user', userRouter);

const entryRouter = require('./entries.js');
app.use('/entry', entryRouter);

const connectionRouter = require('./connections.js');
app.use('/follow', connectionRouter);

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

app.get('/all/ranked', (req, res) => {
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
    request.input('id', sql.VarChar, req.params.id);
    request.query(`SELECT * FROM BOOKS WHERE GoogleID = @id`, (err, result) => {
        if (err) {
            res.status(400).send(`SQL error`);
        } else if (result.recordset.length === 0) {
            res.status(404).send(`Book with ID ${req.params.id} could not be found`);
        }
         else {
            res.status(200).send(result.recordset);
        }
    })
})

app.get('/all/authorsort', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM BOOKS ORDER BY Author', (err, result) => {
    if (err) {
        res.status(400).send('Could not fetch Books');
    } else {
        res.status(200).send(result.recordset);
    }
})
})

app.get('/all/titlesort', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT * FROM BOOKS ORDER BY Title', (err, result) => {
        if (err) {
            res.status(400).send('Could not fetch Books');
        } else {
            res.status(200).send(result.recordset);
        }
    })
})


app.get('/userstats', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT COUNT(Title) AS "Books", SUM(Pages) AS "Pages" FROM BOOKS WHERE Done = 1', (err, result) => {
        if (err) {
            res.status(400).send('Could not get total books')
        } else {
            res.status(200).send(result.recordset);
        }
    })
})

app.get('/check/:id', (req, res) => {
    const request = new sql.Request();
    request.input('id', sql.VarChar, req.params.id)
    request.query(`SELECT * FROM BOOKS WHERE GoogleID = @ID`, (err, result) => {
    if(err){
        res.status(400).send(err)
    } else if (result.recordset.length === 0){
        console.log('false');
        res.status(200).send(false);
    } else {
        console.log('true');
        res.status(200).send(true);
    }
} )
})

app.get('/search/:query', (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.query}&maxResults=10&key=${process.env.API_KEY}`)
    .then((response) => {
        console.log(response.data);
        res.status(200).send(response.data.items);
    })
    .catch((error) => {
        res.status(400).send(error);
    })
})

app.get('/getbook/:id', (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
    .then((response) => {
        res.status(200).send(response.data);
    })
    .catch((error) => {
        res.status(400).send(error);
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


app.post('/add', async (req, res) => {
    console.log(req.body)
    
    const book = await createBook(req.body)
    res.status(200).send(book);
})

async function createBook(book){
    console.log("check")
    const request = new sql.Request();

    request.input('ISBN', sql.VarChar, book.ISBN);
    request.input('Author', sql.VarChar, book.Author);
    request.input('Title', sql.VarChar, book.Title);
    request.input('Published', sql.VarChar, book.Published);
    request.input('Done', sql.Bit, book.Done);
    request.input('Pages', sql.Int, book.Pages);
    request.input('Picture', sql.VarChar,book.Picture);
    request.input('Genre', sql.VarChar, book.Genre);
    request.input('Synopsis', sql.VarChar, book.Synopsis);
    request.input('GoogleID', sql.VarChar, book.GoogleID);

    await request.query(`INSERT INTO BOOKS 
        (ISBN, Author, Title, Published, Done, Pages, Picture, Genre, Synopsis, GoogleID)
        VALUES 
        (@ISBN, @Author, @Title, @Published, @Done, @Pages, @Picture, @Genre, @Synopsis, @GoogleID);`)
}

app.put('/edit/:id', (req, res) => {
    if (utility.checkNewBook(req.body)) {
        const request = new sql.Request();
        request.query(`UPDATE BOOKS 
            SET Author = '${req.body.Author}',
                Title = '${req.body.Title}',
                Done = ${req.body.Done},
                Score = ${req.body.Score}
            WHERE ID = ${req.params.id}`, (err, result) =>{
                    if (err) {
                        res.status(400).send(err);
                        console.log(err);
                    } else {
                        res.status(200).send(req.body);
                    }
                        });
    }
})



app.listen(PORT, () => {
    console.log(`Now listening at PORT: ${PORT}`)
});