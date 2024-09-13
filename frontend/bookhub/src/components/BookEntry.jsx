import React, {useState} from 'react'
import { addBookToServer, updateEntry} from './utility'

const BookEntry = ({inDatabase, pagesread, score, book, status, ID, user}) => {


    const [editToggle, setEditToggle] = useState(false)
    const [newPages, setNewPages] = useState(pagesread);
    const [newScore, setNewScore] = useState(score)
    const [newStatus, setNewStatus] = useState(status)
    const [errorMSG, setErrorMSG] = useState("");
    const [pageDisable, setPageDisable] = useState(true);
 
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

     const handleStatusChange = (e) => {
        setNewStatus(e.target.value)
       setPageDisable(false);
       if (e.target.value === 'Done') {
        setNewPages(book.Pages);
        setPageDisable(true);
       }

       if(e.target.value === 'Want to Read'){
        setNewPages(0);
        setPageDisable(true);
       }

       if(e.target.value === 'blank'){
        setPageDisable(true);
       }
     }
 
     const handleConfirmChange = () => {
        if(newStatus){
            setEditToggle(false);
            const entry = {
                Pages: newPages,
                Status: newStatus,
                Score: newScore,
                ID: ID,
                userID: user.user_id
            }
            updateEntry(entry);
        } else {
            setErrorMSG('Invalid details')
        }
     }
 
    

  return (
    <div className="ml-6 bg-slate-800 w-44 h-44 flex flex-col justify-center items-center rounded-2xl">
    {!editToggle &&
        <div className="flex flex-col text-center">
            {score && <h3 className="text-white text-4xl mb-4">{newScore}/10</h3>}
            <h3 className="text-slate-400">Status: {newStatus}</h3>
            <h3 className="text-slate-400">Pages Read: {newPages} / {book.Pages}</h3>
            <button onClick={() => setEditToggle(true)} className="text-white mt-2">Edit</button>
        </div>
        }
        {editToggle &&
        <div className="flex flex-col justify-center items-center">
            <div className="flex mb-4 text-center">
            <input className="w-10  mr-1 text-center bg-slate-600 text-slate-400 text-4xl [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
             type="number" min="0" max="10" onChange={handleScoreChange} value={newScore}/>
            <h3 className="text-slate-400 text-4xl">/10</h3>
            </div>
            <select value={newStatus} onChange={handleStatusChange} name="status" id="status">
                <option value="Done">Done</option>
                <option value="Reading">Reading</option>
                <option value="Want to Read">Want to Read</option>
            </select>
            <div className="flex items-center">
            <input className="mt-2 mr-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12 text-center" 
            type="number" disabled={pageDisable} onChange={handlePageChange} value={newPages} max={book.Pages}/>
            <h3 className="text-slate-400 ml-1 pt-2"> / {book.Pages} Pages</h3>
            </div>
            <h3 className="text-red-500 m-0">{errorMSG}</h3>
            <button onClick={handleConfirmChange} className="text-white mt-2">Confirm Changes</button>
            
        </div>
        }
        </div>
  )
}

export default BookEntry