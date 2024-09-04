import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import ShowBook from './pages/ShowBook';
import AllBooks from './pages/AllBooks';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import React, {useState} from 'react';

function App() {

  const [user, setUser] = useState({username: '', user_id: null});

  return (
    <Routes>
      <Route path='/' element={<LogIn user={user} setUser={setUser}/>}/>
      <Route path='/home' element={<Home user={user}/>}/>
      <Route path='/books/:id' element={<ShowBook user={user}/>}/>
      <Route path='/all/:sort' element={<AllBooks/>}/>
    </Routes>
  );
}

export default App;
