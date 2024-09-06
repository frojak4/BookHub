import React, {useEffect, useState} from 'react'
import { addBookToServer, checkIfInDatabase } from './utility'


const BookPageDisplay = ({book, loading, inDatabase, setInDatabase, score, status, hasEntry, pagesread}) => {




    const handleAdd = async (book) => {
       if (!inDatabase){
            await addBookToServer(book);
       }
    }

    const handlePageChange = (e) => {
        if (e.target.value < book.Pages) {
            setNewPages(e.target.value)
            setErrorMSG('');
        } else {
            setErrorMSG('Too many pages')
        }
    }

    const handleScoreChange = (e) => {
        if (e.target.value <= 10) {
        setNewScore(e.target.value)
    }
    }

    const handleConfirmChange = () => {
        setEditToggle(false);
    }

    const [editToggle, setEditToggle] = useState(false)
    const [newPages, setNewPages] = useState(pagesread);
    const [newScore, setNewScore] = useState(score)
    const [errorMSG, setErrorMSG] = useState("");

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

            {hasEntry && !editToggle &&
            <div className="ml-8 flex flex-col">
                <h3 className="text-slate-400 text-4xl">{score}/10</h3>
                <h3 className="text-white">{status}</h3> : 
                <button onClick={() => setEditToggle(true)} className="text-white">Edit</button>
            </div>
            }
            {editToggle &&
            <div className="ml-8 flex flex-col">
                <div className="flex mb-4">
                <input className="w-10  mr-1 text-center bg-slate-600 text-slate-400 text-4xl [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                 type="number" min="0" max="10" onChange={handleScoreChange} value={newScore}/>
                <h3 className="text-slate-400 text-4xl">/10</h3>
                </div>
                <select name="status" id="status">
                    <option value="Done">Done</option>
                    <option value="Read">Read</option>
                </select>
                <input className="mt-3 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                type="number" onChange={handlePageChange} value={newPages} max={book.Pages}/>
                <h3 className="text-red-500">{errorMSG}</h3>
                <button onClick={handleConfirmChange} className="text-white">Confirm Changes</button>
                
            </div>
            }
        </div>     
        
  )
}

export default BookPageDisplay