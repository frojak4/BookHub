export const formatBook = (book) => {
    const newBook = {
        Title: book.volumeInfo.title,
        Author: book.volumeInfo.authors[0],
        Pages: book.volumeInfo.pageCount,
        Picture: book.volumeInfo.imageLinks.thumbnail,
        ISBN: book.volumeInfo.industryIdentifiers[1].identifier,
        Synopsis: book.volumeInfo.description,
        Genre: book.volumeInfo.categories
    }

    return newBook;
}