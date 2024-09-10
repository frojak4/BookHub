import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchResult from './SearchResult';

const Header = ({searchBar}) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value)

    if (search.length === 0) {
      setSearchData([]);
    } else {
    const formatString = e.target.value.replaceAll(' ', '+');
    
    axios
    .get(`http://localhost:3000/search/${formatString}`)
    .then((response) => {
      setSearchData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }
  }


  return (
    <div className="bg-slate-800 h-12 w-screen flex justify-between items-center">
        <Link to={'/home'}>
            <h3 className="text-2xl text-amber-400 ml-2">BookHub</h3>
        </Link>
        {searchBar && 
        <div>
          <input className="w-56 rounded-md" value={search} onInput={handleSearch} onBlur={() => setIsFocused(true)} onFocus={() => setIsFocused(true)} placeholder="Search Books"></input>
          {searchData.length > 0 && 
          <div className="bg-slate-800 text-white fixed flex flex-col z-10 border-2 border-slate-800 mt-3 rounded-md w-[32rem] max-w-[32rem] max-h-80 overflow-auto">
            {search && isFocused &&
            searchData.map((book, i) => {
              return <SearchResult book={book} key={i}/>
            })
          }
          </div>}
        </div>
        }
        <div className="flex">
            <h3 className="text-white mx-1">About</h3>
            <h3 className="text-white mx-1">Contact</h3>
        </div>
    </div>
  )
}

export default Header