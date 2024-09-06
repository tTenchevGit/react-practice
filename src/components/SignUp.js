import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            alert("Account created successfully!");
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Sign Up</h1>
            <form>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="buttonsLogin" onClick={handleSignup}>
                    Sign Up here
                </button>
            </form>
            <style jsx>{`
                .login-container {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                h1 {
                    margin-bottom: 20px;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-sizing: border-box;
                }

                .buttonsLogin {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .buttonsLogin:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default SignUp;