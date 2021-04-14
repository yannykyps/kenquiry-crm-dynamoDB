import PropTypes from "prop-types";
import React, {useEffect, useRef} from "react";
import * as d3 from "d3";
import responsivefy from "./responsivefy";

export default function PieChart({data}) {
  const ref = useRef();
  const margin = 40;
  const width = 384;
  const height = 384;
  const radius = Math.min(width, height) / 2 - margin;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .call(responsivefy)
      .select(".chart")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    svg.selectAll("*").remove();

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value((d) => d.total);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const update = svg.selectAll("mySlices").data(pie(data));

    update
      .join((enter) =>
        enter
          .append("a")
          .attr("xlink:href", (d) => `/?team=${d.data.team}`)
          .append("path")
          .attr("class", "stroke-current text-black stroke-2")
          .style("fill-opacity", 0.7)
      )
      .attr("d", arcGenerator)
      .attr("fill", function (d, i) {
        return color(i);
      })
      .on("mouseover", function (d) {
        d3.select(this).attr("style", "fill-opacity:1;");
      })
      .on("mouseout", function () {
        d3.select(this).attr("style", "fill-opacity:0.7;");
      });

    svg
      .selectAll("mySlices")
      .data(pie(data))
      .join("text")
      .text(function (d) {
        return d.data.team;
      })
      .attr("transform", function (d) {
        return "translate(" + arcGenerator.centroid(d) + ")";
      })
      .attr("class", "text-xs text-left")
      .attr("text-anchor", "middle");
  }, [data]);

  return (
    <div className="max-w-sm bg-white shadow-md hover:shadow-xl rounded pt-4">
      <h2 className="text-center">Requests Per Team</h2>
      <svg ref={ref} className="svg-pie" width={width} height={height}>
        <g className="chart"></g>
      </svg>
    </div>
  );
}

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
};
