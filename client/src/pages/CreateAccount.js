import React, { useState } from 'react';
import '../App.css'

const CreateAccount = () => {
    const[createName,setName] = useState('');
    const[createuserName,setUserName] = useState('');
    const[createPassword,setPassword] = useState('');

    return(
        <div>
            <header>
            <h2>Create Account</h2>
                <form action="/register/public" method="post">

                    <fieldset>
                    <legend>Name</legend>
                        <label>What is your name?</label>
                        <input type = "text" name="name" value={createName}
                        onChange = {e=> setName(e.target.value)} required></input>

                    </fieldset>

                    <fieldset>
                        <legend>User Name</legend>
                        <label>Create a username</label>
                        <input type = "text" name="userName" value={createuserName}
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