import React, {useEffect} from "react";
import * as d3 from "d3";
import useSWR from "swr";
import responsivefy from "./responsivefy";

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
          total: data.Items.filter(d => d.team === "Accounts").length,
        },
        {
          team: "Estates",
          total: data.Items.filter(d => d.team === "Estates").length,
        },
        {
          team: "HR",
          total: data.Items.filter(d => d.team === "HR").length,
        },
        {
          team: "IT",
          total: data.Items.filter(d => d.team === "IT").length,
        },
        {
          team: "Protocol",
          total: data.Items.filter(d => d.team === "Protocol").length,
        },
      ];
      const svg = d3
        .select(".svg-chart")
        .call(responsivefy)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      svg.selectAll("*").remove();

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(newData, d => d.total) + 1])
        .range([height, 0]);

      const yAxis = svg.append("g").call(d3.axisLeft(yScale).ticks(5));

      const xScale = d3
        .scaleBand()
        .padding(0.2)
        .domain(newData.map(d => d.team))
        .range([0, width]);

      const xAxis = d3.axisBottom(xScale).ticks(5).tickSize(10).tickPadding(5);
      svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

      const update = svg.selectAll("rect").data(newData);

      update
        .exit()
        .transition()
        .duration(1000)
        .attr("y", height)
        .attr("height", 0)
        .remove();

      yScale.domain([0, d3.max(newData, d => d.total) + 1]);
      yAxis.transition().duration(1000).call(d3.axisLeft(yScale).ticks(5));

      update
        .transition(0)
        .duration(1000)
        .attr("y", d => yScale(d.total))
        .attr("height", d => height - yScale(d.total));

      update
        .enter()
        .append("a")
          .attr("xlink:href", d => `/?team=${d.team}`
          )
        .append("rect")
        .attr("y", height)
        .attr("height", 0)
        .attr("x", d => xScale(d.team))
        .attr("width", (d) => xScale.bandwidth())
        .style("fill", "#3B82F6")
        .transition()
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr("y", d => yScale(d.total))
        .attr("height", d => height - yScale(d.total))
    }
  }, [data]);

  return (
    <>
      {error && <div>Failed to load</div>}
      {!data ? (
        <div>Loading... </div>
      ) : (
        <div className="max-w-sm max-h-screen bg-white shadow-md hover:shadow-xl rounded pt-4">
          <h2 className="text-center">Requests Per Team</h2>
          <svg
            className="svg-chart"
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          />
        </div>
      )}
    </>
  );
};

export default BarChart;
