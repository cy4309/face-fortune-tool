import axios from "axios";
const gasUrl =
  "https://script.google.com/macros/s/AKfycbw_3OwSpVvjIpMxlbA7VBhp7Ai8LoBC8NHsuHevLTT_znlGpKZ-mRZqNBmORg9Iru54/exec";

export const getImagesUrl = async () => {
  return await axios
    .get(`${gasUrl}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { code: 500, redirectUrl: "/error", msg: err };
    });
};
