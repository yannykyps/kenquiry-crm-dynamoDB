import React, {useEffect} from "react";
import * as d3 from "d3";
import useSWR from "swr";
import responsivefy from "./responsivefy";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PieChart = () => {
  const {data, error} = useSWR("/api/request", fetcher);
  const margin = 40;
  const width = 450;
  const height = 450;
  const radius = Math.min(width, height) / 2 - margin;

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
        .select(".svg-pie")
        .call(responsivefy)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      svg.selectAll("*").remove();

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie().value(function (d) {
        return d.total;
      });

      const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

      svg
        .selectAll("mySlices")
        .data(pie(newData))
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", function (d, i) {
          return color(i);
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function (d) {
          d3.select(this).attr("style", "fill-opacity:1;");
        })
        .on("mouseout", function () {
          d3.select(this).attr("style", "fill-opacity:0.7;");
        });

      svg
        .selectAll("mySlices")
        .data(pie(newData))
        .enter()
        .append("text")
        .text(function (d) {
          return d.data.team;
        })
        .attr("transform", function (d) {
          return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", 14);
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
          <svg className="svg-pie" width={width} height={height} />
        </div>
      )}
    </>
  );
};

export default PieChart;
