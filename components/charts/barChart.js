import PropTypes from "prop-types";
import React, {useState, useEffect, useRef} from "react";
import * as d3 from "d3";
import responsivefy from "./responsivefy";
import Button from "./button";

export default function BarChart({data}) {
  const ref = useRef();
  const [isStatus, setIsStatus] = useState("total");
  const margin = {top: 10, right: 20, bottom: 60, left: 40};
  const width = 384 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  useEffect(() => {
    if (data) {
      draw();
    }
  }, [data, isStatus]);

  function draw() {
    const filterData = data.Items.map((d) => ({
      team: d.team,
      total: data.Items.filter((a) => a.team === d.team).length,
      new: data.Items.filter((a) => a.team === d.team && a.status === "New")
        .length,
      furtherAction: data.Items.filter(
        (a) => a.team === d.team && a.status === "Further Action"
      ).length,
      allocated: data.Items.filter(
        (a) => a.team === d.team && a.status === "Allocated"
      ).length,
    }));
    const newData = [];
    const map = new Map();
    for (const item of filterData) {
      if (!map.has(item.team)) {
        map.set(item.team, true);
        newData.push({
          team: item.team,
          total: item.total,
          new: item.new,
          furtherAction: item.furtherAction,
          allocated: item.allocated,
        });
      }
    }
    const t = d3.transition(0).duration(1000);

    const svg = d3
      .select(ref.current)
      .call(responsivefy)
      .select(".chart")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(newData, (d) => d.total) + 1])
      .range([height, 0]);
    svg.select(".y-axis").call(d3.axisLeft(yScale).ticks(5));

    const xScale = d3
      .scaleBand()
      .padding(0.2)
      .domain(newData.map((d) => d.team).sort())
      .range([0, width]);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSize(10).tickPadding(5));

    const update = svg.selectAll("rect").data(newData);

    // yScale.domain([0, d3.max(newData, (d) => d.total) + 1]);
    // yAxis.transition().duration(1000).call(d3.axisLeft(yScale).ticks(5));

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
      .attr("x", (d) => xScale(d.team))
      .attr("width", xScale.bandwidth())
      .transition(t)
      .attr("y", (d) => yScale(d[isStatus]))
      .attr("height", (d) => height - yScale(d[isStatus]));
  }

  return (
    <div className="max-w-sm bg-white shadow-md hover:shadow-xl rounded pt-4">
      <h2 className="text-center capitalize">
        {isStatus.replace(/([A-Z])/g, " $1").trim()} Requests Per Team
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
      <div className="text-center">
        <Button
          onClick={(e) => setIsStatus(e.target.value)}
          value="total"
          label="Total"
        />
        <Button
          onClick={(e) => setIsStatus(e.target.value)}
          value="new"
          label="New"
        />
        <Button
          onClick={(e) => setIsStatus(e.target.value)}
          value="furtherAction"
          label="Further Action"
        />
        <Button
          onClick={(e) => setIsStatus(e.target.value)}
          value="allocated"
          label="Allocated"
        />
      </div>
    </div>
  );
}

BarChart.propTypes = {
  data: PropTypes.object.isRequired,
};
