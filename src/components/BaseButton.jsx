import PropTypes from "prop-types";

const BaseButton = ({ label, className, onClick, children }) => {
  return (
    <button
      className={`py-2 px-6 cursor-pointer inline-flex justify-center items-center border transition-colors duration-150 ${className}`}
      onClick={onClick}
    >
      {/* {label || children} */}
      {children ?? label}
    </button>
  );
};

BaseButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default BaseButton;
