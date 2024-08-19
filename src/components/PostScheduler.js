import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Button, Typography, List, ListItem, Paper, Container } from '@mui/material';

const PostScheduler = () => {
  const [post, setPost] = useState('');
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [scheduledPosts, setScheduledPosts] = useState([]);

  const handleSchedule = () => {
    if (post && scheduleTime) {
      setScheduledPosts([...scheduledPosts, { post, scheduleTime }]);
      setPost('');
      setScheduleTime(new Date());
    } else {
      alert('Please provide both post content and schedule time.');
    }
  };

  return (
    <Container maxWidth="md" component={Paper} style={{ 
      padding: 20, 
      marginTop: 20, 
      background: '#2e2e2e', 
      borderRadius: 12, 
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' 
    }}>
      <Typography variant="h6" gutterBottom style={{ color: '#e0e0e0' }}>
        Schedule a Post
      </Typography>
      <TextField
        label="Post Content"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        margin="normal"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        InputLabelProps={{ style: { color: '#e0e0e0' } }} // Adjust label color
        InputProps={{ style: { color: '#e0e0e0' } }} // Adjust text color
      />
      <DatePicker
        selected={scheduleTime}
        onChange={(date) => setScheduleTime(date)}
        showTimeSelect
        dateFormat="Pp"
        className="react-datepicker-wrapper"
        wrapperClassName="react-datepicker-wrapper"
        calendarClassName="react-datepicker-calendar"
        popperClassName="react-datepicker-popper" // Add custom styling class
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSchedule}
        style={{ marginTop: 20 }} // Add spacing
      >
        Schedule
      </Button>

      <Typography variant="h6" gutterBottom style={{ marginTop: 20, color: '#e0e0e0' }}>
        Scheduled Posts
      </Typography>
      <List>
        {scheduledPosts.map((scheduledPost, index) => (
          <ListItem key={index} style={{ borderBottom: '1px solid #555', marginBottom: 10 }}>
            <div>
              <Typography style={{ color: '#e0e0e0' }}>{scheduledPost.post}</Typography>
              <Typography color="textSecondary" style={{ color: '#a0a0a0' }}>Scheduled for: {scheduledPost.scheduleTime.toLocaleString()}</Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostScheduler;







