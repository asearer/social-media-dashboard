import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Paper, Container } from '@mui/material';

const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const containerWidth = svg.node().parentElement.clientWidth;
    const height = 300;

    const margin = { top: 20, right: 20, bottom: 60, left: 50 }; // Adjusted bottom margin
    const width = containerWidth - margin.left - margin.right;
    const heightAdjusted = height - margin.top - margin.bottom;

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([heightAdjusted, 0]);

    // Clear previous content
    svg.selectAll('*').remove();

    // Create a group for the chart content
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw bars
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.label))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => heightAdjusted - yScale(d.value))
      .attr('fill', 'steelblue')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', 'orange');
        tooltip.style('visibility', 'visible').text(`${d.label}: ${d.value}`);
      })
      .on('mousemove', function(event) {
        tooltip.style('top', (event.pageY - 10) + 'px')
               .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', 'steelblue');
        tooltip.style('visibility', 'hidden');
      });

    // Add X-axis
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${heightAdjusted})`)
      .call(d3.axisBottom(xScale).tickSize(0)) // Remove tick lines
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#e0e0e0'); // Lighter text color for readability

    // Add Y-axis
    g.append('g')
      .call(d3.axisLeft(yScale).tickSize(0)) // Remove tick lines
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#e0e0e0'); // Lighter text color for readability

    // Add axis labels
    xAxis.append('text')
      .attr('transform', `translate(${width / 2},${margin.bottom - 5})`)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#e0e0e0') // Lighter text color for readability
      .text('Category');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (heightAdjusted / 2))
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#e0e0e0') // Lighter text color for readability
      .text('Value');

    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#333')
      .style('color', '#fff')
      .style('border', '1px solid #555')
      .style('padding', '5px')
      .style('border-radius', '3px');

    // Update chart on window resize
    const handleResize = () => {
      const newWidth = svg.node().parentElement.clientWidth;
      svg.attr('width', newWidth);
      const newWidthAdjusted = newWidth - margin.left - margin.right;
      xScale.range([0, newWidthAdjusted]);
      xAxis.call(d3.axisBottom(xScale).ticks(newWidthAdjusted / 80));

      // Update axis labels
      xAxis.select('text')
        .attr('transform', `translate(${newWidthAdjusted / 2},${margin.bottom - 5})`);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [data]);

  return (
    <Container maxWidth="md" component={Paper} style={{ padding: 20, marginTop: 20, background: '#2e2e2e', borderRadius: 12, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}>
      <svg ref={ref}></svg>
    </Container>
  );
};

export default BarChart;







