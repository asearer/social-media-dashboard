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
  const svgRef = React.useRef();

  React.useEffect(() => {
    if (svgRef.current) {
      drawLineChart(svgRef.current, growthData);
    }
  }, [svgRef, growthData]);

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

      {/* Legend with colored lines */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Box display="flex" alignItems="center">
          <svg width="20" height="10">
            <line x1="0" y1="5" x2="20" y2="5" stroke="#ff5733" strokeWidth="2"/>
          </svg>
          <Typography variant="body1" style={{ color: '#ff5733', marginLeft: 8 }}>
            Week-over-Week Growth
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <svg width="20" height="10">
            <line x1="0" y1="5" x2="20" y2="5" stroke="#33ff57" strokeWidth="2"/>
          </svg>
          <Typography variant="body1" style={{ color: '#33ff57', marginLeft: 8 }}>
            Month-over-Month Growth
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <svg width="20" height="10">
            <line x1="0" y1="5" x2="20" y2="5" stroke="#3357ff" strokeWidth="2"/>
          </svg>
          <Typography variant="body1" style={{ color: '#3357ff', marginLeft: 8 }}>
            Year-over-Year Growth
          </Typography>
        </Box>
      </Box>

      {/* Line chart */}
      <svg ref={svgRef} style={{ width: '100%', height: 300 }}></svg>

      {/* Tooltip */}
      <div id="tooltip" style={{
        position: 'absolute',
        backgroundColor: '#333',
        color: '#fff',
        padding: '5px',
        borderRadius: '4px',
        pointerEvents: 'none',
        visibility: 'hidden',
      }}></div>

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
  const height = svg.node().clientHeight;

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scalePoint()
    .domain(data.services)
    .range([0, innerWidth])
    .padding(0.5);

  // Set yScale to a fixed range from 0 to 50
  const yScale = d3.scaleLinear()
    .domain([0, 50])
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

  // Tooltip
  const tooltip = d3.select('#tooltip');

  const drawLineAndPoints = (dataSet, color, className) => {
    // Draw the line
    g.append('path')
      .datum(dataSet)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);

    // Draw the points
    g.selectAll(`.${className}-point`)
      .data(dataSet)
      .enter()
      .append('circle')
      .attr('class', `${className}-point`)
      .attr('cx', (d, i) => xScale(data.services[i]))
      .attr('cy', d => yScale(d))
      .attr('r', 4)
      .attr('fill', color)
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible')
          .text(`${d}%`);
        d3.select(event.target).attr('r', 6); // Enlarge the point on hover
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', (event) => {
        tooltip.style('visibility', 'hidden');
        d3.select(event.target).attr('r', 4); // Reset point size
      });
  };

  // Draw all lines and points with tooltips
  drawLineAndPoints(data.weekOverWeek, '#ff5733', 'wow');
  drawLineAndPoints(data.monthOverMonth, '#33ff57', 'mom');
  drawLineAndPoints(data.yearOverYear, '#3357ff', 'yoy');
};

export default GrowthAnalytics;







