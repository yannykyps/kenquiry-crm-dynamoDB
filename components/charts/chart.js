import React, {useEffect} from "react";
import * as d3 from "d3";
import members from "../data/teamMembers";
import team from "../../public/data.json";

export default function Chart() {
  const linearScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 600])
    .clamp(true);

  //   console.log(linearScale(0));
  //   console.log(linearScale(50));
  //   console.log(linearScale(105));
  //   console.log(linearScale.invert(300));

  const quantizeScale = d3
    .scaleQuantize()
    .domain([0, 100])
    .range(["red", "white", "green"]);

  //   console.log(quantizeScale(22));
  //   console.log(quantizeScale(50));
  //   console.log(quantizeScale(88));
  //   console.log(quantizeScale.invertExtent("white"));

  const ordinalScale = d3
    .scaleOrdinal()
    .domain(["poor", "good", "great"])
    .range(["red", "white", "green"]);

  //   console.log(ordinalScale("good"));
  //   console.log(ordinalScale("poor"));
  //   console.log(ordinalScale("great"));

  const timeScale = d3
    .scaleTime()
    .domain([new Date(2020, 0, 1), new Date()])
    .range([0, 100]);

  //   console.log(timeScale(new Date(2020, 3, 15)));
  //   console.log(timeScale(new Date()));
  //   console.log(timeScale.invert(50));

  // d3.json("/data.json").then((d) => {
  //     const min = d3.min(d, (d) => {
  //         return d.name
  //     })
  //     const max = d3.max(d, (d) => {
  //         return d.name
  //     })
  //     const extent = d3.extent(d, (d) => {
  //         return d.name
  //     })
  // //   console.log(d);
  // //   console.log(min);
  // //   console.log(max);
  // //   console.log(extent);
  // })

  // const div = d3.select("div")
  // console.log(div.nodes());

  // const divLinks = div.selectAll("a")
  // console.log(divLinks.nodes());

  // const actionLink = d3.select(".action")
  // console.log(actionLink.node());

//   const secondLink = d3
//     .select(".title")
//     .insert("button", "a:first-child")
//     .html("Inventory <b>SALE</b>");
//   console.log(secondLink.node());

  return (
    <article>
      <div className="title">
        <a href="#">About</a>
        <br />
        <a href="#">Products</a>
        <br />
        <a href="#">Contact</a>
      </div>
      <a className="action" href="#">
        Buy Now
      </a>
    </article>
  );
}
