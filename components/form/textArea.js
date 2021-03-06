import PropTypes from "prop-types";
export default function TextArea(props) {
  return (
    <div className="col-span-6">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
      {props.label}
      </label>
      <div className="mt-1">
        <textarea
          id={props.name}
          name={props.name}
          rows={props.rows}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          onChange={props.onChange}
          required={props.required}
          value={props.value}
        ></textarea>
      </div>
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string
}
