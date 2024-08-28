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
    <div className="bg-slate-950 h-screen">
        <Header/>
        {loading ? <Spinner/> : 
        <div className="text-white">
            {book.Author} <br/>
            {book.Title} <br/>
            {book.Pages} <br/>
            {book.Score} <br/>
        </div>
            }
    </div>
  )
}

export default ShowBook

