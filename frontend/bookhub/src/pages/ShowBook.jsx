import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Header from '../components/Header';


const ShowBook = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState();

    useEffect(() => {
        setLoading(true);
        axios
        .get(`http://localhost:3000/books/${id}`)
        .then((response) => {
            setBook(response.data[0]);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setLoading(false);
        })     
    }, [])

  return (
    <div className="bg-slate-950 h-screen w-screen">
        <Header/>
        {loading ? <Spinner/> : 
        
        <div className="flex justify-center mt-16">
            <img className="h-96 mr-12 rounded-md border-2 border-amber-400" alt="Book" src={book.Picture}/>
            <div className="w-[40rem]">
                <h3 className="text-white text-2xl border-b-2 border-slate-800 pb-2 mb-2">{book.Title}<span className="text-slate-400 mx-2 text-xl">by {book.Author}</span></h3>
                <h3 className="text-slate-400 w-full">{book.Synopsis}</h3>
            </div>
            <div className="ml-8">
                <h3 className="text-slate-400 text-4xl">{book.Score}/10</h3>
            </div>
        </div>
            }
    </div>
  )
}

export default ShowBook

