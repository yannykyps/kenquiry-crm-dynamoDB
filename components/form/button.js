import PropTypes from "prop-types";
export default function Button(props) {
  return (
    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button
        type={props.type}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {props.label}
      </button>
    </div>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string
}
