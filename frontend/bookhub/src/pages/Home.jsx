import React from 'react'
import Library from '../components/Library'
import User from '../components/User'
import Header from '../components/Header'

const Home = ({user}) => {
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