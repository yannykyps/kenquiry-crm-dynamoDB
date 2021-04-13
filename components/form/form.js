import PropTypes from "prop-types";
export default function Form(props) {
  return (
    <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-6">
            <form action={props.action} method={props.method} onSubmit={props.onSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
              {props.children}
              </div>
            </form>
          </div>
        </div>
  );
}

Form.propTypes = {
  action: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  method: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

Form.Inputs = (props) => (
    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {props.children}
                  </div>
                </div>
  );

  Form.Button = (props) => (
    <>{props.children}</>
  );