import React, {useState} from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = ({user, setUser}) => {

    const [register, setRegister] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [errorMSG, setErrorMSG] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsernameInput(e.target.value)
    }

    const handleLogIn = async () => {
        axios.get(`http://localhost:3000/user/${usernameInput}`)
        .then((response) => {
            setUser(response.data[0]);
            navigate('/home');
        })
        .catch(() => setErrorMSG(true))
    }

  return (
    <div className="bg-slate-950 min-w-screen min-h-screen">
        <Header/>
        <div className="text-white flex justify-center mt-8">Welcome to BookHub, please log in or register to continue</div>
        <div>
            <div className="flex justify-center mt-4">
                <button onClick={() => setRegister(!register)} className="bg-white disabled:bg-slate-600 mx-1 w-16 rounded-lg" disabled={!register}>
                    Login
                </button>
                <button onClick={() => setRegister(!register)} className="bg-white disabled:bg-slate-600 mx-1 w-16 rounded-lg" disabled={register}>
                    Register
                </button>
            </div>
            {register ? 
                <div>
                    <div className="flex mt-24 justify-center">
                    <input onChange={handleChange} value={usernameInput} className="mr-3 h-8 p-2" type="text" placeholder="Username"/> 
                    <button className="bg-slate-600 text-white ml-3 w-18 px-2 h-8"> 
                        Register
                    </button>
                </div>
                </div> : 
                <div className="flex mt-24 justify-center">
                    <input onChange={handleChange} value={usernameInput} className="mr-3 h-8 p-2" type="text" placeholder="Username"/> 
                    <button onClick={handleLogIn} className="bg-slate-600 text-white ml-3 w-18 h-8 px-2 hover:cursor-pointer"> 
                        Log In
                    </button>
                </div>
            }
            {errorMSG && <h3 className="text-red-500">Could not log in to account</h3>}
        </div>
    </div>
  )
}

export default LogIn