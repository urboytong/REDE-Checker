
// import { Button, Container, Row, Col,Modal, ModalBody, ModalFooter, } from "reactstrap";
import { Button,
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
  UncontrolledTooltip,} from "reactstrap";

import React, { useState } from "react";
import "assets/scss/argon-dashboard/custom/UserHeader.scss";

const UserHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
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
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Software Engineer</h1>
              <p className="text-white mt-0 mb-5">
               MONDAY 9.00-12.00 a.m.
              </p>
            
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
