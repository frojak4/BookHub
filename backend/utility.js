
const checkNewBook = (book) => {
    if (book.Title && book.Author && book.ISBN && book.Published && book.Pages && book.Done) {
        return true
    } else return false
}

module.exports = {
    checkNewBook: checkNewBook,
}