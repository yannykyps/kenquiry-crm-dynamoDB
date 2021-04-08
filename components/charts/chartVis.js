import React, {useEffect} from "react";
import * as d3 from "d3";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ChartVis() {
  const {data, error} = useSWR("/api/request", fetcher);

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

      function scaleBar(selection, scale) {
        selection.style("transform", "scaleX(" + scale + ")");
      }

      function setFill(selection, color) {
        selection.style("fill", color);
      }

      function fade(selection, opacity) {
        selection.style("fill-opacity", opacity);
      }

      const bar = d3
        .select(".chart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 300)
        .selectAll("g")
        .data(newData)
        .enter()
        .append("g")
        // .attr("transform", "translate("+ margin.left +", "+ margin.top + ")")
        .attr("transform", (d, i) => "translate(0, " + i * 33 + ")");

      bar
        .append("rect")
        .style("width", (d) => d.total * 4 + "rem")
        .style("color", "green")
        .style("height", "30px")
        .style("fill", "lightgreen")
        .style("stroke", "black")
        .style("stroke-width", "1")
        .on("mouseover", function () {
          d3.select(this).call(scaleBar, 1.2).call(setFill, "orange");
          d3.selectAll("rect").filter(":not(:hover)").call(fade, 0.5);
        })
        .on("mouseout", function () {
          d3.select(this).call(scaleBar, 1).call(setFill, "lightgreen");
          d3.selectAll("rect").call(fade, 1);
        });

      bar
        .append("text")
        .attr("y", 20)
        .text((d) => {
          return d.team;
        });
    }
  });

  return (
    <>
      {error && <div>Failed to load</div>}
      {!data ? (
        <div>Loading... </div>
      ) : (
        <div
          className="chart"
          style={{maxWidth: "425px", maxHeight: "625px"}}
        ></div>
      )}
    </>
  );
}
