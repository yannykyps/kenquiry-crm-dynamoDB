import PropTypes from "prop-types";
export default function InfoContainer({children}) {
  return (
    <div className="grid md:grid-cols-3 md:gap-2 mb-4 shadow sm:rounded-md p-4">
          {children}
    </div>
  );
}
InfoContainer.propTypes = {
  children: PropTypes.array
}
