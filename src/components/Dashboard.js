import React, { useState, useEffect } from 'react';
import BarChart from './BarChart'; 
import PostScheduler from './PostScheduler'; 
import Analytics from './Analytics'; 
import { Container, Typography, Paper } from '@mui/material';

// Sample data
const sampleData = [
  { label: 'Facebook', value: 200 },
  { label: 'Twitter', value: 150 },
  { label: 'Instagram', value: 300 },
  { label: 'LinkedIn', value: 100 },
];

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        setData(sampleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" component={Paper} style={{ 
      padding: 20, 
      marginTop: 20, 
      background: '#2e2e2e', 
      borderRadius: 12, 
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' 
    }}>
      <Typography variant="h4" gutterBottom style={{ color: '#e0e0e0', fontFamily: '"Roboto", sans-serif', fontWeight: 700 }}>
        Social Media Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom style={{ color: '#e0e0e0' }}>
        Analytics Overview
      </Typography>
      <BarChart data={data} />
      <PostScheduler />
      <Analytics />
    </Container>
  );
};

export default Dashboard;







