import React, {useState, useEffect} from "react";
import axios from "axios";
import useSWR from "swr";
import {useRouter} from "next/router";
import moment from "moment";
import members from "./teamMembers";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Update() {
  const router = useRouter();
  const {id, dueBy} = router.query;
  const {data, error} = useSWR(`/api/request?id=${id}&dueBy=${dueBy}`, fetcher);
  const [updateRequest, setUpdateRequest] = useState("");
  const [isStatus, setIsStatus] = useState("");
  const [isAllocated, setIsAllocated] = useState("");
  const updatedBy = "Jo Bloggs";
  const [isPriority, setIsPriority] = useState("");
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  useEffect(() => {
    if (data) {
      setIsPriority(data.priority);
    }
  }, [data]);

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
        router.push("/");
        window.alert("Request Updated " + data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
            {data.allocated && (
              <p>
                <span>Allocated To: </span>
                <span>{data.allocated}</span>
              </p>
            )}
          </div>
          {data.updates.comments && (
            <div className="grid md:grid-cols-3 md:gap-2 mb-4 shadow sm:rounded-md p-4">
              <p className="sm:col-span-3">
                <span>Previous Update: </span>
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
          )}
        </div>
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-6">
            <form action="#" method="POST" onSubmit={Update}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setIsStatus(e.target.value)}
                        value={isStatus}
                        required
                      >
                        <option disabled value="">
                          {" "}
                          -- select status --{" "}
                        </option>
                        <option value="Further Action">Further Action</option>
                        <option value="Allocated">Allocated</option>
                        <option value="Complete">Complete</option>
                      </select>
                    </div>
                    {isStatus === "Allocated" && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="allocated"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Allocated To
                        </label>
                        <select
                          name="allocated"
                          id="allocated"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => setIsAllocated(e.target.value)}
                          value={isAllocated}
                          required
                        >
                          <option disabled value="">
                            {" "}
                            -- allocate to --{" "}
                          </option>
                          {members
                            .filter((team) => team.team === data.team)
                            .map((name, index) => {
                              return (
                                <option key={index} value={name.name}>
                                  {name.name} - {name.team}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    )}
                    <div className="col-span-6 sm:col-span-3 sm:row-start-2">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Priority
                      </label>
                      <select
                        name="priority"
                        id="priority"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setIsPriority(e.target.value)}
                        value={isPriority}
                        required
                      >
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                        <option value="P4">P4</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Update Comment
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="comment"
                          name="comment"
                          rows="3"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => setUpdateRequest(e.target.value)}
                          value={updateRequest}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Updated By (read only in Demo)
                      </label>
                      <input
                        type="text"
                        name="updatedBy"
                        id="updatedBy"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        defaultValue="Jo Bloggs"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
