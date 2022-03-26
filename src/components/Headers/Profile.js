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

const Profile = ({modalOpen,setModalOpen,modalOpen1,setModalOpen1}) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalOpen1, setModalOpen1] = useState(false);
  return (
    <>
    
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
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
        <ModalBody className="profileModal">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle img-profileModal"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                      <div>
                        <h2 className="heading">61090500411</h2>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h2>Natthaphat Wannawat</h2>
                  <div className="h3 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Science, Mathematics
                  </div>
                  <Button
                    color="dark"
                    href="#pablo"
                    size="sm"
                    className="edit-profile"
                    onClick={() => setModalOpen1(!modalOpen1)}
                  >
                    Edit Profile
                  </Button>
                  <hr className="my-4" />
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Natthaphat.tong@mail.kmutt.ac.th
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter className="footer-none"></ModalFooter>
      </Modal>

      <Modal
        toggle={() => setModalOpen1(!modalOpen1)}
        isOpen={modalOpen1}
        size="sm"
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
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Edit Profile</h3>
              </CardHeader>
              <CardBody>
                <div className="teacher">
                  <div className="uploadImage">
                    <div className="image2">
                      <img
                        alt="..."
                        className="rounded-circle img-profileModal2"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </div>
                    <div className="boxButton">
                      <div class="upload-btn-wrapper text-center">
                        <button class="btn-uploadFile-imgProfile">
                        <i class="fas fa-pencil-alt penIcon"></i></button>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                  </div>
                  <Form role="form" className="formTeacher">
                    <div className="topicForm">Academic Ranks</div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          className="darkGray"
                          type="select"
                          placeholder="Academic Ranks"
                        >
                          <option>Assoc. Prof.</option>
                          <option>Asst. Prof.</option>
                          <option>Dr.</option>
                          <option>Instructor</option>
                          <option>Prof.</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">First Name</div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input className="darkGray" type="text" />
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">Last Name</div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input className="darkGray" type="text" />
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">Faculty</div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          className="darkGray"
                          type="select"
                          placeholder="Faculty"
                        >
                          <option>College of Multidisciplinary Science</option>
                          <option>
                            Darunsikkhalai School of Innovation Learning
                          </option>
                          <option>Engineering</option>
                          <option>Engineering Science Classroom</option>
                          <option>
                            Graduate School of Management and Innovation
                          </option>
                          <option>Industrial Education and Technology</option>
                          <option>Institute of Field Robotics</option>
                          <option>KOSEN KMUTT</option>
                          <option>School of Architecture and Design</option>
                          <option>School of Bioresources and Technology</option>
                          <option>
                            School of Energy, Environment and Materials
                          </option>
                          <option>School of Information Technology</option>
                          <option>School of Liberal Arts</option>
                          <option>Science</option>
                          <option>
                            The Joint Graduate School of Energy and Environment
                          </option>
                        </Input>
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">Department</div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input className="darkGray" type="text" />
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">Major</div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input className="darkGray" type="text" />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center lightGray">
                      <Button
                        className="mt-4 buttonStyle"
                        color="dark"
                        type="button"
                      >
                        SAVE
                      </Button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default Profile;
