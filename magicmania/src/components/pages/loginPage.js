import React, { useState } from 'react';
import '../Header.css';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations'; // Import the LOGIN_USER mutation
import { useAuth } from '../../utils/AuthContext';
import GetUser from '../../utils/auth.js';

function LoginPage() {
  // State to store the user's credentials
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State to track whether login was successful
  const [loginSuccess, setLoginSuccess] = useState(null);

  // Use the useAuth hook to access authentication functions and user data
  const { setUser } = useAuth(); // Get setUser from the AuthContext


  // Use the useMutation hook to define the login mutation
  const [loginUser] = useMutation(LOGIN_USER);

  // Function to handle username input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle password input changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle the login action
  const handleLogin = async () => {
    try {
      // Call the loginUser mutation with the username and password
      const response = await loginUser({
        variables: {
          username,
          password,
        },
      });

      // Handle the response here, e.g., show success message or redirect to a user page.
      console.log('Login successful:', response.data);

      // Store the user in AuthContext using setUser
      setUser(response.data.user); // Set the user in AuthContext
      console.log('User set in AuthContext:', response.data.user);

      //Store the authentication token in the local storage
      GetUser.login(response.data.login.token);

      // Clear the form fields after successful login
      setUsername('');
      setPassword('');
      setLoginSuccess(true); // Set loginSuccess to true
    } catch (error) {
      // Handle errors, e.g., display an error message.
      console.error('Login failed:', error);
      setLoginSuccess(false); // Set loginSuccess to false on login failure
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
