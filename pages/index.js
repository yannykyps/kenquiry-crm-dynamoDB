import React, {useState } from "react";
import Dashboard from "../components/dashboard";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import useSWR from "swr";
import TableBody from "../components/table/tableBody";
import DashStats from "../components/dashStats";
import DashStatsGrid from "../components/dashStatsGrid";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const {data, error} = useSWR("/api/request", fetcher);
  const [expand, setExpand] = useState("");
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const breach = data.Items.filter((item) => item.dueBy < Date.now());
  const newRequests = data.Items.filter(item => item.status === "New")

  function OnExpand(e) {
    const value = e.currentTarget.getAttribute("value");
    if (value !== expand) {
      setExpand(value);
    } else {
      setExpand("");
    }
  }

  return (
    <Layout>
      <SEO title="Dashboard" description="Kenquiry CRM dashboard" />
      <Title
        title="Dashboard"
        subTitle="Dashboard used to monitor all active requests for your team"
      />
      <DashStatsGrid grid={4}>
      <DashStats total={data.Count} title="Total Requests"/>
      <DashStats total={breach.length} title="Total Breached"/>
      <DashStats total={`${Math.round((breach.length/data.Count)*100)}%`} title="% Breached"/>
      <DashStats total={newRequests.length} title="New Requests"/>
      </DashStatsGrid>
      <Dashboard>
        {data.Items.sort((dateX, dateY) => dateX.dueBy - dateY.dueBy).map(
          (item) => {
            return (
              <TableBody
                key={item.id}
                dueBy={item.dueBy}
                entryDate={item.entryDate}
                fullName={item.fullName}
                id={item.id}
                job={item.job}
                response={item.response}
                status={item.status}
                team={item.team}
                timeLeft={Date.now()}
                OnExpand={OnExpand}
                expand={expand}
              />
            );
          }
        )}
      </Dashboard>
    </Layout>
  );
}
