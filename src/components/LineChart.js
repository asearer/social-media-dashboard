import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Paper, Container } from '@mui/material';

const LineChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const containerWidth = svg.node().parentElement.clientWidth;
    const height = 300;

    svg.attr('width', containerWidth).attr('height', height);

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const heightAdjusted = height - margin.top - margin.bottom;

    // Clear previous elements
    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.week, d.month, d.year))])
      .nice()
      .range([heightAdjusted, 0]);

    const line = d3.line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.value));

    const color = d3.scaleOrdinal()
      .domain(['week', 'month', 'year'])
      .range(['#ff6347', '#1e90ff', '#32cd32']);

    const growthTypes = ['week', 'month', 'year'];

    growthTypes.forEach(type => {
      g.append('path')
        .datum(data.map(d => ({ date: d.date, value: d[type] })))
        .attr('fill', 'none')
        .attr('stroke', color(type))
        .attr('stroke-width', 2)
        .attr('d', line);
    });

    g.append('g')
      .attr('transform', `translate(0,${heightAdjusted})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %d')));

    g.append('g')
      .call(d3.axisLeft(yScale));

    g.append('text')
      .attr('transform', `translate(${width / 2},${heightAdjusted + margin.bottom - 10})`)
      .style('text-anchor', 'middle')
      .text('Date')
      .attr('fill', '#e0e0e0');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (heightAdjusted / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Growth')
      .attr('fill', '#e0e0e0');

    // Tooltip
    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('border-radius', '3px');

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(new Date(d.date)))
      .attr('cy', d => yScale(d.week))
      .attr('r', 4)
      .attr('fill', '#ff6347')
      .on('mouseover', function(event, d) {
        tooltip.style('visibility', 'visible')
               .html(`Week: ${d.week}<br/>Date: ${d3.timeFormat('%b %d')(new Date(d.date))}`)
               .style('top', (event.pageY - 10) + 'px')
               .style('left', (event.pageX + 10) + 'px');
      })
      .on('mousemove', function(event) {
        tooltip.style('top', (event.pageY - 10) + 'px')
               .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        tooltip.style('visibility', 'hidden');
      });

    return () => {
      svg.selectAll('*').remove();
      tooltip.remove();
    };
  }, [data]);

  return (
    <Container maxWidth="md" component={Paper} style={{ padding: 20, marginTop: 20 }}>
      <svg ref={ref}></svg>
    </Container>
  );
};

export default LineChart;


