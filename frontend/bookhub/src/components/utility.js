import axios from 'axios';


export const formatBook = (book) => {
    const newBook = {
        Title: book.volumeInfo.title,
        Author: book.volumeInfo.authors[0],
        Pages: book.volumeInfo.pageCount,
        Picture: book.volumeInfo.imageLinks?.thumbnail || '',
        ISBN: book.volumeInfo.industryIdentifiers[1].identifier,
        Synopsis: book.volumeInfo.description,
        Genre: book.volumeInfo.categories,
        Published: book.volumeInfo.publishedDate,
        GoogleID: book.id
    }
    return newBook;
}


export const addBookToServer = (book) => {
    console.log(book);
    axios.post('http://localhost:3000/add', {
        ISBN: book.ISBN || 'Unknown ISBN',
        Author: book.Author || 'Unknown Author',
        Title: book.Title || 'Untitled',
        Published: book.Published || 'Unknown',
        Done: 0,
        Score: null,
        Pages: book.Pages || 0,
        Picture: book.Picture || '',
        Genre: book.Genre[0] || 'Unknown Genre',
        Synopsis: book.Synopsis || 'No synopsis available',
        GoogleID: book.GoogleID
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.log(error));
}