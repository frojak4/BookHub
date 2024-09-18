import React,  {useContext, useEffect, useState} from 'react'
import { userContext } from '../App'
import axios from 'axios'
import Spinner from './Spinner'
import UserFeedItem from './UserFeedItem'

const UserFeed = () => {

    const [user, setUser] = useContext(userContext)
    const [entries, setEntries] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/entry/following/${user.user_id}`)
        .then((response) => {
         setEntries(response.data);
         console.log(response.data);
         setLoading(false);
        })
        .catch((err) => console.log(err))
    }, [])

  return (
    <div className="flex align-center flex-col mt-7">
        <h3 className="text-white text-2xl text-center">Feed: </h3>
        <div className="bg-slate-800 h-96 w-72 mt-2 rounded-xl overflow-auto 
        scrollbar scrollbar-thumb-rounded-full scrollbar-w-2 scrollbar-thumb-lime-500 hover:scrollbar-thumb-lime-600 ">
            
            {loading ? <Spinner/> :
            entries.map((entry, i) => {
                return <UserFeedItem key={i} entry={entry}/>
            })
            }
        </div>
    </div>
  )
}

export default UserFeed