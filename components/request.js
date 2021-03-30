import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import useSWR from "swr";
import {nanoid} from "nanoid";
import {Button, Container, Form, Header, Input, Select, TextArea} from "./form";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Request() {
  const {data, error} = useSWR(`/api/customers`, fetcher);
  const [newRequest, setNewRequest] = useState({
    team: "IT",
    jobType: "Incident",
    response: 24,
    fullname:"",
    email:"",
    telephone:"",
    department:"",
    address:"",
  });
  const [customer, setCustomer] = useState("")
  const router = useRouter();
  const uid = "KEN" + nanoid(10);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  async function Add(e) {
    e.preventDefault();
    try {
      await axios.put("/api/request", {
        id: uid,
        fullname: newRequest.fullname,
        email: newRequest.email,
        tel: newRequest.tel,
        dept: newRequest.dept,
        address: newRequest.address,
        team: newRequest.team,
        status: "New",
        response: newRequest.response,
        jobType: newRequest.jobType,
        job: newRequest.job,
        priority:
          newRequest.response === "1"
            ? "P1"
            : newRequest.response === "4"
            ? "P2"
            : newRequest.response === "24"
            ? "P3"
            : "P4",
      });
      console.log("success");
      router.push("/");
      window.alert("Request Logged " + uid);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNewTask(e) {
    const {value, name} = e.target;
    setNewRequest((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleExistingCustomer(e) {
    const {value} = e.target;
    setCustomer(value)
    const cust = data.Items.find(cust => cust.id === value)

    setNewRequest((prevValue) => ({
      ...prevValue,
      fullname: cust.fullName,
      email: cust.email,
      telephone: cust.telephone,
      department: cust.department,
      address: cust.address
    }));
  }

  return (
    <Container>
      <Header title="Details" subTitle="Complete Request Form." />
      
      <Form action="#" method="POST" onSubmit={Add}>
        <Form.Inputs>
        
        <Select
            name="customers"
            label="Existing Customers"
            onChange={handleExistingCustomer}
            value={customer}
            required
          >
          <Select.Option
                  value=""
                  label=" -- existing customers -- "
                  disabled
                />
          {data.Items.map(cust => {
            return (
              <Select.Option key={cust.id} value={cust.id} label={`${cust.fullName} - ${cust.email} - ${cust.telephone} - ${cust.department}`} />
            )
          })}
          </Select>
          <div></div>
          <Input
            type="text"
            name="fullname"
            label="Full Name"
            onChange={handleNewTask}
            value={newRequest.fullname}
            required
          />
          <Input
            type="email"
            name="email"
            label="Email Address"
            onChange={handleNewTask}
            autoComplete="email"
            value={newRequest.email}
            required
          />
          <Input
            type="tel"
            name="tel"
            label="Telephone"
            onChange={handleNewTask}
            autoComplete="tel"
            value={newRequest.telephone}
            required
          />
          <Input
            type="text"
            name="dept"
            label="Department"
            onChange={handleNewTask}
            value={newRequest.department}
            required
          />
          <Input
            type="text"
            name="address"
            label="Address"
            onChange={handleNewTask}
            value={newRequest.address}
            autoComplete="address"
          />
          <TextArea
            name="job"
            label="Job Description"
            rows={3}
            onChange={handleNewTask}
            required
          />
          <Select
            name="team"
            label="Team"
            onChange={handleNewTask}
            value={newRequest.team}
            required
          >
            <Select.Option value="Estates" label="Estates" />
            <Select.Option value="IT" label="IT" />
            <Select.Option value="HR" label="HR" />
            <Select.Option value="Protocol" label="Protocol" />
            <Select.Option value="Accounts" label="Accounts" />
          </Select>
          <Select
            name="jobType"
            label="Job Type"
            onChange={handleNewTask}
            value={newRequest.jobType}
            required
          >
            <Select.Option value="Incident" label="Incident" />
            <Select.Option value="Service Request" label="Service Request" />
            <Select.Option value="Change Request" label="Change Request" />
            <Select.Option value="Major Incident" label="Major Incident" />
            <Select.Option value="Problem" label="Problem" />
          </Select>
          <Select
            name="response"
            label="Response Time"
            onChange={handleNewTask}
            value={newRequest.response}
            required
          >
            <Select.Option value={1} label="P1 - 1 hour" />
            <Select.Option value={4} label="P2 - 4 hours" />
            <Select.Option value={24} label="P3 - 24 hours" />
            <Select.Option value={48} label="P4 - 48 hours" />
          </Select>
        </Form.Inputs>
        <Form.Button>
          <Button type="submit" label="Log" />
        </Form.Button>
      </Form>
    </Container>
  );
}
