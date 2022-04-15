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
import React, { useState } from "react";
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
  return (
    <>
<Modal
        toggle={() => setModalOpen2(!modalOpen2)}
        isOpen={modalOpen2}
        size="lg"
      >
        <div className=" modal-header">
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen2(!modalOpen2)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Row>
            {" "}
            <Col>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h2 className="mb-0">Reset Password</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="resetPass">
                <div className="topicForm">Old Password</div>
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
          </FormGroup>
          <div className="text-center mt-2">
            <Button
              className="my-4 buttonStyle"
              color="primary"
              type="button"
              // onClick={handleSubmit}
            >
              SAVE
            </Button>
          </div>            
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default Profile;
