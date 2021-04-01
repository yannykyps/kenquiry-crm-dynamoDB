import React, {useState, useEffect} from "react";
import useSWR from "swr";
import {useRouter} from "next/router";
import moment from "moment";
import members from "./data/teamMembers";
import priority from "./data/priority";
import status from "./data/status";
import Modal from "./modal";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Select,
  TextArea,
  InfoContainer,
  InfoField,
} from "./form";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Update() {
  const router = useRouter();
  const {id, dueBy} = router.query;
  const {data: update, error} = useSWR(
    `/api/request?id=${id}&dueBy=${dueBy}`,
    fetcher
  );
  const {data: allocated} = useSWR(`/api/allocated`, fetcher);
  const [hidden, setIsHidden] = useState(true);
  const [updateReq, setUpdateReq] = useState({
    id: id,
    dueBy: dueBy,
    status: "",
    allocated: "",
    comments: "",
    priority: "",
    updatedBy: "Jo Bloggs",
    updatedDate: Date.now(),
  });

  function handleUpdateReq(e) {
    const {value, name} = e.target;
    setUpdateReq((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    if (value === "Complete") {
      setUpdateReq((prevValue) => ({
        ...prevValue,
        priority: update.priority,
      }));
    }
  }

  console.log(updateReq);

  function UpdateRequest(e) {
    e.preventDefault();
    fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateReq),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsHidden(!hidden);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  function handleModalClick() {
    setIsHidden(!hidden);
    router.push("/");
  }

  return (
    <>
      {error && <div>Failed to load</div>}
      {!update ? (
        <div>Loading... </div>
      ) : (
        <Container>
          <Header title="Details" subTitle="Update Requests" />
          <Modal
            show={hidden}
            onClick={handleModalClick}
            getRef={`Ref No: ${update.id}`}
            text="Request has been updated"
          />
          <InfoContainer>
            <InfoField
              label="Full Name: "
              value={update.fullName}
              gridSpan={0}
            />
            <InfoField
              label="Entry Date: "
              value={moment(update.entryDate).format("DD/MM/YY, HH:mm")}
              gridSpan={0}
            />
            <InfoField
              label="Due By Date: "
              value={moment(parseInt(update.dueBy)).format("DD/MM/YY, HH:mm")}
              gridSpan={0}
            />
            <InfoField
              label="Email Address: "
              value={update.email}
              gridSpan={0}
            />
            <InfoField
              label="Telephone: "
              value={update.telephone}
              gridSpan={0}
            />
            <InfoField
              label="Department: "
              value={update.department}
              gridSpan={0}
            />
            <InfoField label="Address: " value={update.address} gridSpan={3} />
            <InfoField
              label="Job Description: "
              value={update.job}
              gridSpan={3}
            />
            <InfoField label="Team: " value={update.team} gridSpan={0} />
            <InfoField label="Job Type: " value={update.jobType} gridSpan={0} />
            <InfoField
              label="Response Time: "
              value={`${update.response} hour/s`}
              gridSpan={0}
            />
            <InfoField
              label="Priority: "
              value={update.priority}
              gridSpan={0}
            />
            <InfoField
              label="Current Status: "
              value={update.status}
              gridSpan={0}
            />
            {update.allocated && (
              <InfoField
                label="Allocated To: "
                value={update.allocated}
                gridSpan={0}
              />
            )}
          </InfoContainer>
          {update.updates.comments && (
            <InfoContainer>
              <InfoField
                label="Previous Update: "
                value={update.updates.comments}
                gridSpan={3}
              />
              <InfoField
                label="Updated By: "
                value={update.updates.updatedBy}
                gridSpan={3}
              />
              <InfoField
                label="Updated Date: "
                value={moment(update.updates.updatedDate).format(
                  "DD/MM/YY, HH:mm"
                )}
                gridSpan={3}
              />
            </InfoContainer>
          )}
          <Form action="#" method="POST" onSubmit={UpdateRequest}>
            <Form.Inputs>
              <Select
                name="status"
                label="Status"
                onChange={handleUpdateReq}
                value={updateReq.status}
                required
              >
                <Select.Option
                  value=""
                  label=" -- select status -- "
                  disabled
                />
                {status.map((status) => (
                  <Select.Option
                    key={status.value}
                    value={status.value}
                    label={status.label}
                  />
                ))}
              </Select>
              {updateReq.status === "Allocated" && (
                <Select
                  name="allocated"
                  label="Allocated To"
                  onChange={handleUpdateReq}
                  value={updateReq.allocated}
                  required
                >
                  <Select.Option
                    value=""
                    label=" -- allocate to -- "
                    disabled
                  />
                  {members
                    .filter((team) => team.team === update.team)
                    .map((name, index) => {
                      const count = allocated.Items.filter(
                        (count) => count.allocated === name.name
                      ).length;
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
              {updateReq.status !== "Complete" && (
              <Select
                name="priority"
                label="Priority"
                onChange={handleUpdateReq}
                value={updateReq.priority}
                // value={update.priority}
                required
              >
                <Select.Option value="" label=" -- set priority -- " disabled />
                {priority.map((priority) => (
                  <Select.Option
                    key={priority.value}
                    value={priority.value}
                    label={priority.label}
                  />
                ))}
              </Select>)}
              <TextArea
                name="comments"
                label="Update Comment"
                rows={3}
                onChange={handleUpdateReq}
                value={updateReq.comments}
                required
              />
              <Input
                type="text"
                name="updatedBy"
                label="Updated By (read only in Demo)"
                value={updateReq.updatedBy}
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

