import PropTypes from "prop-types";
export default function Table(props) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      {data.Items.sort((dateX, dateY) => dateX.dueBy - dateY.dueBy).map(
        (item) => {
          const d = parseInt(item.dueBy);
          const timeLeft = d - Date.now();
          const timerMin = Math.round(moment.duration(timeLeft).asMinutes());
          const timerHour = Math.round(moment.duration(timeLeft).asHours());
          return (
            <tbody key={item.id} className="bg-white divide-y divide-gray-200">
              <tr
                className="cursor-pointer hover:bg-gray-200"
                value={item.id}
                onClick={OnExpand}
              >
                <Link href={`/update?id=${item.id}&dueBy=${item.dueBy}`}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="pl-4 text-sm font-medium text-blue-800 hover:text-blue-500">
                      {item.id}
                    </div>
                  </td>
                </Link>
                <td className="p-2 whitespace-nowrap">
                  <div value={item.id} className="pl-4 text-sm text-gray-900">
                    {moment(item.entryDate).format("DD/MM/YY, HH:mm")}
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div value={item.id} className="pl-4 text-sm text-gray-900">
                    {item.fullName}
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div value={item.id} className="pl-4 text-sm text-gray-900">
                    {item.team}
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div value={item.id} className="pl-4 text-sm text-gray-900">
                    {item.response} hr/s
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "New"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Allocated"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div value={item.id} className="pl-4 text-sm text-gray-900">
                    {moment(d).format("DD/MM/YY, HH:mm")}
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <div
                    value={item.id}
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
                    {timerMin > 60 || timerMin < -60
                      ? timerHour + " hours"
                      : timerMin + " mins"}
                  </div>
                </td>
                
              </tr>
              <tr>
                <td
                  colSpan="8"
                  className={`p-2 whitespace-nowrap ${
                    item.id !== expand && "hidden"
                  }`}
                >
                  <div className="pl-4 text-sm text-gray-900">
                    Job Description: {item.job}
                  </div>
                </td>
              </tr>
            </tbody>
          );
        }
      )}
    </table>
  );
}
