import PropTypes from "prop-types";
export default function TableDataStatus(props) {
    return (
      <td className="px-6 py-2 whitespace-nowrap">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${props.styleClass}`}
            >
              {props.children}
            </span>
          </td>
    );
  }
  
  TableDataStatus.propTypes = {
    children: PropTypes.any,
    styleClass: PropTypes.string
  }