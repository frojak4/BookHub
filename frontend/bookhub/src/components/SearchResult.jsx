import React from 'react'

const SearchResult = ({book}) => {
  return (
    <div className="p-1 hover:bg-blue-700 hover:cursor-pointer flex flex-wrap justify-between"><span className=" max-w-96">{book.volumeInfo.title}</span> <span className='text-slate-400'>by {book.volumeInfo.authors}</span></div>
  )
}

export default SearchResult