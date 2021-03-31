import React, {useState, useEffect} from "react";
import axios from "axios";
import useSWR from "swr";
import {useRouter} from "next/router";
import moment from "moment";
import members from "./data/teamMembers";
import priority from "./data/priority";
import status from "./data/status";
import Modal from "./modal"
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Select,
  TextArea,
  InfoContainer,
  InfoField
} from "./form";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Update() {
  const router = useRouter();
  const {id, dueBy} = router.query;
  const {data, error} = useSWR(`/api/request?id=${id}&dueBy=${dueBy}`, fetcher);
  const {data: allocated} = useSWR(`/api/allocated`, fetcher);
  const [updateRequest, setUpdateRequest] = useState("");
  const [isStatus, setIsStatus] = useState("");
  const [isAllocated, setIsAllocated] = useState("");
  const [isPriority, setIsPriority] = useState("");
  const [hidden, setIsHidden] = useState(true);

  const updatedBy = "Jo Bloggs";

  useEffect(() => {
    if (data) {
      setIsPriority(data.priority);
    }
  }, []);

  function Update(e) {
    e.preventDefault();
    axios
      .post("/api/request", {
        id: data.id,
        dueBy: data.dueBy,
        comments: updateRequest,
        status: isStatus,
        priority: isPriority,
        updatedBy: updatedBy,
        updatedDate: Date.now(),
        allocated: isAllocated,
      })
      .then(function (response) {
        console.log(response);
        setIsHidden(!hidden)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleModalClick() {
    setIsHidden(!hidden)
    router.push("/");
  }

  return (
    <>
      {error && <div>Failed to load</div>}
      {!data ? (
        <div>Loading... </div>
      ) : (
        <Container>
          <Header title="Details" subTitle="Update Requests" />
          <Modal show={hidden} onClick={handleModalClick} getRef={data.id} crud="updated"/>
          <InfoContainer>
          <InfoField label="Full Name: " value={data.fullName} gridSpan={0} />
          <InfoField label="Entry Date: " value={moment(data.entryDate).format("DD/MM/YY, HH:mm")} gridSpan={0} />
          <InfoField label="Due By Date: " value={moment(parseInt(data.dueBy)).format("DD/MM/YY, HH:mm")} gridSpan={0} />
          <InfoField label="Email Address: " value={data.email} gridSpan={0} />
          <InfoField label="Telephone: " value={data.telephone} gridSpan={0} />
          <InfoField label="Department: " value={data.department} gridSpan={0} />
          <InfoField label="Address: " value={data.address} gridSpan={3} />
          <InfoField label="Job Description: " value={data.job} gridSpan={3} />
          <InfoField label="Team: " value={data.team} gridSpan={0} />
          <InfoField label="Job Type: " value={data.jobType} gridSpan={0} />
          <InfoField label="Response Time: " value={`${data.response} hour/s`} gridSpan={0} />
          <InfoField label="Priority: " value={data.priority} gridSpan={0} />
          <InfoField label="Current Status: " value={data.status} gridSpan={0} />
            {data.allocated && (
              <InfoField label="Allocated To: " value={data.allocated} gridSpan={0} />

            )}
          </InfoContainer>
          {data.updates.comments && (
            <InfoContainer>
            <InfoField label="Previous Update: " value={data.updates.comments} gridSpan={3} />
            <InfoField label="Updated By: " value={data.updates.updatedBy} gridSpan={3} />
            <InfoField label="Updated Date: " value={moment(data.updates.updatedDate).format("DD/MM/YY, HH:mm")} gridSpan={3} />
              </InfoContainer>
          )}
          <Form action="#" method="POST" onSubmit={Update}>
            <Form.Inputs>
              <Select
                name="status"
                label="Status"
                onChange={(e) => setIsStatus(e.target.value)}
                value={isStatus}
                required
              >
                <Select.Option
                  value=""
                  label=" -- select status -- "
                  disabled
                />
                {status.map(status => (<Select.Option key={status.value} value={status.value} label={status.label} />))}
              </Select>
              {isStatus === "Allocated" && (
                <Select
                  name="allocated"
                  label="Allocated To"
                  onChange={(e) => setIsAllocated(e.target.value)}
                  value={isAllocated}
                  required
                >
                  <Select.Option
                    value=""
                    label=" -- allocate to -- "
                    disabled
                  />
                  {members
                    .filter((team) => team.team === data.team)
                    .map((name, index) => {
                      const count = allocated.Items.filter(count => count.allocated === name.name).length
                      return (
                        <Select.Option
                          key={index}
                          value={name.name}
                          label={`${name.name} - ${name.team} - Allocated: ${count}`}
                        />
                      );
                    })}
                </Select>
              )}
              <Select
                name="priority"
                label="Priority"
                onChange={(e) => setIsPriority(e.target.value)}
                defaultValue={data.priority}
                required
              >
              {priority.map(priority => (<Select.Option key={priority.value} value={priority.value} label={priority.label} />))}
              </Select>
              <TextArea
                name="comment"
                label="Update Comment"
                rows={3}
                onChange={(e) => setUpdateRequest(e.target.value)}
                value={updateRequest}
                required
              />
              <Input
                type="text"
                name="updatedBy"
                label="Updated By (read only in Demo)"
                defaultValue="Jo Bloggs"
                readOnly
              />
            </Form.Inputs>
            <Form.Button>
              <Button type="submit" label="Update" />
            </Form.Button>
          </Form>
        </Container>
      )}
    </>
  );
}
