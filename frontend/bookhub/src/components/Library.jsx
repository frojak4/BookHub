import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BookInList from './BookInList';
import SortingButtons from './SortingButtons';

const Library = ({userToDisplay}) => {

    const [sort, setSort] = useState('titlesort')
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:3000/user/allbooks/${userToDisplay.user_id}/${sort}`)
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
    <div className="flex align-center flex-col mx-2 mt-9 flex-1 h-[70vh]">
            <div className="bg-slate-800 w-full h-full rounded-md overflow-auto
            scrollbar scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-thumb-lime-500 hover:scrollbar-thumb-lime-600">
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