import PropTypes from "prop-types";
import moment from "moment";
import React from "react";
import Link from "next/link";
import TableData from "./tableData";

export default function TableBody(props) {
  const d = parseInt(props.dueBy);
  const timeLeft = d - props.timeLeft;
  const timerMin = Math.round(moment.duration(timeLeft).asMinutes());
  const timerHour = Math.round(moment.duration(timeLeft).asHours());
  const [red, amber, green, breached] = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-black",
  ];

  return (
    <tbody key={props.id} className="bg-white divide-y divide-gray-200">
      <tr
        className="cursor-pointer hover:bg-gray-200"
        value={props.id}
        onClick={props.OnExpand}
      >
        <Link
          href={
            !props.report
              ? `/update?id=${props.id}&dueBy=${props.dueBy}`
              : `/complete?id=${props.id}&dueBy=${props.dueBy}`
          }
        >
          <td className="p-2 whitespace-nowrap">
            <div className="pl-4 text-sm font-medium text-blue-600 hover:text-blue-300">
              {props.id}
            </div>
          </td>
        </Link>
        <TableData>
          {moment(props.entryDate).format("DD/MM/YY, HH:mm")}
        </TableData>
        <TableData>{props.fullName}</TableData>
        <TableData>{props.team}</TableData>
        <TableData>{props.response} hr/s</TableData>
        <td className="px-6 py-2 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              props.status === "New"
                ? "bg-green-100 text-green-800"
                : props.status === "Allocated"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {props.status}
          </span>
        </td>
        <TableData>{moment(d).format("DD/MM/YY, HH:mm")}</TableData>

        <td className="px-6 py-2 whitespace-nowrap">
          <div
            className={`${
              timerMin < 0
                ? breached
                : timerMin > 0 && timerMin < 480
                ? red
                : timerMin > 480 && timerMin < 1440
                ? amber
                : green
            } px-2 text-sm text-white rounded-full inline-flex`}
          >
            {props.report
              ? timerMin < 0
                ? "No"
                : "Yes"
              : timerMin > 60 || timerMin < -60
              ? timerHour + " hours"
              : timerMin + " mins"}
          </div>
        </td>
      </tr>
      <tr>
        <td
          colSpan="8"
          className={`p-2 whitespace-nowrap ${
            props.id !== props.expand && "hidden"
          }`}
        >
          <div className="pl-4 text-sm text-gray-900">
            Job Description: {props.job}
          </div>
        </td>
      </tr>
    </tbody>
  );
}

TableBody.propTypes = {
  OnExpand: PropTypes.any.isRequired,
  dueBy: PropTypes.any.isRequired,
  entryDate: PropTypes.any.isRequired,
  expand: PropTypes.any.isRequired,
  fullName: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  job: PropTypes.any.isRequired,
  report: PropTypes.any,
  response: PropTypes.any.isRequired,
  status: PropTypes.string.isRequired,
  team: PropTypes.any.isRequired,
  timeLeft: PropTypes.any,
};
