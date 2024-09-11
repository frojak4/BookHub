import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BookInList from './BookInList';
import SortingButtons from './SortingButtons';

const Library = ({user}) => {

    const [sort, setSort] = useState('titlesort')
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:3000/user/allbooks/${user.user_id}/${sort}`)
        .then((response) => {
            setBooks(response.data)
            setLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setLoading(false);
        });
    }, [sort])


  return (
    <div className="flex align-center flex-col mt-7">
            <h3 className="text-white text-2xl text-center">{user.username}'s library</h3>
            <div className="bg-slate-800 h-[32rem] w-[32rem] rounded-xl mt-2 overflow-auto">
            <SortingButtons setSort={setSort} sort={sort}/>
                {loading ? <Spinner/> : 
                books.map((book, i) => {
                   return <BookInList key={i} book={book} />
                })}

            </div>
        </div>
  )
}

export default Library