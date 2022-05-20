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
import React, { useState, useEffect, useRef, useContext } from "react";
import firebaseApp from "../../firebase";
import { AuthContext } from "components/Auth/Auth.js";
import {
  Button,
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  FormGroup,
  Form,  
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  UncontrolledCollapse,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/AdminNavbar.scss";

const Profile = ({modalOpen2,setModalOpen2}) => {

  const [ForgotPassForm, setForgotPassForm] = useState(true);
  const [ForgotPassForm2, setForgotPassForm2] = useState(false);

  const { currentUser } = useContext(AuthContext);

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
        setTimeout(function () {
          setModalOpen2(!modalOpen2);
          setTimeout(function () {
            setForgotPassForm(true);
            setForgotPassForm2(false);
          }, 1000);
        }, 4000);
    }
    if (Email == "") {
      //Code
    }
  };


  return (
    <>
<Modal
        toggle={() => setModalOpen2(!modalOpen2)}
        isOpen={modalOpen2}
        size="lg"
      >
        <div className=" modal-header">
        </div>
        <ModalBody>
          <Row>
            {" "}
            <Col>
              {ForgotPassForm ? (<Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h2 className="mb-0">Reset Password</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="resetPass">
                <div>Will send reset password email to</div>
                <h2 className="text-center mb-0">{currentUser.email}</h2>
          {/*<FormGroup>
            <InputGroup className="input-group-alternative">
              <Input
                className="darkGray width-field"
                type="password"
                name="password"
                // autoComplete="new-password"
                // onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
          <div className="topicForm">New Password</div>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <Input
                className="darkGray"
                type="password"
                name="password"
                // autoComplete="new-password"
                // onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
          <div className="topicForm">Confirm New Password</div>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <Input
                className="darkGray"
                type="password"
                name="password"
                // autoComplete="new-password"
                // onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormGroup>*/}
          <div className="text-center mt-2">
            <Button
              className="my-4 buttonStyle"
              color="primary"
              type="button"
              onClick={() => forgotPassword(currentUser.email)}
            >
              SEND
            </Button>
          </div>            
                </CardBody>
              </Card>) : null}

              {ForgotPassForm2 ? (<Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h1 className="text-center">Please check your email</h1>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="resetPass">
                <img
                  src={require("../../assets/img/image/mail-sending.gif").default}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  className="webcam-style"
                />
                </CardBody>
              </Card>) : null}

            </Col>
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default Profile;
