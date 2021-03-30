import PropTypes from "prop-types";
import React from "react";
import moment from "moment";
import {
  Container,
  Header,
  InfoContainer,
  InfoField,
} from "./form";

export default function Complete(props) {

  return (
    <Container>
      <Header title="Details" subTitle="Completed Request" />
      <InfoContainer>
        <InfoField label="Full Name: " value={props.fullName} gridSpan={0} />
        <InfoField
          label="Entry Date: "
          value={moment(props.entryDate).format("DD/MM/YY, HH:mm")}
          gridSpan={0}
        />
        <InfoField
          label="Due By Date: "
          value={moment(parseInt(props.dueBy)).format("DD/MM/YY, HH:mm")}
          gridSpan={0}
        />
        <InfoField label="Email Address: " value={props.email} gridSpan={0} />
        <InfoField label="Telephone: " value={props.telephone} gridSpan={0} />
        <InfoField label="Department: " value={props.department} gridSpan={0} />
        <InfoField label="Address: " value={props.address} gridSpan={3} />
        <InfoField label="Job Description: " value={props.job} gridSpan={3} />
        <InfoField label="Team: " value={props.team} gridSpan={0} />
        <InfoField label="Job Type: " value={props.jobType} gridSpan={0} />
        <InfoField
          label="Response Time: "
          value={`${props.response} hour/s`}
          gridSpan={0}
        />
        <InfoField label="Priority: " value={props.priority} gridSpan={0} />
        <InfoField label="Current Status: " value={props.status} gridSpan={0} />
        {props.allocated && (
          <InfoField
            label="Allocated To: "
            value={props.allocated}
            gridSpan={0}
          />
        )}
      </InfoContainer>
      {props.comments && (
        <InfoContainer>
          <InfoField
            label="Previous Update: "
            value={props.comments}
            gridSpan={3}
          />
          <InfoField
            label="Updated By: "
            value={props.updatedBy}
            gridSpan={3}
          />
          <InfoField
            label="Updated Date: "
            value={moment(props.updatedDate).format("DD/MM/YY, HH:mm")}
            gridSpan={3}
          />
        </InfoContainer>
      )}
    </Container>
  );
}

Complete.propTypes = {
  address: PropTypes.any,
  allocated: PropTypes.any,
  comments: PropTypes.any,
  department: PropTypes.any,
  dueBy: PropTypes.any,
  email: PropTypes.any,
  entryDate: PropTypes.any,
  fullName: PropTypes.any,
  job: PropTypes.any,
  jobType: PropTypes.any,
  priority: PropTypes.any,
  response: PropTypes.any,
  status: PropTypes.any,
  team: PropTypes.any,
  telephone: PropTypes.any,
  updatedBy: PropTypes.any,
  updatedDate: PropTypes.any,
}
