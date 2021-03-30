import PropTypes from "prop-types";
export default function TableData({children}) {
  return (
    <td className="p-2 whitespace-nowrap">
    <div className="pl-4 text-sm text-gray-900">
      {children}
    </div>
  </td>
  );
}
TableData.propTypes = {
  children: PropTypes.any
}
