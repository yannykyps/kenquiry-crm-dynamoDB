import PropTypes from "prop-types";
export default function TableData(props) {
  return (
    <td colSpan={props.colSpan} className={`p-2 whitespace-nowrap ${props.styleClass}`}>
    <div className="pl-4 text-sm text-gray-900">
      {props.children}
    </div>
  </td>
  );
}

TableData.propTypes = {
  children: PropTypes.any.isRequired,
  colSpan: PropTypes.string,
  styleClass: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
}
