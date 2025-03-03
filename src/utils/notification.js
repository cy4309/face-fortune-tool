import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const showSwal = ({ isSuccess, title }) => {
  Swal.fire({
    width: "24rem",
    icon: isSuccess ? "success" : "error",
    title: title,
    showConfirmButton: false,
    // showCloseButton: true,
    timer: 1500,
  });
};

showSwal.propTypes = {
  isSuccess: PropTypes.bool,
  title: PropTypes.string,
};
