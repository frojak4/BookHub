import React, {useEffect, useState} from 'react'
import { addBookToServer, checkIfInDatabase } from './utility'


const BookPageDisplay = ({book}) => {




    

  return (
        
            <div className="w-[40rem] h-96 flex flex-col justify-between">
                <div>
                <h3 className="text-white text-2xl border-b-2 border-slate-800 pb-2 mb-2">{book.Title}<span className="text-slate-400 mx-2 text-xl">by {book.Author}</span></h3>
                <h3 className="text-slate-400 w-full">{book.Synopsis ? book.Synopsis : 'Book description not available'}</h3>
                </div>
                <h3 className="text-white">{book.Genre}</h3>
            </div>
    
        
  )
}

export default BookPageDisplay