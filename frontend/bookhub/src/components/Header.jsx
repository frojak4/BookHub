import React from 'react'
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-slate-800 h-12 w-screen flex justify-between items-center">
        <Link to={'/home'}>
            <h3 className="text-2xl text-amber-400 ml-2">BookHub</h3>
        </Link>
        <input></input>
        <div className="flex">
            <h3 className="text-white mx-1">About</h3>
            <h3 className="text-white mx-1">Contact</h3>
        </div>
    </div>
  )
}

export default Header