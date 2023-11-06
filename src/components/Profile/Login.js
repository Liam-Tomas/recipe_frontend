import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  max-width: 400px;
  min-height:94vh;
`;

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.palette.background.paper};
  box-shadow: rgba(33, 35, 39, 0.08) 0px 8px 24px;
  padding: 90px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;

`

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 25px;
`

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
      navigate('/')
    } catch (error) {
      console.error(error);
      setMessage('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleLogin}>
        <Title >Login</Title>
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
        <div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: '10px' }}
          >
            Log In
          </Button>
        </div>
        {message && <Typography variant="subtitle1" style={{
          color: theme.palette.primary.main,
        }}>{message}</Typography>}
      </StyledForm>
    </FormContainer >
  );
};

export default Login;
