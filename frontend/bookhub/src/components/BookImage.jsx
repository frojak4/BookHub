import React from 'react'

const BookImage = ({book}) => {
  return (
    <div>
    <img className="h-96 mr-12 rounded-md border-2 border-amber-400" alt="Book" src={book?.Picture ? book.Picture : 'https://www.forewordreviews.com/books/covers/what-lucy-taught-us.jpg'}/>
    </div>
  )
}

export default BookImage