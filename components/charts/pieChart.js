import React, {useEffect} from "react";
import * as d3 from "d3";
import useSWR from "swr";
import responsivefy from "./responsivefy";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PieChart = () => {
  const {data, error} = useSWR("/api/request", fetcher);
  const margin = 40;
  const width = 384;
  const height = 384;
  const radius = Math.min(width, height) / 2 - margin;

  useEffect(() => {
    if (data) {
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

      const update = svg
        .selectAll("mySlices")
        .data(pie(newData))

        update
        .exit()
        .remove();

        update
        .enter()
        .append("a")
          .attr("xlink:href", d => `/?team=${d.data.team}`
          )
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", function (d, i) {
          return color(i);
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("fill-opacity", 0.7)
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
        .style("font-size", 12);
    }
  }, [data]);

  return (
    <>
      {error && <div>Failed to load</div>}
      {!data ? (
        <div>Loading... </div>
      ) : (
        <div className="max-w-sm bg-white shadow-md hover:shadow-xl rounded pt-4">
          <h2 className="text-center">Requests Per Team</h2>
          <svg className="svg-pie" width={width} height={height} />
        </div>
      )}
    </>
  );
};

export default PieChart;
