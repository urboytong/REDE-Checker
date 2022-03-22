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
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/login.scss";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState();
  const [ForgotPassForm, setForgotPassForm] = useState(true);
  const [ForgotPassForm2, setForgotPassForm2] = useState(false);

  function OpenForgotPassModal() {
    setModalOpen(!modalOpen);
    setForgotPassForm(true);
    setForgotPassForm2(false);
  }

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
    if (Email != "") {
      firebaseApp
        .auth()
        .sendPasswordResetEmail(Email)
        .then(function (user) {
          setForgotPassForm(false);
          setForgotPassForm2(true);
        })
        .catch(function (e) {
          console.log(e);
        });
    }
    if (Email == "") {
      //Code
    }
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
              <div className="topicForm">
                Email
                <span className="text-red">&nbsp;&nbsp;&nbsp;{EmailError}</span>
              </div>
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
              {/* <div className="box1"> */}
              {/* <div className="custom-control custom-control-alternative custom-checkbox checkbox">
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
                </div> */}
              <div
                className="forgotPass lightGray-textSize"
                // onClick={() => forgotPassword(Email)}
                onClick={() => OpenForgotPassModal()}
              >
                Forgot Password ?
              </div>
              {/* </div> */}

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
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        size="md"
      >
        <div className=" modal-header">
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          {ForgotPassForm ? (
            <h1 className="text-center">Forgot Password</h1>
          ) : null}
          {ForgotPassForm ? (
            <Row className="align-items-center">
              <Col>
                <Input
                  className="form-control-alternative input-classroomCode"
                  id=""
                  placeholder="Please enter your Email"
                  name="email"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col className="text-right button-input-classroomCode">
                <Button
                  color="primary"
                  href="#pablo"
                  size="sm"
                  className="search-classroomCode"
                  onClick={() => forgotPassword(Email)}
                >
                  <i class="fa-solid fa-paper-plane"></i>
                </Button>
              </Col>
            </Row>
          ) : null}
          {ForgotPassForm2 ? (
            <h1 className="text-center">Please check your email</h1>
          ) : null}
          {ForgotPassForm2 ? (
            <img
              src={require("../../assets/img/image/mail-sending.gif").default}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
              className="webcam-style"
            />
          ) : null}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default Login;
