import React, {useState, useEffect} from 'react'
import { createEntry, addBookToServer, getBookID } from './utility'

const NewBookEntry = ({book, user, inDatabase, setCreatedEntry}) => {


    const [toggleAdd, setToggleAdd] = useState(false);
    const [newPages, setNewPages] = useState(undefined);
    const [newScore, setNewScore] = useState(undefined);
    const [newStatus, setNewStatus] = useState('blank')
    const [errorMSG, setErrorMSG] = useState("");
    const [pageDisable, setPageDisable] = useState(true);

    useEffect(() => {
        setToggleAdd(false);
        setNewPages(undefined);
        setNewScore(undefined);
        setNewStatus('blank');
        setErrorMSG('');
        setPageDisable(true);
    }, [])
   

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

    const handleConfirmChange = async () => {
        if (newStatus === 'blank'){
            setErrorMSG('Please enter reading status');
            return;
        }

        if (!inDatabase){
            await addBookToServer(book);
       }
       const moment = require('moment');
       let date = moment();
       const formatDate = date.format().slice(0, 19).replace('T', ' ');
        const entry = {
            Pages: newPages,
            Status: newStatus,
            Score: newScore,
            ID: await getBookID(book.GoogleID),
            userID: user.user_id,
            GoogleID: book.GoogleID,
            Date: formatDate
        }
        await createEntry(entry);
        setToggleAdd(!toggleAdd);
        setCreatedEntry(true);
    }

    

  return (
    <div className="ml-6 bg-slate-800 w-44 h-44 flex flex-col justify-center items-center rounded-2xl">
        {toggleAdd ? 
        <div className="flex flex-col justify-center items-center">
        <div className="flex mb-4 text-center">
        <input className="w-10  mr-1 text-center bg-slate-600 text-slate-400 text-4xl [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
         type="number" min="0" max="10" onChange={handleScoreChange} value={newScore}/>
        <h3 className="text-slate-400 text-4xl">/10</h3>
        </div>
        <select value={newStatus} onChange={handleStatusChange} name="status" id="status">
            <option value="blank"></option>
            <option value="Done">Done</option>
            <option value="Reading">Reading</option>
            <option value="Want to Read">Want to Read</option>
        </select>
        {!pageDisable &&
        <div className="flex items-center">
        <input className="mt-2 mr-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12 text-center" 
        type="number" onChange={handlePageChange} disabled={pageDisable} value={newPages} max={book.Pages}/>
        <h3 className="text-slate-400 ml-1 pt-2">/ {book.Pages} Pages</h3>
        </div>
        }
        <h3 className="text-red-500 m-0 text-sm">{errorMSG}</h3>
        <div className="flex">
            <button onClick={handleConfirmChange} className="text-white mt-2 mr-1">Add Book</button>
            <button onClick={() => setToggleAdd(!toggleAdd)} className="mt-2 ml-1 text-red-500">Cancel</button>
        </div>
        </div>
        : 
        <button onClick={() => setToggleAdd(!toggleAdd)} className="text-white">
            Add book
        </button>
        }
    </div>
  )
}

export default NewBookEntry