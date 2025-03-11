import axios from "axios";
const gasUrl =
  "https://script.google.com/macros/s/AKfycbyg8AB7MEMZu2rP9vLuia9iM84LePchGP5cfMNhsc_FfIttCWpIXjVlWsX2zeJTN8sI/exec"; // v13

export const getUserRecord = async () => {
  return await axios
    .get(`${gasUrl}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { code: 500, redirectUrl: "/error", msg: err };
    });
};

export const postUserRecord = async (userRecodeReq) => {
  return await axios
    // .post(`${gasUrl}`, { selectedValues: selectedValues })
    .post(`${gasUrl}`, JSON.stringify({ userRecodeReq: userRecodeReq }))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { code: 500, redirectUrl: "/error", msg: err };
    });
};
