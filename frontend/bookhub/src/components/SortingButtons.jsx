import React from 'react'

const SortingButtons = ({setSort, sort}) => {
  return (
    <div className="border-b-4 border-slate-700 flex py-1">
        <h3 className="text-white font ml-2">
        Sort By:
        </h3>
        <div className="flex">
            <button onClick={() => setSort('titlesort')} disabled={sort === 'titlesort'} 
            className="text-slate-400 ml-2 hover:cursor-pointer disabled:text-white hover:text-slate-200" >Title</button>
            <button onClick={() => setSort('authorsort')} disabled={sort === 'authorsort'} 
            className="text-slate-400 ml-2 hover:cursor-pointer disabled:text-white hover:text-slate-200">Author</button>
            <button onClick={() => setSort('ranked')} disabled={sort === 'ranked'} 
            className="text-slate-400 ml-2 hover:cursor-pointer disabled:text-white hover:text-slate-200">Score</button>
            <button onClick={() => setSort('status')} disabled={sort === 'status'} 
            className="text-slate-400 ml-2 hover:cursor-pointer disabled:text-white hover:text-slate-200">Status</button>
        </div>
    </div>
  )
}

export default SortingButtons