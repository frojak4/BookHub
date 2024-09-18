import React from 'react'
import Header from '../components/Header'

const Error = () => {
  return (
    <div className='h-screen w-screen bg-slate-950 text-center'>
        <Header searchbar={false}/>
        <h3 className="text-white text-2xl">Error 404!! <br/> Could not find the page you were looking for</h3>
    </div>
  )
}

export default Error