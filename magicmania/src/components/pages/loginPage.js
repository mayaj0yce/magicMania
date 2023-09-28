import React, { useState } from 'react';

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

  return (
    <div>

      {/* Login Form */}
      <main>
        <h2>Please Log In</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
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
