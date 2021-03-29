import React, {useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import {useRouter} from "next/router";
import useSWR from "swr";
import TableBody from "../components/table/tableBody";
import Dashboard from "../components/dashboard";
import DashStats from "../components/dashStats";
import DashStatsGrid from "../components/dashStatsGrid";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AllocatedPage() {
    const router = useRouter();
  const {name} = router.query;
  const {data, error} = useSWR(`/api/allocated?name=${name}`, fetcher);
  const [expand, setExpand] = useState("");
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const breach = data.Items.filter((item) => item.dueBy < Date.now());

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
      <SEO title="Allocated" />
      <Title title={`Allocated ${name}`} />
      <DashStatsGrid grid={2}>
      <DashStats total={data.Count} title="Total Requests"/>
      <DashStats total={breach.length} title="Total Breached"/>
      </DashStatsGrid>
      <Dashboard total={data.Count} breach={breach.length}>
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
