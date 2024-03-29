import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignIn.css';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                alert("Account created!");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='sign-in-body'>
            <div className="sign-in-container">
                <form className="sign-in-form" onSubmit={signUp}>
                    <h1>Create Account</h1>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>

                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                    <p>Have an account? <a href='/signin'>Sign In </a></p>
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>

    );
};

export default SignUp;
