import React from 'react';
import * as d3 from 'd3';
import { Container, Paper, Typography, Box } from '@mui/material';

// Sample data for growth analytics
const growthData = {
  services: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
  weekOverWeek: [5, 7, 3, 6],
  monthOverMonth: [12, 15, 8, 10],
  yearOverYear: [25, 30, 20, 22],
};

const GrowthAnalytics = () => {

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
        Growth Analytics
      </Typography>

      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="body1" style={{ color: '#ff5733' }}>Week-over-Week Growth</Typography>
        <Typography variant="body1" style={{ color: '#33ff57' }}>Month-over-Month Growth</Typography>
        <Typography variant="body1" style={{ color: '#3357ff' }}>Year-over-Year Growth</Typography>
      </Box>

      <svg ref={node => drawLineChart(node, growthData)} style={{ width: '100%', height: 300 }}></svg>

      <Typography 
        variant="h6" 
        gutterBottom 
        style={{ color: '#e0e0e0', marginTop: 20 }}
      >
        Performance Metrics by Service
      </Typography>

      {growthData.services.map((service, index) => (
        <Box key={service} style={{ marginBottom: 10 }}>
          <Typography 
            variant="subtitle1" 
            style={{ color: '#e0e0e0', fontWeight: 600 }}
          >
            {service}
          </Typography>
          <Typography variant="body2" style={{ color: '#ff5733' }}>
            Week-over-Week Growth: {growthData.weekOverWeek[index]}%
          </Typography>
          <Typography variant="body2" style={{ color: '#33ff57' }}>
            Month-over-Month Growth: {growthData.monthOverMonth[index]}%
          </Typography>
          <Typography variant="body2" style={{ color: '#3357ff' }}>
            Year-over-Year Growth: {growthData.yearOverYear[index]}%
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

const drawLineChart = (node, data) => {
  if (!node) return;

  const svg = d3.select(node);
  const width = svg.node().parentElement.clientWidth;
  const height = svg.node().parentElement.clientHeight;

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scalePoint()
    .domain(data.services)
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max([...data.weekOverWeek, ...data.monthOverMonth, ...data.yearOverYear])])
    .nice()
    .range([innerHeight, 0]);

  const lineGenerator = d3.line()
    .x((d, i) => xScale(data.services[i]))
    .y(d => yScale(d))
    .curve(d3.curveMonotoneX);

  svg.selectAll('*').remove();

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  g.append('g')
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-innerWidth))
    .selectAll('text')
    .style('fill', '#e0e0e0');

  g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).tickSize(-innerHeight))
    .selectAll('text')
    .style('fill', '#e0e0e0');

  g.append('path')
    .datum(data.weekOverWeek)
    .attr('fill', 'none')
    .attr('stroke', '#ff5733')
    .attr('stroke-width', 2)
    .attr('d', lineGenerator);

  g.append('path')
    .datum(data.monthOverMonth)
    .attr('fill', 'none')
    .attr('stroke', '#33ff57')
    .attr('stroke-width', 2)
    .attr('d', lineGenerator);

  g.append('path')
    .datum(data.yearOverYear)
    .attr('fill', 'none')
    .attr('stroke', '#3357ff')
    .attr('stroke-width', 2)
    .attr('d', lineGenerator);
};

export default GrowthAnalytics;

