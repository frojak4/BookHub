import React, {useEffect, useContext} from 'react'
import Library from '../components/Library'
import User from '../components/User'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import UserFeed from '../components/UserFeed';

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(userContext);

  useEffect(() => {
    if (!user.user_id) {
      navigate('/');
    }
  }, [])

  

  return (
    <div className="bg-slate-950 min-w-screen min-h-screen">
        <Header searchBar={true}/>
        <div className="flex justify-evenly flex-wrap">
        <User userToDisplay={user} yourUser={true}/>
        <UserFeed/>
        <Library userToDisplay={user}/>
        </div>
    </div>
  )
}

export default Home