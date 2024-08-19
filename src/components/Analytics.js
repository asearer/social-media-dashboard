import React from 'react';
import PieChart from './PieChart';
import { Container, Paper, Typography } from '@mui/material';

// Sample analytics data
const analyticsData = [
  { label: 'Likes', value: 1200 },
  { label: 'Shares', value: 800 },
  { label: 'Comments', value: 400 },
  { label: 'Mentions', value: 200 },
];

const Analytics = () => {
  return (
    <Container maxWidth="md" component={Paper} style={{ 
      padding: 20, 
      marginTop: 20, 
      background: '#2e2e2e', 
      borderRadius: 12, 
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' 
    }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        style={{ color: '#e0e0e0', fontFamily: '"Roboto", sans-serif', fontWeight: 700 }}
      >
        Analytics Overview (Reach)
      </Typography>
      <PieChart data={analyticsData} />
    </Container>
  );
};

export default Analytics;





