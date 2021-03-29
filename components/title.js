import PropTypes from "prop-types";

export default function Title({title, subTitle}) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 capitalize">{title}</h1>
        {subTitle && <h2 className="text-base text-gray-400">{subTitle}</h2>}
      </div>
    </header>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};
