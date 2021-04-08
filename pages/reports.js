import React, {useState } from "react";
import Layout from '../components/layout'
import SEO from '../components/SEO'
import Title from '../components/title'
import useSWR from "swr";
import Dashboard from '../components/dashboard'
import TableBody from "../components/table/tableBody";
import DashStatsGrid from "../components/dashStatsGrid";
import DashStats from "../components/dashStats";
import Splashscreen from "../components/splashscreen";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ReportsPage () {
    const {data, error} = useSWR(`/api/report`, fetcher);
    const [expand, setExpand] = useState("");
    if (error) return <div>Failed to load</div>;
    if (!data) return <Splashscreen />;
    const breach = data.Items.filter((item) => item.dueBy < item.updates.updatedDate);
    const sla = data.Items.filter((item) => item.dueBy > item.updates.updatedDate);

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
            <SEO title="Reports" />
            <Title title="Reports" subTitle="Use reports to anaylse SLAs, KPIs and any bespoke anaylsis. Sample below is a report showing completed requests" />
            <DashStatsGrid>
                <DashStats total={data.Count} title="Total Complete" />
                <DashStats total={sla.length} title="SLA Met" />
                <DashStats total={breach.length} title="SLA Not Met" />
                <DashStats total={`${Math.round((sla.length/data.Count)*100)}%`} title="% SLA" />
            </DashStatsGrid>
            <Dashboard completed>
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
                timeLeft={item.updates.updatedDate}
                onClick={OnExpand}
                expand={expand}
                report
                completedDate={item.updates.updatedDate}
                completed
              />
            );
          }
        )}
            </Dashboard>
        </Layout>
    )
}

