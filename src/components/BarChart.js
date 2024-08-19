import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Paper, Container } from '@mui/material';

const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const containerWidth = svg.node().parentElement.clientWidth; // Responsive width
    const height = 300;

    // Set the SVG dimensions
    svg.attr('width', containerWidth)
       .attr('height', height);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
    g.append('g')
      .attr('transform', `translate(0,${heightAdjusted})`)
      .call(d3.axisBottom(xScale));

    // Add Y-axis
    g.append('g')
      .call(d3.axisLeft(yScale));

    // Add axis labels
    g.append('text')
      .attr('transform', `translate(${width / 2},${heightAdjusted + margin.bottom - 10})`)
      .style('text-anchor', 'middle')
      .text('Category');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (heightAdjusted / 2))
      .style('text-anchor', 'middle')
      .text('Value');

    // Create tooltip
    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('border-radius', '3px');

    // Update chart on window resize
    const handleResize = () => {
      const newWidth = svg.node().parentElement.clientWidth;
      svg.attr('width', newWidth);
      // Update scales, axes, and bars
      xScale.range([0, newWidth - margin.left - margin.right]);
      svg.selectAll('rect')
        .attr('x', d => xScale(d.label))
        .attr('width', xScale.bandwidth());
      g.select('g').call(d3.axisBottom(xScale).ticks(newWidth / 80));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [data]);

  return (
    <Container maxWidth="md" component={Paper} style={{ padding: 20, marginTop: 20 }}>
      <svg ref={ref}></svg>
    </Container>
  );
};

export default BarChart;



