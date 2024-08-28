import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const AllBooks = () => {

    const {sort} = useParams();
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:3000/all/${sort}`)
        .then((response) => {
            console.log(response.data)
            setBooks(response.data)
            setLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setLoading(false);
        });
    }, [])

  return (
    <div className="bg-slate-950 h-screen">
        {loading ? <Spinner/> : 
        books.map((book) => {
            return <div className=" bg-slate-800 w-screen text-center text-slate-100"><Link to={`/books/${book.ID}`}> {book.Author} // {book.Title} // {book.Score}</Link></div>
        }
        )}
    </div>
  )
}

export default AllBooks