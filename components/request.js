import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {nanoid} from "nanoid";
import {Button, Container, Form, Header, Input, Select, TextArea} from "./form";

export default function Request() {
  const [newRequest, setNewRequest] = useState({
    team: "IT",
    jobType: "Incident",
    response: 24,
  });
  const router = useRouter();
  const uid = "KEN" + nanoid(10);

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

  console.log(newRequest);

  return (
    <Container>
      <Header title="Details" subTitle="Complete Request Form." />
      <Form action="#" method="POST" onSubmit={Add}>
        <Form.Inputs>
          <Input
            type="text"
            name="fullname"
            label="Full Name"
            onChange={handleNewTask}
            required
          />
          <Input
            type="email"
            name="email"
            label="Email Address"
            onChange={handleNewTask}
            autoComplete="email"
            required
          />
          <Input
            type="tel"
            name="tel"
            label="Telephone"
            onChange={handleNewTask}
            autoComplete="tel"
            required
          />
          <Input
            type="text"
            name="dept"
            label="Department"
            onChange={handleNewTask}
            required
          />
          <Input
            type="text"
            name="address"
            label="Address"
            onChange={handleNewTask}
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
