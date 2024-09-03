import React, {useEffect} from 'react'
import { addBookToServer } from './utility'

const BookPageDisplay = ({book, loading, inDatabase, setInDatabase}) => {


    const handleAdd = (book) => {
        addBookToServer(book)
        setInDatabase(true)
    }

  return (
        <div className="flex justify-center mt-16">
            <img className="h-96 mr-12 rounded-md border-2 border-amber-400" alt="Book" src={book?.Picture ? book.Picture : 'https://www.forewordreviews.com/books/covers/what-lucy-taught-us.jpg'}/>
            <div className="w-[40rem] h-96 flex flex-col justify-between">
                <div>
                <h3 className="text-white text-2xl border-b-2 border-slate-800 pb-2 mb-2">{book.Title}<span className="text-slate-400 mx-2 text-xl">by {book.Author}</span></h3>
                <h3 className="text-slate-400 w-full">{book.Synopsis ? book.Synopsis : 'Book description not available'}</h3>
                </div>
                <h3 className="text-white">{book.Genre}</h3>
            </div>
            <div className="ml-8 flex flex-col">
                <h3 className="text-slate-400 text-4xl">{book.Score}/10</h3>
                {inDatabase ? <h3 className="text-white">Added</h3> : <button onClick={() => handleAdd(book)} className="text-white">Add to server</button>}
            </div>
        </div>     
  )
}

export default BookPageDisplay