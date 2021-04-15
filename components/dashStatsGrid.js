import PropTypes from "prop-types";
export default function DashStatsGrid(props) {
  return (
    <div className="sm:grid-cols-4 grid-cols-2 grid gap-4 w-5/6 m-auto mt-12">
      {props.children}
    </div>
  );
}
DashStatsGrid.propTypes = {
  children: PropTypes.any.isRequired,
};
