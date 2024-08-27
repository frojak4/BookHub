import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


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
    <div className="bg-blue-950">{loading ? <Spinner/> : 
        <div>
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

