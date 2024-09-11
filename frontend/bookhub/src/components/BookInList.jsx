import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';

const BookInList = ({book}) => {

  return (
    <div className="flex flex-col border-b-2 border-slate-600">
        <div className="flex justify-between">
            <Link to={`/books/${book.GoogleID[0]}`}>
            <h3 className="text-white mt-1 ml-2">{book.Title}</h3>
            </Link>
            {!book.Score ? "" : 
            <h3 className="text-slate-400 text-2xl mr-3">{book.Score}/10</h3>
        }
        </div>
        <div className="flex justify-between mt-1 mb-1">
            <h3 className="text-slate-400 ml-2">By {book.Author}</h3>
            <h3 className="text-slate-400 text-sm">
              {book.ReadingStatus === 'Reading' &&
              <span className="mr-2"> {book.PagesRead} / {book.Pages} Pages </span>
              }
              <span className="text-white mr-2 p-1 bg-slate-700">{book.ReadingStatus}</span>
              </h3>
        </div>
    </div>
  )
}

export default BookInList