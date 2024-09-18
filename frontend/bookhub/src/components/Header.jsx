import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchResult from './SearchResult';
import UserSearchResult from './UserSearchResult';

const Header = ({searchBar}) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchSort, setSearchSort] = useState('books')

  const handleSearch = (e) => {
    setSearch(e.target.value)

    if (search.length === 0) {
      setSearchData([]);
    }

    if (searchSort === 'books') {
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
  } else if (searchSort === 'users') {
    axios.get(`http://localhost:3000/user/search/${search}`)
    .then((response) => {
      setSearchData(response.data)
    })
    .catch((err) => console.log(err))
  }
  }

  const handleSearchSort = (e) => {
    setSearchSort(e.target.value)
  }


  return (
    <div className="bg-slate-800 h-12 w-screen flex justify-between items-center">
        <Link to={'/home'}>
            <h3 className="text-2xl text-lime-500 ml-2">Bookhub</h3>
        </Link>
        {searchBar && 
        <div>
          <div className="flex">
          <input className="w-56 rounded-md" value={search} onInput={handleSearch} onBlur={() => setIsFocused(true)} onFocus={() => setIsFocused(true)} placeholder="Search Books"></input>
          <form className="ml-2 mt-2 text-sm text-white" onChange={handleSearchSort}>
            Search for
            <input checked={searchSort === 'books'} className="mx-1" type="radio" name="sort" value="books" />
            Books
            <input checked={searchSort === 'users'} className="mx-1" type="radio" name="sort" value="users"/>
            Users
          </form>
          </div>
          {searchData.length > 0 && 
          <div className="bg-slate-800 text-white fixed flex flex-col z-10 border-2 border-slate-800 mt-3 rounded-md w-[32rem] max-w-[32rem] max-h-80 overflow-auto">
            {search && isFocused && searchSort === 'books' &&
            searchData.map((book, i) => {
              return <SearchResult book={book} key={i}/>
            })
          }
          {search && isFocused && searchSort === 'users' &&
            searchData.map((user, i) => {
              return <UserSearchResult user={user} key={i}/>
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