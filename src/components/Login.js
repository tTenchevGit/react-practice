
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert("Logged in successfully!");
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert("Account created successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='buttonsLogin' onClick={handleLogin}>Login</button>
     
      <button className='buttonsLogin' onClick={() => navigate('/Signup')}>Sign Up</button>
    
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

export default Login;