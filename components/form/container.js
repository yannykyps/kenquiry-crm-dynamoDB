import PropTypes from "prop-types";
export default function Container({children}) {
  return (
    <div className="p-8 bg-gray-100">
      <div className="flex flex-col">
          {children}
      </div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.any
}
