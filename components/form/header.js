import PropTypes from "prop-types";
export default function Header(props) {
  return (
    <div className="md:col-span-1">
          <div className="px-4 sm:px-0 pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {props.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{props.subTitle}</p>
          </div>
        </div>
  );
}
Header.propTypes = {
  subTitle: PropTypes.any,
  title: PropTypes.any
}
