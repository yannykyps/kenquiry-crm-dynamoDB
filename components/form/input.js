import PropTypes from "prop-types";
export default function Input(props) {

return (
    <div className="col-span-6 sm:col-span-3">
    <label
      htmlFor={props.name}
      className="block text-sm font-medium text-gray-700"
    >
      {props.label}
    </label>
    <input
      type={props.type}
      name={props.name}
      id={props.name}
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      onChange={props.onChange}
      autoComplete={props.autoComplete}
      required={props.required}
      defaultValue={props.defaultValue}
      readOnly={props.readOnly}
    />
  </div>
)

}
Input.propTypes = {
  autoComplete: PropTypes.any,
  defaultValue: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.any,
  readOnly: PropTypes.any,
  required: PropTypes.any,
  type: PropTypes.any
}
