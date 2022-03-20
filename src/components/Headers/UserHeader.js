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
import "assets/scss/argon-dashboard/custom/UserHeader.scss";

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
        <Container className="d-flex align-items-center subject-detail" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white subject-name">
                Software Engineer
              </h1>
              <p className="text-white mt-0 mb-5 subject-date-time">
                MONDAY 9.00-12.00 A.M.
              </p>
              <Button
                color="dark"
                size="sm"
                className="edit-classroom"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Edit Classroom
              </Button>

              {/* modal edit classroom */}
              <Modal
                toggle={() => setModalOpen(!modalOpen)}
                isOpen={modalOpen}
                size="lg"
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
                <ModalBody className="modal-edit-classroom">
                  <Col className="order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                      <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                          <Col xs="7">
                            <h3 className="mb-0">Edit Classroom</h3>
                          </Col>
                          <Col className="text-right" xs="5">
                            <Button
                              color="dark"
                              onClick={(e) => e.preventDefault()}
                              size="sm"
                              className="btn-coverImage"
                            >
                              Select Cover Image
                            </Button>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          <h6 className="heading-small text-muted mb-4">
                            Classroom information
                          </h6>

                          <div>
                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Subject Code
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id=""
                                    placeholder="CSSxxx"
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="8">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Subject Name
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id=""
                                    placeholder="Software Engineer"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Class Date
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    defaultValue="Lucky"
                                    id="input-first-name"
                                    placeholder="First name"
                                    type="select"
                                  >
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                    <option>Sunday</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Start time
                                  </label>
                                  <input
                                    type="time"
                                    name="time"
                                    className="form-control-alternative form-time"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-last-name"
                                  >
                                    End time
                                  </label>
                                  <input
                                    type="time"
                                    name="time"
                                    className="form-control-alternative form-time"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>

                          {/* Description */}
                          <div>
                            <FormGroup>
                              <label className="form-control-label">
                                Description
                              </label>
                              <Input
                                className="form-control-alternative"
                                placeholder="A few words about classroom ..."
                                rows="4"
                                type="textarea"
                              />
                            </FormGroup>
                          </div>
                          <div className="text-center">
                            <Button
                              className="mt-2 button-modal-detailClassroom"
                              color="dark"
                            >
                              Save
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
