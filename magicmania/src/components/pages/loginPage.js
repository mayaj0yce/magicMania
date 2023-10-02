import React, { useState } from 'react';
import '../Header.css';
import { Link } from 'react-router-dom';
// import showUser from './userPage';

function LoginPage() {
  // State to store the user's credentials
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State to track whether login was successful
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Function to handle username input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle password input changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle the login action
  const handleLogin = () => {
    // For examples purposes only!
    // Replace with actual logic with mangoDB later
    if (username === 'admin' && password === 'admin') {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
  };

  const NavLinks = () => {
    return (
      <>
        <Link to='/User' className="">Login
          </Link>
      </>
    );
  };

  return (
    <div>

      {/* Login Form */}
      <main className="flex justify-center items-center h-screen wholeSignup">
        <div className="bg-white p-5 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Please Log In</h2>
          <div className="mb-4">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button 
          onClick={handleLogin} 
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
          >
          <NavLinks />  
          </button>
        </div>
      </main>

      {/* Display Login Result */}
      {loginSuccess && <p>Login successful!</p>}
      {/* {!loginSuccess && loginSuccess !== null && (
        <p>Login failed. Please check your username and password.</p>
      )} */}


    </div>
  );
}

export default LoginPage;
