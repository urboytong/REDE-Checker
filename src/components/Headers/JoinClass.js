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
import "assets/scss/argon-dashboard/custom/Header.scss";

const Header = () => {
  const [modalOpen1, setModalOpen1] = useState(false);
  return (
    <>
      <Modal
        toggle={() => setModalOpen1(!modalOpen1)}
        isOpen={modalOpen1}
        size="md"
      >
        <div className=" modal-header">
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen1(!modalOpen1)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <h1 className="text-center">Join Classroom</h1>
          <Row className="align-items-center">
            <Col>
              <Input
                className="form-control-alternative input-classroomCode"
                id=""
                placeholder="Classroom Code"
              />
            </Col>
            <Col className="text-right button-input-classroomCode">
              <Button
                color="dark"
                href="#pablo"
                size="sm"
                className="search-classroomCode"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Button
        className="mt-4"
        color="dark"
        onClick={() => setModalOpen1(!modalOpen1)}
      >
        Join class
      </Button>
    </>
  );
};

export default Header;
