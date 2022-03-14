// import { Button, Container, Row, Col,Modal, ModalBody, ModalFooter, } from "reactstrap";
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

import React, { useState } from "react";
import "assets/scss/argon-dashboard/custom/UserHeader2.scss";

const UserHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center bg-classroom"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            require("../../assets/img/theme/KMUTT01.jpg").default +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center  subject-detail" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white subject-name">Software Engineer</h1>
              <p className="text-white mt-0 mb-5 subject-date-time">MONDAY 9.00-12.00 a.m.</p>
              <Button
                color="dark"
                href="#pablo"
                size="sm"
                className="edit-classroom"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Leave Classroom
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        size="sm"
      >
        <div className=" modal-header"></div>
        <ModalBody>
          {" "}
          <span className="font-weight-light confirm-leaveRoom">
            Do you want to leave &nbsp;
            <span className="font-weight-bold">Software Engineer</span>
            &nbsp; ?
          </span>
          <div className="col text-center mt-4">
            <Button
              color="success"
              href="#pablo"
              //onClick={() => setModalOpen1(!modalOpen1)}
              className="ml-2 mr-2 btn-confirm-leaveRoom"
              size="l"
            >
              Confirm
            </Button>
            <Button
              color="danger"
              href="#pablo"
              size="l"
              aria-label="Close"
              onClick={() => setModalOpen(!modalOpen)}
              className="ml-2 mr-2 btn-confirm-leaveRoom"
            >
              Cancel
            </Button>
          </div>{" "}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default UserHeader;
