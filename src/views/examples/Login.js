/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { useEffect, useState, useContext } from "react";
import firebaseApp from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    try {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(Email, Password)
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              setEmailError("The email address is badly formatted.");
              break;
            case "auth/user-disabled":
              setEmailError(error.message);
              break;
            case "auth/user-not-found":
              setEmailError(
                "There is no user record corresponding to this identifier."
              );
              break;
            case "auth/wrong-password":
              setPasswordError(
                "The password is invalid or the user does not have a password."
              );
              break;
          }
        });
    } catch (error) {
      alert(error);
    }
  };
  const forgotPassword = (Email) => {
    firebaseApp
      .auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        alert("Please check your email...");
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/student/student-home" />;
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1 className="darkGray">Login</h1>
            </div>
            <Form role="form">
              <div className="topicForm">Email</div>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    className="darkGray"
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="email"
                  />
                </InputGroup>
              </FormGroup>
              {EmailError}

              <div className="topicForm">Password</div>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    className="darkGray"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {PasswordError}
              <div className="box">
                <div className="custom-control custom-control-alternative custom-checkbox checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted remember">Remember me</span>
                  </label>
                </div>
                <div
                  className="forgotPass lightGray-textSize"
                  onClick={() => forgotPassword(Email)}
                >
                  Forgot Password?
                </div>
              </div>

              <div className="text-center mt-2">
                <Button
                  className="my-4 buttonStyle"
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  LOGIN
                </Button>
              </div>

              <div className="box mt-3">
                <div className="line"></div>
                <div className="lightGray-textSize or">OR</div>
                <div className="line"></div>
              </div>

              <div className="text-center mt-2">
                <Button
                  className="my-4 buttonRegister"
                  type="button"
                  to="/auth/register"
                  tag={Link}
                >
                  REGISTER
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
