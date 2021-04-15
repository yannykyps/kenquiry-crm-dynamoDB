import BarChart from "../components/charts/barChart";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import PieChart from "../components/charts/pieChart";
import useSWR from "swr";
import Splashscreen from "../components/splashscreen";
import Gauge from "../components/charts/gauge";
import React, {useState, useEffect, useRef} from "react";
import * as d3 from "d3";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AnalysisPage() {
  const {data, error} = useSWR("/api/request", fetcher);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStatus, setIsStatus] = useState("total");

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
      setChartData(newData);
      setLoading(false);
    }
  }, [data, isStatus]);

  
  return (
    <Layout>
      <SEO title="Analysis" />
      <Title
        title="Analysis"
        subTitle="Analyse all requests visually with interactive charts and graphs. When there is more data to analyse, you can create different types of visuals."
      />
      {error && <div>Failed to load</div>}
      {loading ? (
        <div>
          <Splashscreen />
        </div>
      ) : (
        <div className="my-8">
          <Gauge
            value={Math.round(
              (data.Items.filter((item) => item.dueBy < Date.now()).length /
                data.Count) *
                100
            )}
            label="% Breached"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-center my-8 gap-y-8">
          <BarChart data={chartData} title="Requests Per Team" filter={isStatus} xAxis={"team"} yAxis={[0, d3.max(chartData, (d) => d.total) + 1]} xScale={"team"} width={384} height={500} margin={{top: 10, right: 20, bottom: 60, left: 40}}>
            <BarChart.Button
              label="Total"
              value="total"
              onClick={(e) => setIsStatus(e.target.value)}
            />
            <BarChart.Button
              label="New"
              value="new"
              onClick={(e) => setIsStatus(e.target.value)}
            />
            <BarChart.Button
              label="Further Action"
              value="furtherAction"
              onClick={(e) => setIsStatus(e.target.value)}
            />
            <BarChart.Button
              label="Allocated"
              value="allocated"
              onClick={(e) => setIsStatus(e.target.value)}
            />
          </BarChart>
          <PieChart data={chartData} />
          </div>
        </div>
      )}
    </Layout>
  );
}
