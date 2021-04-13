import React, {useState} from "react";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import useSWR from "swr";
import moment from "moment";
import Dashboard from "../components/dashboard";
import TableBody from "../components/table/tableBody";
import DashStatsGrid from "../components/dashStatsGrid";
import DashStats from "../components/dashStats";
import Splashscreen from "../components/splashscreen";
import {Button, Container, Form, Input, Select} from "../components/form";
import teams from "../components/data/teams";
import response from "../components/data/responseTimes";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ReportsPage() {
  const {data, error} = useSWR(`/api/report`, fetcher);
  const [expand, setExpand] = useState("");
  const [filter, setFilter] = useState({
    team: "",
    response: "",
    sla: "",
    fullName: "",
    entryDateFrom: "",
    entryDateTo: "",
    completedDateFrom: "",
    completedDateTo: "",
  });
  if (error) return <div>Failed to load</div>;
  if (!data) return <Splashscreen />;
  const customer = [...new Set(data.Items.map((cust) => cust.fullName))];
  const entryDate = [...new Set(data.Items.map((entry) => entry.entryDate))];
  const completedDate = [
    ...new Set(data.Items.map((comp) => comp.updates.updatedDate)),
  ];
  const filteredData = data.Items.sort(
    (dateX, dateY) => dateX.dueBy - dateY.dueBy
  )
    .filter((team) =>
      team.team === filter.team ? team.team : filter.team === "" && team
    )
    .filter((response) =>
      response.response === filter.response
        ? response.response
        : filter.response === "" && response
    )
    .filter((sla) =>
      filter.sla === "yes"
        ? sla.dueBy > sla.updates.updatedDate
        : filter.sla === "no"
        ? sla.dueBy < sla.updates.updatedDate
        : sla
    )
    .filter((cust) =>
      cust.fullName === filter.fullName
        ? cust.fullName
        : filter.fullName === "" && cust
    )
    .filter((entry) =>
      entry.entryDate >= Date.parse(filter.entryDateFrom)
        ? entry.entryDate
        : filter.entryDateFrom === "" && entry
    )
    .filter((entryTo) =>
      entryTo.entryDate <= Date.parse(filter.entryDateTo) + 42840
        ? entryTo.entryDate
        : filter.entryDateTo === "" && entryTo
    )
    .filter((comp) =>
      comp.updates.updatedDate >= Date.parse(filter.completedDateFrom)
        ? comp.updates.updatedDate
        : filter.completedDateFrom === "" && comp
    )
    .filter((compTo) =>
      compTo.updates.updatedDate <= Date.parse(filter.completedDateTo)
        ? compTo.updates.updatedDate
        : filter.completedDateTo === "" && compTo
    );
  const breach = filteredData.filter(
    (item) => item.dueBy < item.updates.updatedDate
  );
  const sla = filteredData.filter(
    (item) => item.dueBy > item.updates.updatedDate
  );

  function OnExpand(e) {
    const value = e.currentTarget.getAttribute("value");
    if (value !== expand) {
      setExpand(value);
    } else {
      setExpand("");
    }
  }

  function clearFilters(e) {
    e.preventDefault();
    setFilter({
      team: "",
      response: "",
      sla: "",
      fullName: "",
      entryDateFrom: "",
      entryDateTo: "",
      completedDateFrom: "",
      completedDateTo: "",
    });
  }

  return (
    <Layout>
      <SEO title="Reports" />
      <Title
        title="Reports"
        subTitle="Use reports to anaylse SLAs, KPIs and any bespoke anaylsis. Sample below is a report showing completed requests with filters."
      />
      
      {/* <div className="m-4"></div> */}
      <Container>
      <Form action="#" method="#" onSubmit={clearFilters}>
        <Form.Inputs>
          <Select
            label="Team"
            name="team"
            value={filter.team}
            onChange={(e) =>
              setFilter((prevValue) => ({...prevValue, team: e.target.value}))
            }
          >
            <Select.Option value="" label=" -- all team -- " />
            {teams.map((team) => (
              <Select.Option
                key={team.value}
                value={team.value}
                label={team.label}
              />
            ))}
          </Select>
          <Select
            name="response"
            label="Response"
            onChange={(e) =>
              setFilter((prevValue) => ({
                ...prevValue,
                response: e.target.value,
              }))
            }
            value={filter.response}
          >
            <Select.Option value="" label=" -- all responses -- " />
            {response.map((response) => (
              <Select.Option
                key={response.value}
                value={response.value}
                label={response.label}
              />
            ))}
          </Select>
          <Select
            name="sla"
            label="SLA"
            onChange={(e) =>
              setFilter((prevValue) => ({...prevValue, sla: e.target.value}))
            }
            value={filter.sla}
          >
            <Select.Option value="" label=" -- all SLAs -- " />
            <Select.Option value="yes" label="Yes" />
            <Select.Option value="no" label="No" />
          </Select>
          <Select
            name="fullName"
            label="Customer"
            onChange={(e) =>
              setFilter((prevValue) => ({
                ...prevValue,
                fullName: e.target.value,
              }))
            }
            value={filter.fullName}
          >
            <Select.Option value="" label=" -- all customers -- " />
            {customer.map((customer, i) => (
              <Select.Option key={i} value={customer} label={customer} />
            ))}
          </Select>
          <Input
            name="entryDateFrom"
            label="Entry Date From"
            type="date"
            onChange={(e) =>
              setFilter((prevValue) => ({
                ...prevValue,
                entryDateFrom: e.target.value,
              }))
            }
            value={filter.entryDateFrom}
            min={moment(Math.min(...entryDate)).format("YYYY-MM-DD")}
            max={moment(Math.max(...entryDate)).format("YYYY-MM-DD")}
          />
          <Input
            name="entryDateTo"
            label="Entry Date To"
            type="date"
            onChange={(e) =>
              setFilter((prevValue) => ({
                ...prevValue,
                entryDateTo: e.target.value,
              }))
            }
            value={filter.entryDateTo}
            min={moment(Math.min(...entryDate)).format("YYYY-MM-DD")}
          />
          <Input
            name="completedDateFrom"
            label="Completed Date From"
            type="date"
            onChange={(e) =>
              setFilter((prevValue) => ({
                ...prevValue,
                completedDateFrom: e.target.value,
              }))
            }
            value={filter.completedDateFrom}
            min={moment(Math.min(...completedDate)).format("YYYY-MM-DD")}
            max={moment(Math.max(...completedDate)).format("YYYY-MM-DD")}
          />
          <Input
            name="completedDateTo"
            label="Completed Date To"
            type="date"
            onChange={(e) =>
              setFilter((prevValue) => ({
                ...prevValue,
                completedDateTo: e.target.value,
              }))
            }
            value={filter.completedDateTo}
            min={moment(Math.min(...completedDate)).format("YYYY-MM-DD")}
          />
        </Form.Inputs>
        <Form.Button>
          <Button type="submit" label="Clear Filter" />
        </Form.Button>
      </Form>
      </Container>
      <DashStatsGrid>
        <DashStats total={filteredData.length} title="Total Complete" />
        <DashStats total={sla.length} title="SLA Met" />
        <DashStats total={breach.length} title="SLA Not Met" />
        <DashStats
          total={`${Math.round((sla.length / filteredData.length) * 100)}%`}
          title="% SLA"
        />
      </DashStatsGrid>
      <Dashboard completed>
        {filteredData.map((item) => {
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
        })}
      </Dashboard>
    </Layout>
  );
}
