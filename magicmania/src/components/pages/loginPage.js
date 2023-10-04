import React, { useState } from 'react';
import '../Header.css';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations';
import GetUser from '../../utils/auth.js';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(null);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        variables: {
          username,
          password,
        },
      });

      console.log('Login successful:', response.data);

      // Store the authentication token using GetUser.login
      GetUser.login(response.data.login.token);

      setUsername('');
      setPassword('');
      setLoginSuccess(true);

    } catch (error) {
      console.error('Login failed:', error);
      setLoginSuccess(false);
    }
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
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white"
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
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Log In
          </button>
        </div>
      </main>

      {/* Display Login Result */}
      {loginSuccess && <p>Login successful!</p>}
      {!loginSuccess && loginSuccess !== null && (
        <p>Login failed. Please check your username and password.</p>
      )}
    </div>
  );
}

export default LoginPage;
