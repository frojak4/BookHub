import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import BookPageDisplay from '../components/BookPageDisplay';
import { checkIfInDatabase, formatBook } from '../components/utility';
import BookImage from '../components/BookImage';
import BookEntry from '../components/BookEntry';
import NewBookEntry from '../components/NewBookEntry';


const ShowBook = ({user}) => {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState();
    const [inDatabase, setInDatabase] = useState();
    const [entry, setEntry] = useState(null);
    const [hasEntry, setHasEntry] = useState(false)
    const [createdEntry, setCreatedEntry] = useState(false);


    useEffect(() => {
        setLoading(true);

        const fetchBook = async () => {

            const inDB = await checkIfInDatabase(id);
            setInDatabase(inDB);
            
            if (inDB) {
                axios.get(`http://localhost:3000/books/${id}`)
                .then((response) => {
                    console.log('server')
                    console.log(response.data[0])
                    setBook(response.data[0])
                    console.log(user);

                    axios.get(`http://localhost:3000/user/getentry/${id}/${user.user_id}`)
                    .then((response) => {
                        console.log('entry')
                        console.log(response.data[0]);
                        if(response.data[0]){
                            setEntry(response.data[0]);
                            setHasEntry(true);
                    }
                        setLoading(false);
                    })
                    .catch((error) => console.log(error));

                }).catch((err) => console.log(err));
                
            } else {
                axios.get(`http://localhost:3000/getbook/${id}`)
                .then((response) =>{
                    console.log(response.data)
                    setBook(formatBook(response.data))
                    setLoading(false);
                })
                .catch((err) => console.log(err))
            }

    }
    fetchBook();
    }, [id, createdEntry])


  return (
    <div className="bg-slate-950 h-screen w-screen">
        <Header searchBar={true}/>
        {loading ? <Spinner/> : 
            <div className="flex justify-center mt-16">
                <BookImage book={book}/> 
                <BookPageDisplay book={book}/>
                {hasEntry ? 
                <BookEntry book={book} user={user} inDatabase={inDatabase} score={entry.Score} ID={entry.entryID} pagesread={entry.PagesRead} status={entry.ReadingStatus} setInDatabase={setInDatabase}/> 
                : <NewBookEntry setCreatedEntry={setCreatedEntry} inDatabase={inDatabase} book={book} user={user}/>}
            </div>
        }
    </div>
  )
}

export default ShowBook

