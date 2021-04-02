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
    "Due By",
    "Time Left/SLA",
  ];

  return (
    <>
    <TableContainer>
      <TableLayout>
        <TableLayout.Head>
          {tableHead.map((head) => (
            <TableHead key={head} head={head} />
          ))}
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
}
