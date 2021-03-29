import PropTypes from "prop-types";
import React from "react";
import TableHead from "./table/tableHead";
import TableLayout from "./table/tableLayout";


export default function Dashboard(props) {
  const tableHead = [
    "Ref No",
    "Entry Date",
    "Full Name",
    "Team",
    "Response",
    "Status",
    "Due By",
    "Time Left",
  ];

  return (
    <>
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
    </>
  );
}

Dashboard.propTypes = {
  children: PropTypes.any.isRequired,
}
