import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import ShowBook from './pages/ShowBook';
import AllBooks from './pages/AllBooks';

function App() {


  return (
    <Routes>
      <Route path='/books/:id' element={<ShowBook/>}/>
      <Route path='/all/:sort' element={<AllBooks/>}/>
    </Routes>
  );
}

export default App;
