import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const User = () => {

    const [pages, setPages] = useState(0);
    const [readBooks, setReadBooks] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get('http://localhost:3000/userstats')
        .then((response) => {
            setPages(response.data[0].Pages);
            setReadBooks(response.data[0].Books);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }, [])


  return (
    <div className="bg-slate-800 h-72 w-64 mt-24 rounded-xl flex items-center flex-col">
        <img className="rounded-full h-24 w-24 mt-2" alt="profile" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"/>
        <h2 className="text-white text-lg border-b-2 border-slate-600 w-full text-center">Frode</h2>
        {loading ? <Spinner/> : 
        <div>
        <h3 className="text-slate-400">Pages: {pages}</h3>
        <h3 className="text-slate-400">Books: {readBooks}</h3>
        </div>
        }
    </div>
  )
}

export default User