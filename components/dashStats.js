import PropTypes from "prop-types";
export default function DashStats(props) {

return (
    <div className="shadow rounded-lg w-40 text-center h-28 m-auto mt-12 p-4">
      <h2 className="font-medium text-gray-500">{props.title}</h2>
      <h1 className="font-medium text-black text-5xl">{props.total}</h1>
    </div>

)

}
DashStats.propTypes = {
  title: PropTypes.any,
  total: PropTypes.any
}
