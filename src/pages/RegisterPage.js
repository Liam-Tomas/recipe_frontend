import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Successfully signed up. You can now sign in.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to sign up. Please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      minHeight:'95vh',
      flexDirection:'column',
    }}>
      <h1>Register</h1>
      <TextField
        helperText="Please enter your email"
        id="email"
        name="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "360px",
          marginBottom: '10px'
        }}
      />
      <TextField
        helperText="Please enter your password"
        id="password"
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "360px",
          marginBottom: '10px'
        }}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={{ margin: '5px' }}
      >
        Submit
      </Button>
      {message && <Typography variant="subtitle1">{message}</Typography>}
    </form>
  );
};

export default Register;
