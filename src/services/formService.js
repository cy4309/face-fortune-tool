import axios from "axios";
const gasUrl =
  "https://script.google.com/macros/s/AKfycbwGhc2ZpsXepU-_fwuaockl37ikKexIaWgypxQ7lVzPC5uLEnUVhMpDjC6CRwk1YpJ5/exec"; // v14

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
