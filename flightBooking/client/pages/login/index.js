import React, { useState } from "react";
import SigninForm from "./loginUI";
import { Redirect } from "react-router-dom";
import {
  signIn,
  authenticate,
  isAuthenticated,
  pingServer
} from "../../utils/request/AuthUser";

const Login = () => {
  const [state, setState] = useState({
    email: "sadmin@sadmin.com",
    password: "qwerty12345",
    error: "",
    loading: false
  });

  const { email, password, loading, error } = state;

  const handleChange = event => {
    setState({
      ...state,
      error: false,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
      event.preventDefault();

      const data = await signIn({ email, password }).catch(err => {
        setState({ ...state, error: false, loading: false });
      })
      console.log("data login: ", data);  // Xem dữ liệu trả về từ signIn

      if (data && data.status === 200) {
        authenticate(data, () => {
          if (isAuthenticated()) {
            setState({ ...state });
          }
        });
      }
    };
  
  const showError = () => <div className="alert alert-danger">{error}</div>;

  const showLoading = () => (
    <div className="alert alert-info">
      <h2>Loading...</h2>
    </div>
  );

  const redirectUser = () => <Redirect to="/" />;

  return (
    <div className="login-dark">
      {loading && showLoading()}
      {error && showError()}
      {!loading && (
        <SigninForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          state={state}
        />
      )}
      {isAuthenticated() && redirectUser()}
    </div>
  );
};

export default Login;
