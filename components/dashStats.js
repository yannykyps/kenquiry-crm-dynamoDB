import PropTypes from "prop-types";
export default function DashStats(props) {

return (
    <div className={`shadow rounded-lg w-36 text-center h-24 m-auto p-4 ${props.onClick && "cursor-pointer"}`} onClick={props.onClick}>
      <h2 className="font-medium text-gray-500">{props.title}</h2>
      <h1 className="font-medium text-black text-4xl">{props.total}</h1>
    </div>

)

}
DashStats.propTypes = {
  onClick: PropTypes.any,
  title: PropTypes.string.isRequired,
  total: PropTypes.any.isRequired
}
