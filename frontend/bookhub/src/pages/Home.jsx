import React, {useEffect} from 'react'
import Library from '../components/Library'
import User from '../components/User'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const Home = ({user}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user_id) {
      navigate('/');
    }
  }, [])



  return (
    <div className="bg-slate-950 min-w-screen min-h-screen">
        <Header/>
        <div className="flex justify-evenly flex-wrap">
        <User user={user}/>
        <Library user={user}/>
        </div>
    </div>
  )
}

export default Home