import React from "react";
import useSWR from "swr";
import moment from "moment";
import Link from "next/link";
import {useRouter} from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Report() {
  const router = useRouter();
  const {name} = router.query;
  const {data, error} = useSWR(`/api/report`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const breach = data.Items.filter((item) => item.dueBy < item.updates.updatedDate);
  const sla = data.Items.filter((item) => item.dueBy > item.updates.updatedDate);
  const red = "bg-red-500";
  const amber = "bg-yellow-500";
  const green = "bg-green-500";
  const breached = "bg-black";

  return (
    <>
      <main>
        <div className="sm:grid-cols-4 grid w-5/6 m-auto">
          <div className="shadow rounded-lg w-40 text-center h-28 m-auto mt-12 p-4">
            <h2 className="font-medium text-gray-500">Total Complete</h2>
            <h1 className="font-medium text-black text-5xl">{data.Count}</h1>
          </div>
          <div className="shadow rounded-lg w-40 text-center h-28 m-auto mt-12 p-4">
            <h2 className="font-medium text-gray-500">SLA Met</h2>
            <h1 className="font-medium text-black text-5xl">{sla.length}</h1>
          </div>
          <div className="shadow rounded-lg w-40 text-center h-28 m-auto mt-12 p-4">
            <h2 className="font-medium text-gray-500">SLA Not Met</h2>
            <h1 className="font-medium text-black text-5xl">{breach.length}</h1>
          </div>
          <div className="shadow rounded-lg w-40 text-center h-28 m-auto mt-12 p-4">
            <h2 className="font-medium text-gray-500">% SLA</h2>
            <h1 className="font-medium text-black text-5xl">{Math.round((sla.length/data.Count)*100)}%</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-2 border-dashed border-gray-200 rounded-lg max-h-96 overflow-auto">
              <div className="flex flex-col">
                <div className="-my-2 sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Ref No
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Entry Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Full Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Team
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Response
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Due By
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              SLA
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {data.Items.sort((dateX, dateY) => dateX.dueBy - dateY.dueBy).map((item) => {
                            const d = parseInt(item.dueBy);
                            const timeLeft = d - item.updates.updatedDate;
                            const timerMin = Math.round(
                              moment.duration(timeLeft).asMinutes()
                            );
                            const timerHour = Math.round(
                              moment.duration(timeLeft).asHours()
                            );
                            return (
                              <Link
                                href={`/complete?id=${item.id}&dueBy=${item.dueBy}`}
                                key={item.id}
                              >
                                <tr className="hover:bg-gray-200 cursor-pointer">
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="pl-4 text-sm font-medium text-gray-900">
                                      {item.id}
                                    </div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="pl-4 text-sm text-gray-900">
                                      {moment(item.entryDate).format(
                                        "DD/MM/YY, HH:mm"
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="pl-4 text-sm text-gray-900">
                                      {item.fullName}
                                    </div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="pl-4 text-sm text-gray-900">
                                      {item.team}
                                    </div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="pl-4 text-sm text-gray-900">
                                      {item.response} hr/s
                                    </div>
                                  </td>
                                  <td className="px-6 py-2 whitespace-nowrap">
                                    <span
                                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">
                                    <div className="pl-4 text-sm text-gray-900">
                                      {moment(d).format("DD/MM/YY, HH:mm")}
                                    </div>
                                  </td>
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
                                      {timerMin < 0
                                        ? "No"
                                        : "Yes"}
                                    </div>
                                  </td>
                                </tr>
                              </Link>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}