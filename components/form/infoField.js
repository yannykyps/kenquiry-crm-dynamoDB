import PropTypes from "prop-types";
export default function InfoField(props) {
  return (
    <p className={`sm:col-span-${props.gridSpan}`}>
      <span>{props.label}</span>
      <span>{props.value}</span>
    </p>
  );
}

InfoField.propTypes = {
  gridSpan: PropTypes.any,
  label: PropTypes.any,
  value: PropTypes.any
}
