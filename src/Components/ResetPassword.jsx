import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
function ResetPassword() {
  const [load, setLoad] = useState();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    axios
      .get("http://localhost:3001/API/user/resetPassword", {
        params: {
          token: token,
          email: email,
        },
      })
      .then(
        (response) => {
          if (response.data.status === "success") {
            setLoad(true);
            setEmail(response.data.record.email);
            setToken(response.data.record.token);
          }
        },
        (error) => {
          setLoad(false);

          console.log(error);
        }
      );
  }, []);

  const resetPassword = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:3001/API/user/newPassword", {
          password: values.password,
          email: email,
          token: token,
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
      if (!values.password) {
        errors.password = "Password is Required";
      }
      return errors;
    },
  });

  if (load) {
    return (
      <div>
        <div class="container padding-bottom-3x mb-2 mt-5">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-10">
              <div class="forgot">
                <h2>Reset Password?</h2>
              </div>
              <form class="card mt-4" onSubmit={resetPassword.handleSubmit}>
                <div class="card-body">
                  <label
                    class="col-md-12 col-sm-12"
                    for="email-for-pass"
                    style={{ fontSize: 18 }}
                  >
                    Enter Your New Password
                  </label>
                  <div class="col-md-12 col-sm-12  form-group has-feedback">
                    <input
                      class="form-control"
                      type="password"
                      id="email-for-pass"
                      required=""
                      name="password"
                      onChange={resetPassword.handleChange}
                      value={resetPassword.values.password}
                    />
                    <span
                      class="fa fa-lock form-control-feedback right"
                      aria-hidden="true"
                    ></span>
                    {resetPassword.errors.password ? (
                      <div style={{ paddingBottom: 5 }}>
                        {resetPassword.errors.password}
                      </div>
                    ) : null}
                    <label
                      class="form-text text-muted"
                      style={{ fontSize: 12 }}
                    >
                      Please Remember Your Password
                    </label>{" "}
                  </div>
                </div>
                <div class="card-footer">
                  {" "}
                  <button class="btn btn-success" type="submit">
                    Submit
                  </button>{" "}
                  <Link style={{ fontSize: 15 }} class="reset_pass" to="/">
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "center", fontSize: 18, padding: 5 }}>
        Token Expired. PLease try again.....
      </div>
    );
  }
}

export default ResetPassword;
