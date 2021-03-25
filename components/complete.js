import React from "react";
import useSWR from "swr";
import {useRouter} from "next/router";
import moment from "moment";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Complete() {
  const router = useRouter();
  const {id, dueBy} = router.query;
  const {data, error} = useSWR(`/api/report?id=${id}&dueBy=${dueBy}`, fetcher);
 
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-100">
      <div>
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Details
            </h3>
            <p className="mt-1 text-sm text-gray-600">Update Request</p>
          </div>
          <div className="grid md:grid-cols-3 md:gap-2 mb-4 shadow sm:rounded-md p-4">
            <p>
              <span>Full Name: </span>
              <span>{data.fullName}</span>
            </p>
            <p>
              <span>Entry Date: </span>
              <span>{moment(data.entryDate).format("DD/MM/YY, HH:mm")}</span>
            </p>
            <p>
              <span>Due By Date: </span>
              <span>
                {moment(parseInt(data.dueBy)).format("DD/MM/YY, HH:mm")}
              </span>
            </p>
            <p>
              <span>Email Addrerss: </span>
              <span>{data.email}</span>
            </p>
            <p>
              <span>Telephone: </span>
              <span>{data.telephone}</span>
            </p>
            <p>
              <span>Department: </span>
              <span>{data.department}</span>
            </p>
            <p className="sm:col-span-3">
              <span>Address: </span>
              <span>{data.address}</span>
            </p>
            <p className="sm:col-span-3">
              <span>Job Description: </span>
              <span>{data.job}</span>
            </p>
            <p>
              <span>Team: </span>
              <span>{data.team}</span>
            </p>
            <p>
              <span>Job Type: </span>
              <span>{data.jobType}</span>
            </p>
            <p>
              <span>Response Time: </span>
              <span>{data.response} hour/s</span>
            </p>
            <p>
              <span>Priority: </span>
              <span>{data.priority}</span>
            </p>
            <p>
              <span>Current Status: </span>
              <span>{data.status}</span>
            </p>
          </div>
          <div className="grid md:grid-cols-3 md:gap-2 mb-4 shadow sm:rounded-md p-4">
            <p className="sm:col-span-3">
              <span>Completed Update: </span>
              <span>{data.updates.comments}</span>
            </p>
            <p className="sm:col-span-3">
              <span>Updated By: </span>
              <span>{data.updates.updatedBy}</span>
            </p>
            <p className="sm:col-span-3">
              <span>Updated Date: </span>
              <span>
                {moment(data.updates.updatedDate).format("DD/MM/YY, HH:mm")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
