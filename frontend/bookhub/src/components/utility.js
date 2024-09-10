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


export const addBookToServer = async (book) => {
    console.log(book);
    await axios.post('http://localhost:3000/add', {
        ISBN: book.ISBN || 'Unknown ISBN',
        Author: book.Author || 'Unknown Author',
        Title: book.Title || 'Untitled',
        Published: book.Published || 'Unknown',
        Done: 0,
        Pages: book.Pages || 0,
        Picture: book.Picture || '',
        Genre: book.Genre[0] || 'Unknown Genre',
        Synopsis: book.Synopsis || 'No synopsis available',
        GoogleID: book.GoogleID
    })
    .then((response) => {
        return;
    })
    .catch((error) => console.log(error));
}

export const fetchBook = async (id) => {
    const response = await axios.get(`http://localhost:3000/books/${id}`)
}

export const checkIfInDatabase = async (id) => {
    try {
    const response = await axios.get(`http://localhost:3000/check/${id}`)
    return response.data;
    } catch (error){
        console.log(error)
    }
    
}

export const updateEntry = (entry) => {
    axios.put('http://localhost:3000/entry/update', entry)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => console.log(err));
}

export const createEntry = (entry) => {
    axios.post('http://localhost:3000/entry/create', entry)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => console.log(err))
}

export const getBookID = async (googleID) => {
    try {
        const response = await axios.get(`http://localhost:3000/books/${googleID}`)
        return response.data[0].ID;
    } catch(err){
        console.log(err);
    }
    
    
}