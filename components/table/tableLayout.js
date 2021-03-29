import PropTypes from "prop-types";
export default function TableLayout({children}) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-2 border-dashed border-gray-200 rounded-lg max-h-96 overflow-auto">
          <div className="flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    {children}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TableLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

TableLayout.Head = (props) => (
  <thead className="bg-gray-50">
    <tr>{props.children}</tr>
  </thead>
);

TableLayout.Body = (props) => <>{props.children}</>;
