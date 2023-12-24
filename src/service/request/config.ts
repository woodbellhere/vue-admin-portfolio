// 练习环境变量，注了
// const BASE_URL = "http://woodbell.org/prod";
// let BASE_URL = "";
// const TIME_OUT = 10000;

// if (process.env.NODE_ENV === "development") {
//   BASE_URL = "/api";
// } else if (process.env.NODE_ENV === "production") {
//   BASE_URL = "http://woodbell.org/prod";
// } else {
//   BASE_URL = "http://woodbell.org/test";
// }

const BASE_URL = process.env.VUE_APP_BASE_URL;
const TIME_OUT = 10000;
export { BASE_URL, TIME_OUT };
