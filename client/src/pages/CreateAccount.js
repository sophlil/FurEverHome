import React, { useState } from 'react';
import '../App.css'

const CreateAccount = () => {
    const[createuserName,setUserName] = useState('');
    const[createPassword,setPassword] = useState('');

    return(
        <div>
            <header>
            <h2>Create Account</h2>
                <form action="http://localhost:3000/login" method="post">
                    <fieldset>
                        <legend>User Name</legend>
                        <label>Create a username</label>
                        <input type = "text" name="username" value={createuserName}
                        onChange = {e => setUserName(e.target.value)} required></input>
                    </fieldset>

                    <fieldset>
                    <legend>Password</legend>
                        <label>Create a password</label>
                        <input type = "text" name="password" value={createPassword}
                        onChange = {e=> setPassword(e.target.value)} required></input>

                    </fieldset>
                    <button type="submit">Create Account</button>
                </form>

            </header>

        </div>
    );
}

export default CreateAccount;