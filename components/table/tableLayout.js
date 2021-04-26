import PropTypes from "prop-types";
export default function TableLayout({children, styleClass}) {
  return (
            <div className={`-my-2 ${styleClass}`}>
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    {children}
                  </table>
                </div>
              </div>
            </div>

  );
}

TableLayout.propTypes = {
  children: PropTypes.array.isRequired,
  styleClass: PropTypes.string
}

TableLayout.Head = (props) => (
  <thead className="bg-gray-50">
    <tr>{props.children}</tr>
  </thead>
);

TableLayout.Body = (props) => <>{props.children}</>;
