import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Library from '../components/Library';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import User from '../components/User';
const Profile = () => {

    const {username} = useParams();
    const [displayUser, setDisplayUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/user/${username}`)
        .then((response) => {
            setDisplayUser(response.data[0]);
            setLoading(false);
        }).catch((err) => console.log(err))
    }, [username])


  return (
    <div className="bg-slate-950 min-w-screen min-h-screen">
        <Header/>
        {loading ? <Spinner/> : 
        <div className="flex justify-evenly">
            <User userToDisplay={displayUser} />
            <Library userToDisplay={displayUser}/>
        </div>
        }
    </div>
  )
}

export default Profile