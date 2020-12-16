import { useRouter } from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cookie from "cookie";
import * as setCookie from "set-cookie-parser";

import http from "../store/actions/http";
import { fetchUser, signup, login, logout } from "../store/actions/user";
import { wrapper } from "../store/store";
import { useState } from "react";

const Login = ({ signupAction, loginAction }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <span>signup</span>
        <input
          type="email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="button" onClick={() => signupAction(username, password)}>
          Sign up
        </button>
      </form>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          marginTop: "20px",
        }}
      >
        <span>login</span>
        <input
          type="email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => loginAction({ username, password, router })}
        >
          Login
        </button>
      </form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupAction: bindActionCreators(signup, dispatch),
    loginAction: bindActionCreators(login, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Login);
