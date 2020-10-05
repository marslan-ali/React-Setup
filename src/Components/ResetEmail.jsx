import React from "react";
import {  useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
function ResetEmail() {
  

  const resetEmail = useFormik({

    initialValues:{
      email: "",
    },
    onSubmit : (values)=>{
      axios.post('http://localhost:3001/API/user/resetLink', {
        email:values.email,
      })
      .then((response) => {
        console.log(response);
        alert(response.data.message);

      }, (error) => {
        console.log(error);
      });
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is Required";
      }
      return errors;
    }
  });

  return (

    <div>
      <div class="container padding-bottom-3x mb-2 mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-10">
            <div class="forgot " style={{textAlign:"center"}}>
              <h2>Forgot Your Password?</h2>
            </div>
            <form class="card mt-4" onSubmit={resetEmail.handleSubmit}>
           


              <div class="card-body">
              <label  class="col-md-12 col-sm-12" for="email-for-pass" style={{ fontSize: 18 }}>
                    Enter Your Email Address
                  </label>
                <div class="col-md-12 col-sm-12  form-group has-feedback" >
                
                  
                  <input
                    class="form-control"
                    type="text"
                    id="email-for-pass"
                    required=""
                    name="email"
                    onChange={resetEmail.handleChange}
                    value={resetEmail.values.email}
                  />
											<span class="fa fa-envelope form-control-feedback right" aria-hidden="true"></span>

                   {resetEmail.errors.email ? (
                    <div style={{ paddingBottom: 5 }}>
                      {resetEmail.errors.email}
                    </div>
                  ) : null}
                  <label class="form-text text-muted" style={{ fontSize: 12 }}>
                    Enter the email address you used during the registration.
                  </label>{" "}
                </div>
              </div>
              <div class="card-footer">
                {" "}
                <button class="btn btn-success" type="submit">
                  Get New Password
                </button>{" "}
                <Link  style={{fontSize:15}} class="reset_pass"  to="/">Back to Login</Link>

               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetEmail;
