import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {nanoid} from "nanoid";

export default function Request() {
  const [newRequest, setNewRequest] = useState({});
  const router = useRouter();
  const [isResponse, setIsResponse] = useState(24);
  const [isTeam, setIsTeam] = useState("IT");
  const [isJobType, setIsJobType] = useState("Incident");
  const uid = "KEN" + nanoid(10);

  async function Add(e) {
    e.preventDefault();
    try {
      await axios.put("/api/request", {
        id: uid,
        fullname: newRequest.fullname,
        email: newRequest.email,
        tel: newRequest.tel,
        dept: newRequest.dept,
        address: newRequest.address,
        team: isTeam,
        status: "New",
        response: isResponse,
        jobType: isJobType,
        job: newRequest.job,
        priority:
          isResponse === 1
            ? "P1"
            : isResponse === 4
            ? "P2"
            : isResponse === 24
            ? "P3"
            : "P4",
      });
      console.log("success");
      router.push('/')
      window.alert("Request Logged " + uid);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNewTask(event) {
    const {value, name} = event.target;
    setNewRequest((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (
    <div className="p-8 bg-gray-100">
      <div>
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0 pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Details
            </h3>
            <p className="mt-1 text-sm text-gray-600">Complete Request Form.</p>
          </div>
        </div>
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-6">
            <form action="#" method="POST" onSubmit={Add}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleNewTask}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleNewTask}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="tel"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Telephone
                      </label>
                      <input
                        type="text"
                        name="tel"
                        id="tel"
                        autoComplete="tel"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleNewTask}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="dept"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        name="dept"
                        id="dept"
                        autoComplete="dept"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleNewTask}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={handleNewTask}
                        required
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="job"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="job"
                          name="job"
                          rows="3"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                          onChange={handleNewTask}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="team"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Team
                      </label>
                      <select
                        name="team"
                        id="team"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setIsTeam(e.target.value)}
                        defaultValue="IT"
                        required
                      >
                        <option value="Estates">Estates</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Protocol">Protocol</option>
                        <option value="Accounts">Accounts</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="jobType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Type
                      </label>
                      <select
                        name="jobType"
                        id="jobType"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setIsJobType(e.target.value)}
                        defaultValue="IT"
                        required
                      >
                        <option value="Incident">Incident</option>
                        <option value="Service Request">Service Request</option>
                        <option value="Change Request">Change Request</option>
                        <option value="Major Incident">Major Incident</option>
                        <option value="Problem">Problem</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="response"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Response Time
                      </label>
                      <select
                        name="response"
                        id="response"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setIsResponse(e.target.value)}
                        defaultValue={24}
                        required
                      >
                        <option value={1}>P1 - 1 hour</option>
                        <option value={4}>P2 - 4 hours</option>
                        <option value={24}>P3 - 24 hours</option>
                        <option value={48}>P4 - 48 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Log
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
