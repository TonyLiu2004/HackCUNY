import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './SignIn.css'

function SignIn(){
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const signIn = (e) => {
        e.preventDefault(); 
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential);
            window.location.href = '/';
        }).catch((error) => {
            console.log(error); 
        })
    }

    return(
        <div className="sign-in-body">
            <div className='sign-in-container'>
                <form className="sign-in-form" onSubmit={signIn}>
                    <h1>Log In</h1>
                    <input 
                        type='email' 
                        placeholder='Enter your email'
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input 
                        type='password' 
                        placeholder='Enter your password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <p>Don't have an account? <a href='/signup'>Sign Up </a></p>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn;