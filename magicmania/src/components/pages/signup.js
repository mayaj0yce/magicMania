import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import '../Header.css';
import GetUser from '../../utils/auth.js'; // Import the GetUser class

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await createUser({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });

      // Handle the response here, e.g., show success message or redirect to login.
      console.log('Registration successful:', response.data);

      // Clear the form fields after successful registration
      setUsername('');
      setEmail('');
      setPassword('');

      // Use the GetUser class to handle the login action
      GetUser.login(response.data.createUser.token);

      // Navigate to the user page on successful registration
      navigate('/User');
    } catch (error) {
      // Handle errors, e.g., display an error message.
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen wholeSignup">
      <div className="bg-white p-5 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white"
          />
        </div>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
        >
          Sign Up
        </button>
      </div>
    </div>
  );  
}

export default Signup;
