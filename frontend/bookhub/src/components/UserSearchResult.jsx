import React from 'react'
import { Link } from 'react-router-dom'

const UserSearchResult = ({user}) => {
  return (
    <div>
        <Link to={`/user/${user.username}`}>
    <div className="p-1 hover:bg-blue-700 hover:cursor-pointer flex flex-wrap justify-between">
        
        <span>{user.username}</span>
    </div>
    </Link>
    </div>
  )
}

export default UserSearchResult