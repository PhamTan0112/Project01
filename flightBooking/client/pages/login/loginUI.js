import React from "react";
import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Layout from "../../components/Layout";
import Cake from "../../components/Cake";
import { Input, Button } from "antd";

function LoginUI({handleChange, handleSubmit, state }) {
      const [value, setValue] = useState({ hidden: true });
  return (
      <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
      </Head>

      <Layout>
        <div className="Cake" >
          <Cake />
          <div className="row">
            <div
              className="input-background"
              style={{
                display: "inline-block",
                padding: "20px",
                width: "350px",
                height: "280px",
                marginLeft: "270px",
              }}
            >
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">
                    <h4 className="color-white">Email: </h4>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                    value={state.email}  
                    required
                    style={{ width: "300px", marginBottom: "1rem" }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <h4 className="color-white">Password: </h4>
                  </label>
                  <input type={value.hidden ? "password" : "text"}
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    value={state.password}  
                    required
                    style={{ width: "300px", marginBottom: "1rem" }}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    style={{ marginTop: "1rem" }}
                    type = "submit"
                  >
                    Log In
                  </button>
                </div>

                <div className="form-group forgot-password">
                  <Button
                    type="link"
                    className="btn btn-link"
                    onClick={() => Router.push("/")}
                  >
                    Forgot Password?
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default LoginUI;
