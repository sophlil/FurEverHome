import React, { useState } from 'react';
import '../App.css'
//import CreateAccount from './CreateAccount';
import { useHistory} from 'react-router-dom';

const Login = () => {
    const[userName,setUserName] = useState('');
    const[password,setPassword] = useState('');
    const history = useHistory();

    const SignUp = () =>{
        history.push('/Create-Account');
    };

    return(
        <div className='login'>
            <header>
            <h2>Login Page</h2>
                <form action="/login" method="post">
                    <fieldset>
                        <legend>User Name</legend>
                        <label>Please enter your User Name</label>
                        <input type = "text" name="username" value={userName}
                        onChange = {e => setUserName(e.target.value)} required></input>
                    </fieldset>

                    <fieldset>
                    <legend>Password</legend>
                        <label>Please enter your Password</label>
                        <input type = "password" name="password" value={password}
                        onChange = {e=> setPassword(e.target.value)} required></input>

                    </fieldset>
                    <button type="submit">Login</button>
                    <button type="button" onClick={SignUp}>Sign Up</button>
                </form>

            </header>

        </div>
    );
}

export default Login;