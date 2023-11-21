import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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

const RegisterForm = styled.div`
  background-color: ${(props) => props.theme.palette.background.paper};
  box-shadow: rgba(33, 35, 39, 0.08) 0px 8px 24px;
  padding: 90px 90px;
  border-radius: 10px;

  @media (max-width: 750px) {
    padding: 20px;
    background-color: transparent;
    box-shadow: none;
  }
`;

const StyledTextField = styled(TextField)`
  width: 360px;
  margin-bottom: 100px;
  @media (max-width: 750px) {
    width: 300px;

  }
`;


const RegisterProfile = () => {
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

    } catch (error) {
      console.error("Error during update:", error);
      setMessage(error.message);
    }
  };

  return (
    <StyledForm>
      <RegisterForm onSubmit={handleRegister} >
        <h1 style={{
          fontSize: '1.8rem',
          marginBottom: '25px',
          fontWeight: '500',
        }}>Sign Up</h1>
        <StyledTextField
          helperText="Please enter your email"
          id="email"
          name="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          helperText="Please enter your password"
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
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
        }}>Already have an account? <Button component={Link} to="/login" variant="text" sx={{
          marginRight: '10px',
        }}>Login</Button></Typography>
      </RegisterForm>
    </StyledForm>
  );
};

export default RegisterProfile;

