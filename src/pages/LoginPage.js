import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const theme = useTheme()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Successfully signed in!');
      // navigate('/myrecipes')
    } catch (error) {
      console.error(error);
      setMessage('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <StyledForm style={{
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'rgba(33, 35, 39, 0.08) 0px 8px 24px',
        padding: '90px',
        borderRadius: '10px'

      }}>
        <h1 style={{
          fontSize: '1.8rem',
          marginBottom: '25px'
        }}>Login</h1>
        <TextField
          helperText="Please enter your email"
          id="email"
          name="email"
          label="Email"
          // value={email}
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
          style={{ marginTop: '10px' }}
        >
          Log In
        </Button>
        {message && <Typography variant="subtitle1" style={{
          color: theme.palette.primary.main,
          fontSize: '1.2rem',
          marginTop: '30px',
        }}>{message}</Typography>}
      </form>
    </StyledForm >
  );
};

export default Login;
