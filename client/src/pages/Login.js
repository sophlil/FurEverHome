import React, { useState } from 'react';
import '../App.css'

const Login = () => {
    const[userName,setUserName] = useState('');
    const[password,setPassword] = useState('');

    return(
        <div>
            <header>
            <h2>Login Page</h2>
                <form action="http://localhost:3000/login" method="post">
                    <fieldset>
                        <legend>User Name</legend>
                        <label>Please enter your User Name</label>
                        <input type = "text" name="username" value={userName}
                        onChange = {e => setUserName(e.target.value)} required></input>
                    </fieldset>

                    <fieldset>
                    <legend>Password</legend>
                        <label>Please enter your Password</label>
                        <input type = "text" name="password" value={password}
                        onChange = {e=> setPassword(e.target.value)} required></input>

                    </fieldset>
                    <button type="submit">Login</button>
                    <button type="submit">Sign Up</button>
                </form>

            </header>

        </div>
    );
}

export default Login;