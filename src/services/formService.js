import axios from "axios";
const gasUrl =
  // "https://script.google.com/macros/s/AKfycbwGhc2ZpsXepU-_fwuaockl37ikKexIaWgypxQ7lVzPC5uLEnUVhMpDjC6CRwk1YpJ5/exec"; // v14
  // "https://script.google.com/macros/s/AKfycbwkdpYaYtvOv4Z5Xenb8Q30zHnaQdc1sLNpCarurXI5rJ6hLlV362cWaqJCuQybK4TJ/exec"; // v15
  "https://script.google.com/macros/s/AKfycbwF3nCA2RexrBvF8jetwQpg4zLrs0v78huCwcwhH3-FkzvKuXLIN6mwiZF36sMXGm-c/exec"; // v21

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

export const getResultsRecord = async () => {
  return await axios
    .get(`${gasUrl}?sheetName=RESULTS`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { code: 500, redirectUrl: "/error", msg: err };
    });
};

export const postUserRecord = async (userRecordReq) => {
  return await axios
    // .post(`${gasUrl}`, { selectedValues: selectedValues })
    .post(`${gasUrl}`, JSON.stringify({ userRecordReq: userRecordReq }))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { code: 500, redirectUrl: "/error", msg: err };
    });
};
