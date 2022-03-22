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
import { CopyToClipboard } from "react-copy-to-clipboard";

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

import "assets/scss/argon-dashboard/custom/Headerprofessor.scss";
import JoinClass from "components/Headers/JoinClass.js";

const Header2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState();

  return (
    <>
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
        <ModalBody>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Create Classroom</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {/* <Button
                      color="dark"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Select Cover Image
                    </Button> */}
                    <div class="upload-btn-wrapper text-center">
                      <button class="btn-uploadCoverimg">Select Cover Image</button>
                      <input type="file" name="myfile" />
                    </div>
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
                      <label className="form-control-label">Description</label>
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
                      Create Classroom
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <div className="text-right">
              <JoinClass />
              <Button
                className="mt-4"
                color="dark"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Create Classroom
              </Button>
            </div>
            <Row className="mt-4">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">MONDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-pink text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">TUSEDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-orange text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">THURSDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-orange text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">THURSDAY : 13:00 - 16:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">WEDNESDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">WEDNESDAY : 13:00 - 16:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-purple text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">FRIDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-purple text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">FRIDAY : 13:00 - 16:00</span>
                      <span className="mr-2 section">SEC : 1</span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header2;