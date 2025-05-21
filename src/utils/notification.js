import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const showSwal = ({ isSuccess, title }) => {
  Swal.fire({
    width: "24rem",
    icon: isSuccess ? "success" : "error",
    title: title,
    showConfirmButton: false,
    // showCloseButton: true,
    // position: "top",
    timer: 2500,
    background: "transparent",
    color: "#fff",
    willOpen: (popup) => {
      popup.style.border = "1px solid white";
      popup.style.borderRadius = "8px";
    },
  });
};

showSwal.propTypes = {
  isSuccess: PropTypes.bool,
  title: PropTypes.string,
};
