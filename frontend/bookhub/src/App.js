import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import ShowBook from './pages/ShowBook';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import React, {createContext, useState} from 'react';
import Error from './pages/Error';


export const userContext = createContext();

function App() {



  const [user, setUser] = useState({username: '', user_id: null});

  return (
    <userContext.Provider value={[user, setUser]}>
      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/books/:id' element={<ShowBook/>}/>
        <Route path='/user/:username' element={<Profile/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </userContext.Provider>
  );
}

export default App;
