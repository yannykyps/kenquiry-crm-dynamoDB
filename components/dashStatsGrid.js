import PropTypes from "prop-types";
export default function DashStatsGrid(props) {
  return (
    <div className={`sm:grid-cols-${props.grid} grid w-5/6 m-auto`}>
      {props.children}
    </div>
  );
}
DashStatsGrid.propTypes = {
  children: PropTypes.any.isRequired,
  grid: PropTypes.any.isRequired,
};
