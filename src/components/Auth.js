import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'password';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      onLogin(true);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs" component={Paper} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error" style={{ marginTop: 10 }}>{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={{ marginTop: 20 }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Auth;


