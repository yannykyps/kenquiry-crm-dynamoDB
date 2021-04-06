import React, {useState, useEffect} from "react";
import useSWR from "swr";
import {nanoid} from "nanoid";
import {useRouter} from "next/router";
import {Button, Container, Form, Header, Input, Select, TextArea} from "./form";
import responseTimes from "./data/responseTimes";
import teams from "./data/teams";
import jobTypes from "./data/jobTypes";
import Modal from "./modal";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Request() {
  const uid = "KEN" + nanoid(10);
  const {data, error} = useSWR(`/api/customers`, fetcher);
  const [newRequest, setNewRequest] = useState({
    id: uid,
    team: "IT",
    jobType: "Incident",
    response: "24",
    fullname: "",
    email: "",
    tel: "",
    dept: "",
    address: "",
    priority: "P3",
    status: "New",
  });
  const [customer, setCustomer] = useState("");
  const [hidden, setIsHidden] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const [modal, setModal] = useState({
    ref: "",
    text: "",
    success: true,
    type: "",
  });
  
  useEffect(() => {
    if (data) {
      setNewRequest((prevValue) => ({
        ...prevValue,
        priority:
          newRequest.response === "1"
            ? "P1"
            : newRequest.response === "4"
            ? "P2"
            : newRequest.response === "24"
            ? "P3"
            : "P4",
      }));
    }
  }, [newRequest.response]);

  async function AddRequest(e) {
    e.preventDefault();
    await fetch("/api/request", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        setModal({
          ref: `Ref No: ${uid}`,
          text: "Request Has Been Logged",
          success: true,
          type: "request",
        });
        setIsHidden(!hidden);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  async function AddCustomer(e) {
    const max = Math.max(...data.Items.map((o) => parseInt(o.id)), 0);
    const custId = parseInt(max) + 1;
    const findCustomer = data.Items.findIndex(
      (cust) => cust.email === newRequest.email
    );
    const emailRe = /\S+@\S+\.\S+/
    const telRe = /^\d{11}$/
    e.preventDefault();
    const newCustomer = {
      id: custId.toString(),
      fullname: newRequest.fullname,
      email: newRequest.email,
      tel: newRequest.tel,
      dept: newRequest.dept,
      address: newRequest.address,
    };
    if (emailRe.test(newCustomer.email) && telRe.test(newCustomer.tel)){
      if (findCustomer === -1) {
        await fetch("/api/customers", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        })
          .then((response) => response.json())
          .then((data) => {
            setDisabled(true);
            setModal({
              ref: newRequest.fullname,
              text: "Customer Has Been Added",
              success: true,
              type: "customer",
            });
            setIsHidden(!hidden);
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error", error);
          });
      } else {
        setModal({
          ref: newRequest.fullname,
          text: "Customer Already Exists",
          success: false,
          type: "customer",
        });
        setIsHidden(!hidden);
      }
    } else {
      setModal({
        ref: `${!emailRe.test(newCustomer.email) ? "Invalid Email - Check email address is valid" : !telRe.test(newCustomer.tel) ? "Invalid Telephone Number. Must contain 11 digits and no characters or symbols" : ""}`,
        text: "Validation Error",
        success: false,
        type: "customer",
      });
      setIsHidden(!hidden);
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
    setCustomer(value);
    const cust = data.Items.find((cust) => cust.id === value);

    setNewRequest((prevValue) => ({
      ...prevValue,
      fullname: cust.fullName,
      email: cust.email,
      tel: cust.telephone,
      dept: cust.department,
      address: cust.address,
    }));
    document.querySelector("textarea").focus();
  }

  function handleModalClick() {
    setIsHidden(!hidden);
    if (modal.type !== "customer") {
      router.push("/");
    }
  }

  return (
    <>
      {error && <div>Failed to load</div>}
      {!data ? (
        <div>Loading... </div>
      ) : (
        <Container>
          <Header title="Details" subTitle="Complete Request Form." />
          <Modal
            show={hidden}
            onClick={handleModalClick}
            getRef={modal.ref}
            text={modal.text}
            success={modal.success}
          />
          <Form action="#" method="POST" onSubmit={AddRequest}>
            <Form.Inputs>
              <Select
                name="customers"
                label="Existing Customers"
                onChange={handleExistingCustomer}
                value={customer}
              >
                <Select.Option
                  value=""
                  label=" -- existing customers -- "
                  disabled
                />
                {data.Items.map((cust) => (
                  <Select.Option
                    key={cust.id}
                    value={cust.id}
                    label={`${cust.fullName} - ${cust.email} - ${cust.telephone} - ${cust.department}`}
                  />
                ))}
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
                value={newRequest.tel}
                required
              />
              <Input
                type="text"
                name="dept"
                label="Department"
                onChange={handleNewTask}
                value={newRequest.dept}
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
              <div className="pt-6 col-span-6 sm:col-span-3">
                <button
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={AddCustomer}
                  disabled={disabled}
                  type="submit"
                >
                  Add Customer
                </button>
              </div>
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
                {teams.map((team) => (
                  <Select.Option
                    key={team.value}
                    value={team.value}
                    label={team.label}
                  />
                ))}
              </Select>
              <Select
                name="jobType"
                label="Job Type"
                onChange={handleNewTask}
                value={newRequest.jobType}
                required
              >
                {jobTypes.map((type) => (
                  <Select.Option
                    key={type.value}
                    value={type.value}
                    label={type.label}
                  />
                ))}
              </Select>
              <Select
                name="response"
                label="Response Time"
                onChange={handleNewTask}
                value={newRequest.response}
                required
              >
                {responseTimes.map((resp) => (
                  <Select.Option
                    key={resp.value}
                    value={resp.value}
                    label={resp.label}
                  />
                ))}
              </Select>
            </Form.Inputs>
            <Form.Button>
              <Button type="submit" label="Log" />
            </Form.Button>
          </Form>
        </Container>
      )}
    </>
  );
}
