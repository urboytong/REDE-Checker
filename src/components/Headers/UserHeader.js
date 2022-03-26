import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase";
import { useLocation } from "react-router-dom";
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

import "assets/scss/argon-dashboard/custom/UserHeader.scss";

const UserHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [ClassRoom, setClassRoom] = useState({});

  const location = useLocation();

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged(user => {
        const db = firebaseApp.firestore()
        const userCollection = db.collection('ClassRoom').where('__name__' , '==' , location.search.substring(1))       
    
      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot(ss => {
          // ตัวแปร local
          let ClassRoom

          ss.forEach(document => {
              // manipulate ตัวแปร local
              ClassRoom = document.data()
          })

          // เปลี่ยนค่าตัวแปร state
          ClassRoom.ClassDate = ClassRoom.ClassDate.toUpperCase()
          setClassRoom(ClassRoom)
          console.log(ClassRoom)
      })

      return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe()
      }
      });
  }, [])

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
              <h1 className=" text-white">
              {ClassRoom.SubjectCode}
                <br/>
              </h1>
              <h1 className="display-2 text-white subject-name">
                {ClassRoom.SubjectName}
              </h1>
              <div className="mb-5 time-sec">
                <span className="text-white">
                Section 2
                </span>
                <span className="text-white mt-0 subject-date-time">
                  {ClassRoom.ClassDate} {ClassRoom.StartTime} - {ClassRoom.EndTime} A.M.
                </span>
              </div>
              
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
                              <Col lg="6">
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
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Section
                                  </label>

                                  <Input
                                    className="form-control-alternative"
                                    type="text"
                                    placeholder="xxx"
                                    // onChange={(e) => setSubjectCode(e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              </Row>
                              <Row>
                              <Col lg="12">
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
