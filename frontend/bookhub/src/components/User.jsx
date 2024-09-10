import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const User = ({user}) => {

    const [pages, setPages] = useState(0);
    const [readBooks, setReadBooks] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost:3000/user/stats/${user.user_id}`)
        .then((response) => {
            console.log(response.data)
            setPages(response.data[0].Pages)
            setReadBooks(response.data[0].Total)
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }, [])

    const logOut = () => {
        navigate('/');
    }


  return (
    <div className="bg-slate-800 h-72 w-64 mt-24 rounded-xl flex items-center flex-col">
        <img className="rounded-full h-24 w-24 mt-2" alt="profile" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"/>
        <h2 className="text-white text-lg border-b-2 border-slate-600 w-full text-center">{user.username}</h2>
        {loading ? <Spinner/> : 
        <div className="flex h-full justify-between flex-col">
            <div>
                <h3 className="text-slate-400">Pages: {pages ? pages : 0}</h3>
                <h3 className="text-slate-400">Books: {readBooks}</h3>
            </div>
            <button onClick={logOut} className="text-white mb-1">Log Out</button>
        </div>
        }
    </div>
  )
}

export default User