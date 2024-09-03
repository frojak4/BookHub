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
    const [inDatabase, setInDatabase] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`http://localhost:3000/books/${id}`)
        .then((response) => {
            console.log(response.data)
            setBook(response.data[0]);
            setLoading(false);
        })
        .catch(() => {
            axios.get(`http://localhost:3000/getbook/${id}`)
            .then((response) => {
                setBook(formatBook(response.data));
                setInDatabase(false)
                setLoading(false);
            })
            .catch((error) => console.log(error));
        })
        
    }, [id])

  return (
    <div className="bg-slate-950 h-screen w-screen">
        <Header/>
        {loading ? <Spinner/> : 
            <BookPageDisplay book={book} inDatabase={inDatabase} setInDatabase={setInDatabase}/>
        }
    </div>
  )
}

export default ShowBook

