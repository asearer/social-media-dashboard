import React, { useState } from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
// import Auth from './components/Auth'; // Comment out the Auth component import
import Dashboard from './components/Dashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(true); // Set authenticated to true

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      {authenticated ? (
        <Dashboard />
      ) : (
        <div>
          <Typography variant="h2" gutterBottom>
            Social Media Dashboard
          </Typography>
          <Typography variant="h6" gutterBottom>
            Please log in to access the dashboard.
          </Typography>
          {/* <Auth onLogin={setAuthenticated} /> */} {/* Comment out the Auth component */}
        </div>
      )}
    </Container>
  );
}

export default App;





