import React, {useEffect, useContext} from 'react'
import Library from '../components/Library'
import User from '../components/User'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user_id) {
      navigate('/');
    }
  }, [])

  const [user, setUser] = useContext(userContext);

  return (
    <div className="bg-slate-950 min-w-screen min-h-screen">
        <Header searchBar={true}/>
        <div className="flex justify-evenly flex-wrap">
        <User userToDisplay={user} yourUser={true}/>
        <Library userToDisplay={user}/>
        </div>
    </div>
  )
}

export default Home