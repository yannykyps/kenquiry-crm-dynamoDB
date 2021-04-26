import PropTypes from "prop-types";
import moment from "moment";
import React from "react";
import Link from "next/link";
import TableData from "./tableData";
import TableDataStatus from "./tableDataStatus";

export default function TableBody(props) {
  const d = parseInt(props.dueBy);
  const timeLeft = d - props.timeLeft;
  const timerMin = Math.round(moment.duration(timeLeft).asMinutes());
  const timerHour = Math.round(moment.duration(timeLeft).asHours());
  const timerDay = Math.round(moment.duration(timeLeft).asDays());
  const [red, amber, green, breached] = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-black",
  ];

  return (
    <tbody key={props.id} className="bg-white">
      <tr
        className="cursor-pointer hover:bg-gray-200"
        value={props.id}
        onClick={props.onClick}
      >
        <TableData styleClass="font-medium">{props.id}</TableData>
        <TableData>
          {moment(props.entryDate).format("DD/MM/YY, HH:mm")}
        </TableData>
        <TableData>{props.fullName}</TableData>
        <TableData>{props.team}</TableData>
        <TableData>{props.response} hr/s</TableData>
        <TableDataStatus
          styleClass={
            props.status === "New"
              ? "bg-green-100 text-green-800"
              : props.status === "Allocated"
              ? "bg-yellow-100 text-yellow-800"
              : props.status === "Further Action"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }
        >
          {props.status}
        </TableDataStatus>
        <TableData>
          {props.completed
            ? moment(props.completedDate).format("DD/MM/YY, HH:mm")
            : moment(d).format("DD/MM/YY, HH:mm")}
        </TableData>
        <TableDataStatus
          styleClass={`text-white ${
            timerMin < 0
              ? breached
              : timerMin > 0 && timerMin < 480
              ? red
              : timerMin > 480 && timerMin < 1440
              ? amber
              : green
          }`}
        >
          {props.report
            ? timerMin < 0
              ? "No"
              : "Yes"
            : timerMin < -1440
            ? timerDay + " days"
            : (timerMin > -1440 && timerMin < -60) || timerMin > 60
            ? timerHour + " hours"
            : timerMin + " mins"}
        </TableDataStatus>
        <Link
          href={
            !props.report
              ? `/update?id=${props.id}&dueBy=${props.dueBy}`
              : `/complete?id=${props.id}&dueBy=${props.dueBy}`
          }
        >
          <td className="p-2 whitespace-nowrap">
            <div className="pl-4 text-sm font-medium text-blue-600 hover:text-blue-300">
              {!props.report ? "Update" : "View" }
            </div>
          </td>
        </Link>
      </tr>
      <tr>
        <TableData
          colSpan="8"
          styleClass={props.id !== props.expand && "hidden"}
        >
          Job Description: {props.job}
        </TableData>
      </tr>
    </tbody>
  );
}

TableBody.propTypes = {
  completed: PropTypes.bool,
  completedDate: PropTypes.any,
  dueBy: PropTypes.string.isRequired,
  entryDate: PropTypes.number.isRequired,
  expand: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  report: PropTypes.bool,
  response: PropTypes.any.isRequired,
  status: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  timeLeft: PropTypes.number,
}
