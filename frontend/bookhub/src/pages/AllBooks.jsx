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
            setLoading(true);
        })
        .catch((error) => {
            console.log(error)
            setLoading(true);
        });
    }, [])

  return (
    <div className="bg-slate-950 h-screen">
        {loading ? <Spinner/> : 
        books.map((book) => {
            return <div className="w-screen text-center"><Link to={`/books/${book.ID}`}> {book.Author} // {book.Title} // {book.Score}</Link></div>
        }
        )}
        <h3 className="text-amber-200 border-2 border-amber-400">Test</h3>
    </div>
  )
}

export default AllBooks