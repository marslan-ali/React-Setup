import React, { useState } from "react";

import "../Vendors/fontawesome/css/font-awesome.min.css";
import "../Vendors/css/nprogress.css";
import "../Vendors/css/animate.min.css";
import "../Vendors//css/bootstrap.min.css";
import "../Vendors/css/custom.min.css";
import {  useFormik } from "formik";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";

function User() {
  const [redirect, setRedirect] = useState(false);
  const Register = useFormik({
    initialValues: {
      email: "",
      password: "",
      dob: "",
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:3001/API/user/new", {
          name: values.name,
          dob: values.dob,
          email: values.email,
          password: values.password,
        })
        .then(
          (response) => {
            console.log(response);
            alert(response.data.message);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is Required";
      }
      if (!values.password) {
        errors.password = "Password is Required";
      }
      if (!values.dob) {
        errors.dob = "DOB is Required";
      }
      if (!values.name) {
        errors.name = "Name is Required";
      }
      return errors;
    },
  });

  const Login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:3001/API/Login", {
          email: values.email,
          password: values.password,
        })
        .then(
          (response) => {
            setRedirect(true);
            // alert(response.data.message);
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is Required";
      }
      if (!values.password) {
        errors.password = "Password is Required";
      }

      return errors;
    },
  });

  if(redirect===true){
  return <Redirect to="/home"></Redirect>

}

  return (
    <div class="login">
      <div>
        <a class="hiddenanchor" id="signup"></a>
        <a class="hiddenanchor" id="signin"></a>

        <div class="login_wrapper">
          <div class="animate form login_form">
            <section class="login_content">
              <form onSubmit={Login.handleSubmit}>
                <h1>Login Form</h1>
                
                <div class="col-md-12 col-sm-12  form-group has-feedback">
                  <input
                   
                   type="text"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    required=""
                    onChange={Login.handleChange}
                    value={Login.values.email}
                  ></input>
											<span class="fa fa-envelope form-control-feedback right" aria-hidden="true"></span>

                  {Login.errors.email ? (
                    <div style={{ paddingBottom: 5 }}>{Login.errors.email}</div>
                  ) : null}
                </div>
                <div class="col-md-12 col-sm-12  form-group has-feedback">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required=""
                    name="password"
                    onChange={Login.handleChange}
                    value={Login.values.password}
                  />
											<span class="fa fa-lock form-control-feedback right" aria-hidden="true"></span>

                  {Login.errors.password ? (
                    <div style={{ paddingBottom: 10 }}>
                      {Login.errors.password}
                    </div>
                  ) : null}
                </div>
                <div>
                  {/* <button
                  type="reset"
                    style={{ color: "whitesmoke" }}
                    class="btn btn-primary submit"
                  >
                   Reset
                  </button> */}
                  <button
                    style={{ color: "whitesmoke" }}
                    class="btn btn-success submit"
                  >
                    Log in
                  </button>

                  <Link class="reset_pass" to="/API/user/resetLink">
                    Lost Your Password?
                  </Link>
                </div>

                <div class="clearfix"></div>

                <div class="separator">
                  <p class="change_link">
                    New to site?
                    <a href="#signup" class="to_register">
                     
                      Create Account
                    </a>
                  </p>

                  <div class="clearfix"></div>
                  <br />
                </div>
              </form>
            </section>
          </div>

          <div id="register" class="animate form registration_form">
            <section class="login_content">
              <form onSubmit={Register.handleSubmit}>
                <h1>Create Account</h1>
                <div class="col-md-12 col-sm-12  form-group has-feedback">
                  <input
                    type="text"
                    class=" field item form-group form-control"
                    placeholder="Username"
                    required=""
                    name="name"
                    onChange={Register.handleChange}
                    value={Register.values.name}
                  />
											<span class="fa fa-user form-control-feedback right" aria-hidden="true"></span>

                  {Register.errors.name ? (
                    <div style={{ paddingBottom: 10 }}>
                      {Register.errors.name}
                    </div>
                  ) : null}
                </div>
                <div class="col-md-12 col-sm-12  form-group has-feedback">
                  <input
                    type="email"
                    class="field item  form-group form-control"
                    placeholder="Email"
                    name="email"
                    required=""
                    onChange={Register.handleChange}
                    value={Register.values.email}
                  />
											<span class="fa fa-envelope form-control-feedback right" aria-hidden="true"></span>

                  {Register.errors.email ? (
                    <div style={{ paddingBottom: 10 }}>
                      {Register.errors.email}
                    </div>
                  ) : null}
                </div>

                <div class="col-md-12 col-sm-12  form-group has-feedback">
                  <input
                    class=" field item form-group form-control"
                    type="date"
                    name="dob"
                    required="required"
                    name="dob"
                    onChange={Register.handleChange}
                    value={Register.values.dob}
                  />
                  
                  {Register.errors.dob ? (
                    <div style={{ paddingBottom: 10 }}>
                      {Register.errors.dob}
                    </div>
                  ) : null}
                </div>

                <div class="col-md-12 col-sm-12  form-group has-feedback">
                  <input
                    type="password"
                    class=" field item form-group form-control"
                    placeholder="Password"
                    required=""
                    name="password"
                    onChange={Register.handleChange}
                    value={Register.values.password}
                  />
											<span class="fa fa-lock form-control-feedback right" aria-hidden="true"></span>

                  {Register.errors.password ? (
                    <div style={{ paddingBottom: 10 }}>
                      {Register.errors.password}
                    </div>
                  ) : null}
                </div>

                <div>
                  <button class="btn btn-success submit">Submit</button>
                </div>

                <div class="clearfix"></div>

                <div class="separator">
                  <p class="change_link">
                    Already a member ?
                    <a href="#signin" class="to_register">
                     
                      Log in
                    </a>
                  </p>

                  <div class="clearfix"></div>
                  <br />
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
