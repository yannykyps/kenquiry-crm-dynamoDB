import PropTypes from "prop-types";
export default function TableHead(props) {
  return (
      
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {props.head}
    </th>
  );
}

TableHead.propTypes = {
  head: PropTypes.any.isRequired
}
