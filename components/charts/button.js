
import PropTypes from "prop-types";
export default function Button (props) {

    return (
        <button
                  className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2 mb-4"
                  onClick={props.onClick}
                  value={props.value}
                >
                  {props.label}
                </button>
    )
}
Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string
}
