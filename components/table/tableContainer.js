import PropTypes from "prop-types";
export default function TableContainer({children}) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-2 border-dashed border-gray-200 rounded-lg max-h-96 overflow-auto">
          <div className="flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
TableContainer.propTypes = {
  children: PropTypes.any
}
