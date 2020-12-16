import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const http = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

createAuthRefreshInterceptor(http, (failedRequest) => {
  console.log("http createAuthRefreshInterceptor before refresh");
  return http
    .get("/api/refresh")
    .then((resp) => {
      console.log("http createAuthRefreshInterceptor (resp)");
      const { accessToken } = resp.data;
      const bearer = `Bearer ${accessToken}`;
      http.defaults.headers.Authorization = bearer;
      failedRequest.response.config.headers.Authorization = bearer;
      return Promise.resolve();
    })
    .catch((err) => {
      console.error("http createAuthRefreshInterceptor error");
      // console.error(err.response);
    });
});

export default http;
