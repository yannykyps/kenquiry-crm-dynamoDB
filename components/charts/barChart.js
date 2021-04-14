import PropTypes from "prop-types";
import React, { useEffect, useRef} from "react";
import * as d3 from "d3";
import responsivefy from "./responsivefy";
import Button from "./button";

export default function BarChart(props) {
  const ref = useRef();
  const margin = {top: 10, right: 20, bottom: 60, left: 40};
  const width = 384 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const xScaleProp = props.xScale
  const xAxisProp = props.xAxis
  // const yAxisProp = props.yAxis

  useEffect(() => {
    const t = d3.transition(0).duration(1000);

    const svg = d3
      .select(ref.current)
      .call(responsivefy)
      .select(".chart")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const yScale = d3
      .scaleLinear()
      // .domain([0, d3.max(props.data, (d) => d.total) + 1])
      .domain(props.yAxis)
      .range([height, 0]);
    svg.select(".y-axis").call(d3.axisLeft(yScale).ticks(5));

    const xScale = d3
      .scaleBand()
      .padding(0.2)
      .domain(props.data.map((d) => d[xAxisProp]).sort())
      // .domain(props.xAxis)
      .range([0, width]);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSize(10).tickPadding(5));

    const update = svg.selectAll("rect").data(props.data);

    update
      .join((enter) =>
        enter
          .append("a")
          .attr("xlink:href", (d) => `/?team=${d.team}`)
          .append("rect")
          .attr("class", "fill-current text-blue-500 hover:text-blue-800")
          .attr("y", height)
          .attr("height", 0)
          .sort()
      )
      .attr("x", (d) => xScale(d[xScaleProp]))
      // .attr("x", props.xScale)
      .attr("width", xScale.bandwidth())
      .transition(t)
      .attr("y", (d) => yScale(props.filter ? d[props.filter] : d.total))
      .attr("height", (d) => height - yScale(props.filter ? d[props.filter] : d.total));
  }, [props.data]);

  return (
    <div className="max-w-sm bg-white shadow-md hover:shadow-xl rounded pt-4">
      <h2 className="text-center capitalize">
        {props.filter && props.filter.replace(/([A-Z])/g, " $1").trim()} {props.title}
      </h2>
      <svg
        ref={ref}
        className="svg-chart"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g className="chart">
          <g className="x-axis" />
          <g className="y-axis" />
        </g>
      </svg>
      <div className="text-center">{props.children}</div>
    </div>
  );
}

BarChart.Button = (props) => (
  <Button onClick={props.onClick} value={props.value} label={props.label} />
);

BarChart.propTypes = {
  children: PropTypes.array,
  data: PropTypes.array.isRequired,
  filter: PropTypes.string,
  xAxis: PropTypes.string.isRequired,
  xScale: PropTypes.string.isRequired,
  /** pass the object name as a STRING that you want to use to map the x scale */
  yAxis: PropTypes.array.isRequired
}




