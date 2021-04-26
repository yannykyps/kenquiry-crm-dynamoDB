import PropTypes from "prop-types";
import React from "react";
import {TableHead, TableLayout, TableContainer} from "./table"


export default function Dashboard(props) {
  const tableHead = [
    "Ref No",
    "Entry Date",
    "Full Name",
    "Team",
    "Response",
    "Status",
  ];

  return (
    <>
    <TableContainer>
      <TableLayout>
        <TableLayout.Head>
          {tableHead.map((head) => (
            <TableHead key={head} head={head} />
          ))}
          <TableHead head={props.completed ? "Completed Date" : "Due By"}/>
          <TableHead head={props.completed ? "SLA" : "Time Left"}/>
          <TableHead head=""/>
        </TableLayout.Head>
        <TableLayout.Body>
        {props.children}
        </TableLayout.Body>
      </TableLayout>
      </TableContainer>
    </>
  );
}

Dashboard.propTypes = {
  children: PropTypes.array.isRequired,
  completed: PropTypes.bool,
}
