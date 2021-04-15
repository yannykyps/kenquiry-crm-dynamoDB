import React, {useState, useEffect} from "react";
import Dashboard from "../components/dashboard";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import useSWR from "swr";
import TableBody from "../components/table/tableBody";
import DashStats from "../components/dashStats";
import DashStatsGrid from "../components/dashStatsGrid";
import Splashscreen from "../components/splashscreen";
import {useRouter} from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const {data, error} = useSWR("/api/request", fetcher);
  const [expand, setExpand] = useState("");
  const [filter, setFilter] = useState("total")
  const router = useRouter();
  const {team} = router.query;
  if (error) return <div>Failed to load</div>;
  if (!data) return <Splashscreen />;
  const breach = data.Items.filter((item) => item.dueBy < Date.now());
  const newRequests = data.Items.filter((item) => item.status === "New");

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
        title={`Dashboard ${!team ? "" : team} ${filter}`}
        subTitle="Dashboard used to monitor all active requests for your team. With authentication added, you can restrict access to show only your teams requests."
      />
      <DashStatsGrid>
        <DashStats
          total={
            data.Items.filter((item) => (team ? item.team === team : item.team))
              .length
          }
          title="Total Requests"
          onClick={() =>{setFilter("total")}}
        />
        <DashStats
          total={
            breach.filter((item) => (team ? item.team === team : item.team))
              .length
          }
          title="Total Breached"
          onClick={() =>{setFilter("Breached")}}
        />
        <DashStats
          total={`${Math.round(
            (breach.filter((item) => (team ? item.team === team : item.team))
              .length /
              data.Items.filter((item) =>
                team ? item.team === team : item.team
              ).length) *
              100
          )}%`}
          title="% Breached"
          onClick={() =>{setFilter("Breached")}}
        />
        <DashStats
          total={
            newRequests.filter((item) =>
              team ? item.team === team : item.team
            ).length
          }
          title="New Requests"
          onClick={() =>{setFilter("New")}}
        />
      </DashStatsGrid>
      <Dashboard>
        {data.Items.sort((dateX, dateY) => dateX.dueBy - dateY.dueBy)
          .filter((item) => (team ? item.team === team : item.team)).filter((item) => filter === "Breached" ? item.dueBy < Date.now() : filter === "New" ? item.status === "New" : item)
          .map((item) => {
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
                onClick={OnExpand}
                expand={expand}
              />
            );
          })}
      </Dashboard>
    </Layout>
  );
}
