import PropTypes from "prop-types";
export default function DashStatsGrid(props) {
  return (
    <div className={`sm:grid-cols-4 grid w-5/6 m-auto`}>
      {props.children}
    </div>
  );
}
DashStatsGrid.propTypes = {
  children: PropTypes.any.isRequired,
};
