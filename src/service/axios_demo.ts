import axios from "axios";

axios.defaults.baseURL = "http://httpbin.org";
axios.defaults.timeout = 10000;
// axios.defaults.headers = {};
// axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
//   console.log(res.data);
// });
axios
  .get("/get", {
    params: {
      name: "wood",
      age: 25,
    },
    timeout: 5000,
    headers: {},
  })
  .then((res) => {
    console.log(res.data);
  });

axios
  .post("http://httpbin.org/post", {
    data: {
      name: "wood",
      age: 25,
    },
  })
  .then((res) => console.log(res.data));

axios
  .all([
    axios.get("/get", { params: { name: "wood", age: 25 } }),
    axios.post("/post", { params: { name: "wood", age: 25 } }),
  ])
  .then((res) => console.log(res));

// fn1是请求成功，fn2是请求失败 时的回调
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
    return err;
  },
);

axios.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (err) => {
    console.log(err);
    return err;
  },
);
