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

        const fetchBook = async () => {

            try {
                const response = await axios.get(`http://localhost:3000/books/${id}`)
                setBook(response.data[0])
            } catch(err){
                console.log('Fetching from external API');
                try {
                    console.log("check")
                    const apiresponse = await axios.get(`http://localhost:3000/getbook/${id}`)
                    setBook(formatBook(apiresponse.data));
                    setInDatabase(false);
                } catch(err){
                    console.error(err);
                } 


         } finally {
            setLoading(false);
          }

    }
    fetchBook();
        
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

