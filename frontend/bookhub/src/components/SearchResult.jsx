import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({book}) => {
  return (
    <div className="p-1 hover:bg-blue-700 hover:cursor-pointer flex flex-wrap justify-between">
      <Link to={`/books/${book.id}`}>
      <span className=" max-w-96">{book.volumeInfo.title}</span> <span className='text-slate-400'>by {book.volumeInfo.authors}
      </span>
      </Link>
      </div>
  )
}

export default SearchResult