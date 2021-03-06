import http from "./http";

export const userActionTypes = {
  CREATE_SUCCESS: "USER_CREATE_SUCCESS",
  LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",
  FETCH_REFRESH_TOKEN_SUCCESS: "USER_FETCH_REFRESH_TOKEN_SUCCESS",
  FETCH_USER_SUCCESS: "USER_FETCH_SUCCESS",
};

export function signup(username, password) {
  return async function (dispatch) {
    try {
      const { data } = await http.post("/api/signup", { username, password });
      console.log("client signup (data)");
      const { user, accessToken } = data;
      http.defaults.headers.Authorization = `Bearer ${accessToken}`;
      dispatch({ type: userActionTypes.CREATE_SUCCESS, user, accessToken });
    } catch (e) {
      // console.error(e.response);
    }
  };
}

export function login({ username, password, router }) {
  return async function (dispatch) {
    try {
      const { data } = await http.post("/api/login", { username, password });
      const { user, accessToken } = data;
      console.log("user.login (data)", data);
      http.defaults.headers.Authorization = `Bearer ${accessToken}`;
      dispatch({ type: userActionTypes.LOGIN_SUCCESS, user, accessToken });
      router.push("/");
    } catch (e) {
      console.log("user login error", e);
    }
  };
}

// export function refreshToken() {
//   return async function (dispatch) {
//     try {
//       const { data } = await http.get("http://localhost:3000/api/refresh");
//       const { accessToken } = data;
//       http.defaults.headers.Authorization = `Bearer ${accessToken}`;
//       dispatch({
//         type: userActionTypes.FETCH_REFRESH_TOKEN_SUCCESS,
//         accessToken,
//       });
//     } catch (e) {
//       // console.log(e);
//       console.error("user refreshToken error");
//     }
//   };
// }

export function fetchUser() {
  return async function (dispatch) {
    try {
      const { data } = await http.get("http://localhost:8080/dev/me");
      const { user } = data;

      dispatch({ type: userActionTypes.FETCH_USER_SUCCESS, user });
    } catch (e) {
      // console.error(e.response);
      console.log("user fetchUser error");
    }
  };
}

export function logout() {
  return async function (dispatch) {
    try {
      await http.post("/api/logout");

      dispatch({ type: userActionTypes.LOGOUT_SUCCESS });
    } catch (e) {
      // console.error(e.response);
      console.log("user logout error");
    }
  };
}
