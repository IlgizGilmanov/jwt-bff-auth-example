import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cookie from "cookie";
import * as setCookie from "set-cookie-parser";
import Link from "next/link";

import http from "../store/actions/http";
import { fetchUser, signup, login, logout } from "../store/actions/user";
import { wrapper } from "../store/store";
import { useState } from "react";

const Index = ({ user, logoutAction }) => {
  return user ? (
    <div>
      <h1>User logged in: {user.username}</h1>
      <button onClick={() => logoutAction()}>Logout</button>
    </div>
  ) : (
    <Link href="/login" passHref>
      <a>Go to login page</a>
    </Link>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, res, store }) => {
    /**
     * If req is present this function is running on the server
     * The server at this point will _always_ be missing the accessToken because it is stored in the clients memory
     * for that reason we need to correctly set the axios instances cookie header and fetch refreshToken
     */
    if (req) {
      console.log("index getServerSideProps with req");

      console.log("getServerSideProps req.headers.cookie", req.headers.cookie);
      console.log(
        "getServerSideProps req.headers.Authorization",
        req.headers.Authorization
      );

      http.defaults.headers.cookie = req.headers.cookie || "";
      http.defaults.headers.Authorization = req.headers.Authorization || "";
      try {
        console.log("getServerSideProps before refresh");
        const resp = await http.get("/api/refresh");
        console.log("index getServerSideProps resp");
        res.setHeader("set-cookie", resp.headers["set-cookie"]);
        const respCookie = setCookie.parse(resp.headers["set-cookie"])[0];
        http.defaults.headers.cookie = cookie.serialize(
          respCookie.name,
          respCookie.value
        );
        http.defaults.headers.Authorization = `Bearer ${resp.data.accessToken}`;
      } catch (e) {
        console.log("index getServerSideProps error");
        // console.error(e.response);
      }
    } else {
      console.log("index getServerSideProps without req");
    }

    await store.dispatch(fetchUser());
  }
);

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: bindActionCreators(logout, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
