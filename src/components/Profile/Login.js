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
  min-height:94vh;
  @media (max-width: 750px) {
    min-height: 90vh;
    background-color: transparent;
    box-shadow: none;
  }

}
`;

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.palette.background.paper};
  box-shadow: rgba(33, 35, 39, 0.08) 0px 8px 24px;
  padding: 90px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 750px) {
    padding: 20px;
    background-color: transparent;
    box-shadow: none;
  }
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 25px;
`

const StyledTextField = styled(TextField)`
  width: 360px;
  margin-bottom: 100px;
  @media (max-width: 750px) {
    width: 300px;

  }
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
      navigate('/');
      window.scrollTo(0, 0); // Scroll to the top of the page
    } catch (error) {
      console.error(error);
      setMessage('Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleLogin}>
        <Title >Login</Title>
        <StyledTextField
          helperText="Please enter your email"
          id="email"
          name="email"
          label="Email"
          // value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          helperText="Please enter your password"
          id="password"
          name="password"
          label="Password"
          type="password"
          // value={password}
          onChange={(e) => setPassword(e.target.value)}
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
