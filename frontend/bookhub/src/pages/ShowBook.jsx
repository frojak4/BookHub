import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import BookPageDisplay from '../components/BookPageDisplay';
import { checkIfInDatabase, formatBook } from '../components/utility';


const ShowBook = ({user}) => {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState();
    const [inDatabase, setInDatabase] = useState(true);
    const [entry, setEntry] = useState();

    useEffect(() => {
        setLoading(true);

        const fetchBook = async () => {

            if (await checkIfInDatabase(id)) {
                axios.get(`http://localhost:3000/books/${id}`)
                .then((response) => {
                    setBook(response.data)
                    setInDatabase(true);

                    axios.get(`http://localhost:3000/user/getentry/${id}/${user.user_id}`)
                    .then((response) => {
                        setEntry(response.data)
                        console.log(response.data);
                        console.log(entry);
                        setLoading(false);
                    })
                    .catch((error) => console.log(error));

                }).catch((err) => console.log(err));
                
            } else {
                axios.get(`http://localhost:3000/getbook/${id}`)
                .then((response) =>{
                    setBook(response.data)
                    setLoading(false);
                })
                .catch((err) => console.log(err))
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

