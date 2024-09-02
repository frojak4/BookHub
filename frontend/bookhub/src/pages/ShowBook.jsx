import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import BookPageDisplay from '../components/BookPageDisplay';
import { formatBook } from '../components/utility';


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
        .catch(() => {
            axios.get(`http://localhost:3000/getbook/${id}`)
            .then((response) => {
                setBook(formatBook(response.data));
                setLoading(false);
                console.log(book);
            })
            .catch((error) => console.log(error));
        })
        
    }, [id])

  return (
    <div className="bg-slate-950 h-screen w-screen">
        <Header/>
        {loading ? <Spinner/> : 
            <BookPageDisplay book={book}/>
        }
    </div>
  )
}

export default ShowBook

