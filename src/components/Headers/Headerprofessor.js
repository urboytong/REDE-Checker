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
                    <h3 className="mb-0">Create Class</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="dark"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Cover Image
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                   Class information
                  </h6>
                  
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Class code 
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="css111"
                            id=""
                            placeholder="Class code "
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            
                          >
                            Class name
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
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Class day
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="select"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Start time
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="select"
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
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="select"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
               
                  <hr className="my-4" />
                  {/* Description */}
           
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="....."
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <div className="text-center">
 
 <Button className="mt-4" color="dark"  >
Create class
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
          <Button className="mt-4" color="dark"  >
              Join class
                </Button>
                <Button className="mt-4" color="dark"  onClick={() => setModalOpen(!modalOpen)} >
               Create class
                </Button>
              </div>
            <Row className="mt-5">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-book-bookmark" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-yellow mr-2">
                        MONDAY : 9:00 - 12:00
                      </span>{" "}
                     
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-laptop" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-pink mr-2">
                      TUSEDAY : 9:00 - 12:00
                      </span>{" "}
                     
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-compass-04" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-orange mr-2">
                        THURSDAY : 9:00 - 12:00
                      </span>{" "}
                     
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                          <i className="ni ni-hat-3" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-orange mr-2">
                      THURSDAY : 13:00 - 16:00
                      </span>{" "}
                     
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                      WEDNESDAY  : 9:00 - 12:00
                      </span>{" "}
                     
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-gray text-white rounded-circle shadow">
                          <i className="ni ni-app" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                      WEDNESDAY  : 13:00 - 16:00
                      </span>{" "}
                     
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-pink text-white rounded-circle shadow">
                          <i className="ni ni-box-2" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-info mr-2">
                      FRIDAY  : 9:00 - 12:00
                      </span>{" "}
                     
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row >
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
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-calendar-grid-58" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-info mr-2">
                      FRIDAY  : 13:00 - 16:00
                      </span>{" "}
                     
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
