import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const User = ({userToDisplay}) => {

    const [pages, setPages] = useState(0);
    const [readBooks, setReadBooks] = useState(0);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useContext(userContext);
    const [yourUser, setYourUser] = useState(false);
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const [follow, setFollow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost:3000/user/stats/${userToDisplay.user_id}`)
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

    useEffect(() => {
        if (userToDisplay.user_id === user.user_id){
            setYourUser(true)
        }

        if (!yourUser){
            axios.get(`http://localhost:3000/follow/find/${user.user_id}/${userToDisplay.user_id}`)
            .then((response) => {
                setFollow(response.data);
            })
        }

    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/follow/followercount/${userToDisplay.user_id}`)
        .then((response) => {
            setFollowers(response.data[0].followers);
        }).catch((err) => console.log(err));

        axios.get(`http://localhost:3000/follow/followingcount/${userToDisplay.user_id}`)
        .then((response) => {
            setFollowing(response.data[0].following);
        }).catch((err) => console.log(err));
    }, [follow])

    const logOut = () => {
        navigate('/');
    }

    const handleFollow = () => {
        if (follow){
            axios.delete(`http://localhost:3000/follow/delete/${user.user_id}/${userToDisplay.user_id}`)
            .then(() => setFollow(false));
        }
        if (!follow){
            axios.post(`http://localhost:3000/follow/create/${user.user_id}/${userToDisplay.user_id}`)
            .then(() => setFollow(true));
        }
    }



  return (
    <div className="bg-slate-800 h-72 w-64 mt-24 rounded-xl flex items-center flex-col">
        <img className="rounded-full h-24 w-24 mt-2" alt="profile" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"/>
        <h2 className="text-white text-lg border-b-2 border-slate-600 w-full text-center">{userToDisplay.username}</h2>
        {loading ? <Spinner/> : 


        <div className="flex h-full justify-between flex-col">
            {!yourUser &&
            <button className="bg-slate-600 text-center mt-2 rounded-xl text-white" onClick={handleFollow}>{follow ? 'Following' : 'Follow'}</button>}
            <div className="flex">
                <h3 className="text-white mx-2">
                    Followers: {followers}
                </h3>
                <h3 className="text-white mx-2">
                    Following: {following}
                </h3>
            </div>
            <div className="text-center mb-4">
                <h3 className="text-slate-400">Pages: {pages ? pages : 0}</h3>
                <h3 className="text-slate-400">Books: {readBooks}</h3>
            </div>
            
        </div>
        }
        {yourUser && 
        <button onClick={logOut} className="text-white mb-1">Log Out</button>
        }
        
    </div>
  )
}

export default User