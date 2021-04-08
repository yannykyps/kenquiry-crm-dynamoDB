import React, {useEffect} from "react";
import * as d3 from "d3";
import useSWR from "swr";
import responsivefy from "./responsivefy"

const fetcher = (url) => fetch(url).then((res) => res.json());

const BarChart = () => {
  const {data, error} = useSWR("/api/request", fetcher);
  const margin = {top: 10, right: 20, bottom: 60, left: 40};
  const width = 384 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  useEffect(() => {
    if (data) {
      const newData = [
        {
          team: "Accounts",
          total: data.Items.filter((d) => d.team === "Accounts").length,
        },
        {
          team: "Estates",
          total: data.Items.filter((d) => d.team === "Estates").length,
        },
        {
          team: "HR",
          total: data.Items.filter((d) => d.team === "HR").length,
        },
        {
          team: "IT",
          total: data.Items.filter((d) => d.team === "IT").length,
        },
        {
          team: "Protocol",
          total: data.Items.filter((d) => d.team === "Protocol").length,
        },
      ];
      const svg = d3
        .select(".chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .call(responsivefy)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(newData, d => d.total)+1])
        .range([height, 0]);
      const yAxis = d3.axisLeft(yScale);
      svg.call(yAxis);

      const xScale = d3
        .scaleBand()
        .padding(0.2)
        .domain(newData.map((d) => d.team))
        .range([0, width]);

      const xAxis = d3.axisBottom(xScale).ticks(5).tickSize(10).tickPadding(5);
      svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
      //.selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-45)");

      svg
        .selectAll("rect")
        .data(newData)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.team))
        .attr("y", (d) => yScale(d.total))
        .attr("width", (d) => xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.total))
        .style("fill", "#3B82F6");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Requests Per Team");
    }
  },[data]);

  return (
    <>
      {error && <div>Failed to load</div>}
      {!data ? (
        <div>Loading... </div>
      ) : (
       <div className="chart max-w-sm max-h-screen border border-solid border-black bg-white"/>
      )}
    </>
  );
};

export default BarChart;

 
