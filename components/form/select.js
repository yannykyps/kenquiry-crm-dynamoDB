import PropTypes from "prop-types";
export default function Select(props) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <select
        name={props.name}
        id={props.name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onChange={props.onChange}
        value={props.value}
        defaultValue={props.defaultValue}
        required={props.required}
      >
      {props.children}
      </select>
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.any,
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string
}

Select.Option = (props) => (
    <option disabled={props.disabled} value={props.value}>{props.label}</option>
  );
