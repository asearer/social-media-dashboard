import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Paper, Container } from '@mui/material';

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const containerWidth = svg.node().parentElement.clientWidth;
    const height = 300;
    const radius = Math.min(containerWidth, height) / 2;

    svg.attr('width', containerWidth).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${containerWidth / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arc = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => color(d.data.label))
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', 'orange');
        tooltip.style('visibility', 'visible').text(`${d.data.label}: ${d.data.value}`);
      })
      .on('mousemove', function(event) {
        tooltip.style('top', (event.pageY - 10) + 'px')
               .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', d => color(d.data.label));
        tooltip.style('visibility', 'hidden');
      });

    arc.append('text')
      .attr('transform', d => `translate(${label.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('fill', '#e0e0e0')
      .style('font-family', '"Roboto", sans-serif')
      .style('font-size', '12px')
      .text(d => d.data.label);

    // Tooltip
    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('border-radius', '3px');

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

export default PieChart;
