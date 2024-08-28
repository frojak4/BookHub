import React from 'react'
import {Link} from 'react-router-dom';

const BookInList = ({book}) => {
  return (
    <div className="flex flex-col border-b-2 border-slate-600">
        <div className="flex justify-between">
            <Link to={`/books/${book.ID}`}>
            <h3 className="text-white mt-1 ml-2">{book.Title}</h3>
            </Link>
            {!book.Score ? "" : 
            <h3 className="text-slate-400 text-2xl mr-3">{book.Score}/10</h3>
        }
        </div>
        <div>
            <h3 className="text-slate-400 mb-1 ml-2">By {book.Author}</h3>
        </div>
    </div>
  )
}

export default BookInList