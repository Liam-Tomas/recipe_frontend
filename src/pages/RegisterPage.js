import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';


const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  max-width: 400px;
  min-height:94vh;
`;


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleRegister = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Successfully signed up. You can now sign in.');
      // Clear the form fields

    } catch (error) {
      console.error("Error during update:", error);
      setMessage(error.message);
    }
  };

  return (
    <StyledForm>
      <form onSubmit={handleRegister} style={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'rgba(33, 35, 39, 0.08) 0px 8px 24px',
        padding: '90px 90px',
        borderRadius: '10px'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          marginBottom: '25px'
        }}>Sign Up</h1>
        <TextField
          helperText="Please enter your email"
          id="email"
          name="email"
          label="Email"
          // value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "360px",
            margin: '10px',
          }}
        />
        <TextField
          helperText="Please enter your password"
          id="password"
          name="password"
          label="Password"
          type="password"
          // value={password}
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
          style={{ marginTop: '15px' }}
        >
          Register
        </Button>
        {message && <Typography variant="subtitle1" style={{
          color: theme.palette.primary.main,
          fontSize: '1.2rem',
          marginTop: '30px',
        }}>{message}</Typography>}
        <Typography variant="subtitle1" style={{
          color: theme.palette.text.secondary,
          fontSize: '1rem',
          marginTop: '30px',
        }}>Already have an account? <Button href="/login" variant="text" sx={{
          marginRight: '10px',
        }}>Login</Button></Typography>
      </form>
    </StyledForm>
  );
};

export default Register;

