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
        setErrorMSG('');
    }

    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value)
        setErrorMSG('');
    }

    useEffect(() => {
        setUser({username: '', user_id: null});
    }, [])

    const handleLogIn = async (username, password) => {

        const userObject = {
            username: username,
            password: password
        }
        axios.get(`http://localhost:3000/user/login/user`, {params: userObject})
        .then((response) => {
            if (response.data.length > 0){
            setUser(response.data[0]);
            navigate('/home');
            } else setErrorMSG('Could not log in to account');
        })
        .catch(() => setErrorMSG('Could not log in to account'))
    }

    const handleRegister = async () => {
        axios.get(`http://localhost:3000/user/${usernameInput}`)
        .then((response) => {
            console.log(response.data)
            if (response.data.length === 0){    
                const userObject = {
                    username: usernameInput,
                    password: passwordInput
                }
                axios.post(`http://localhost:3000/user/register/user`, userObject)
                .then((response) => {
                    handleLogIn(usernameInput, passwordInput);
                }).catch((err) => console.log(err))
            } else {
                setErrorMSG('Username already in use. Please choose a new one.')
            }
        })
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
                    <button onClick={handleRegister} className="bg-slate-600 text-white my-1 w-24 h-8 px-2 hover:cursor-pointer"> 
                    Register
                    </button>
                    :
                    <button onClick={() => handleLogIn(usernameInput, passwordInput)} className="bg-slate-600 text-white my-1 w-24 h-8 px-2 hover:cursor-pointer"> 
                        Log In
                    </button>
                    }
                    
                </div>
                {errorMSG !== '' && <h3 className="text-red-500 text-center">{errorMSG}</h3>}
            
        </div>
    </div>
  )
}

export default LogIn