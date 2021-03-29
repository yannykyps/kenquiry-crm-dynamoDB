import PropTypes from "prop-types";
export default function DashStatsGrid(props) {

return (
    <div className={`sm:grid-cols-${props.grid} grid w-5/6 m-auto`}>
    {/* <div className="grid grid-flow-col auto-cols-max md:auto-cols-min w-5/6 m-auto gap-x-4"> */}
    {props.children}
  </div>
)

}
DashStatsGrid.propTypes = {
  children: PropTypes.any.isRequired,
  grid: PropTypes.any
}
