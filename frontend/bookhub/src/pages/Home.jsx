import React, {useEffect, useContext, useState} from 'react'
import Library from '../components/Library'
import User from '../components/User'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import UserFeed from '../components/UserFeed';
import Spinner from '../components/Spinner';

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(userContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.user_id) {
      navigate('/');
    }
    setLoading(false);
  }, [])

  

  return (
    <>
    {loading ? <Spinner/> : 
    <div className="bg-slate-950 min-w-screen min-h-screen">
        
        <Header searchBar={true}/>
        <div className="flex justify-center flex-wrap w-8/12 mx-auto">
        <User userToDisplay={user} yourUser={true}/>
        <Library userToDisplay={user}/>
        <UserFeed />
        
        </div>
    </div>
    }
    </>
  )
}

export default Home