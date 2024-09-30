import React, {useState, useEffect, useContext} from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const LogIn = () => {

    const [register, setRegister] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorMSG, setErrorMSG] = useState(false);
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate();


    const handleUserChange = (e) => {
        setUsernameInput(e.target.value)
        errorMSG(false);
    }

    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value)
        errorMSG(false);
    }

    useEffect(() => {
        setUser({username: '', user_id: null});
    }, [])

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
        <Header searchBar={false}/>
        <div className="text-white flex justify-center mt-8">Welcome to BookHub, please log in or register to continue</div>
        <div>
            <div className="flex justify-center mt-4">
                <button onClick={() => setRegister(!register)} className="bg-white disabled:bg-slate-600 mx-1 w-20 rounded-lg py-1" disabled={!register}>
                    Login
                </button>
                <button onClick={() => setRegister(!register)} className="bg-white disabled:bg-slate-600 mx-1 w-20 rounded-lg py-1" disabled={register}>
                    Register
                </button>
            </div>
                
                <div className="flex mt-2 justify-center flex-col w-56 mx-auto items-center bg-gray-800 p-6 rounded-xl">
                    <input onChange={handleUserChange} value={usernameInput} className="h-8 p-2 my-1" type="text" placeholder="Username"/> 
                    <input onChange={handlePasswordChange} value={passwordInput} className="h-8 p-2 my-1" type="password" placeholder="Password"/> 
                    {register ? 
                    <button onClick={handleLogIn} className="bg-slate-600 text-white my-1 w-24 h-8 px-2 hover:cursor-pointer"> 
                    Register
                    </button>
                    :
                    <button onClick={handleLogIn} className="bg-slate-600 text-white my-1 w-24 h-8 px-2 hover:cursor-pointer"> 
                        Log In
                    </button>
                    }
                    
                </div>
                {errorMSG && <h3 className="text-red-500 text-center">Could not log in to account</h3>}
            
        </div>
    </div>
  )
}

export default LogIn