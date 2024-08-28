import React from 'react'

const SortingButtons = ({setSort}) => {
  return (
    <div className="border-b-4 border-slate-700 flex py-1">
        <h3 className="text-white font ml-2">
        Sort By:
        </h3>
        <div className="flex">
            <h3 onClick={() => setSort('titlesort')} className="text-slate-400 ml-2 hover:cursor-pointer">Title</h3>
            <h3 onClick={() => setSort('authorsort')} className="text-slate-400 ml-2 hover:cursor-pointer">Author</h3>
            <h3 onClick={() => setSort('ranked')} className="text-slate-400 ml-2 hover:cursor-pointer">Score</h3>
        </div>
    </div>
  )
}

export default SortingButtons