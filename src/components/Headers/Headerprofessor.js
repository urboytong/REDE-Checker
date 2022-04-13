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
import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

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

  const [SubjectCode, setSubjectCode] = useState("");
  const [Section, setSection] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [ClassDate, setClassDate] = useState("Monday");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");

  const [SubjectCodeError, setSubjectCodeError] = useState("");
  const [SectionError, setSectionError] = useState("");
  const [SubjectNameError, setSubjectNameError] = useState("");
  const [ClassDateError, setClassDateError] = useState("");
  const [StartTimeError, setStartTimeError] = useState("");
  const [EndTimeError, setEndTimeError] = useState("");

  const db = firebaseApp.firestore();
  const userCollection = db.collection("ClassRoom");

  const [ClassRoom, setClassRoom] = useState({});
  const [DaysColor, setDaysColor] = useState({
    Monday: "#FFF5BA",
    Tuesday: "#ecd6e3",
    Wednesday: "#97c1a9",
    Thursday: "#ffc7a2",
    Friday: "#acdee7",
    Saturday: "#ccaacb",
    Sunday: "#ff9689",
  });

  const history = useHistory();

  const routeChange = (e) => {
    history.push({
      pathname: "/professor/profile-home/profile-class",
      search: e,
      state: { detail: e },
    });
  };

  const ModalOpens = () => {
    clearErrors();
    setModalOpen(!modalOpen);
  };

  async function CreateClass() {
    clearErrors();
    ErrorsCheck();
    let UId = firebaseApp.auth().currentUser.uid;
    let members = [];
    let request = [];
    if (
      SubjectCode != "" &&
      Section != "" &&
      SubjectName != "" &&
      ClassDate != "" &&
      StartTime != "" &&
      EndTime != ""
    ) {
      const documentRef = await userCollection.add({
        SubjectCode,
        Section,
        SubjectName,
        ClassDate,
        StartTime,
        EndTime,
        UId,
        Members: members,
        Request: request,
      });
      setModalOpen(!modalOpen);
    }

    //console.log(`new document has been inserted as ${documentRef.id}`);
  }

  function ErrorsCheck() {
    if (SubjectCode == "") setSubjectCodeError("Empty.");
    if (Section == "") setSectionError("Empty.");
    if (SubjectName == "") setSubjectNameError("Empty.");
    if (ClassDate == "") setClassDateError("Empty.");
    if (StartTime == "") setStartTimeError("Empty.");
    if (EndTime == "") setEndTimeError("Empty.");
  }

  const clearErrors = () => {
    setSubjectCodeError("");
    setSectionError("");
    setSubjectNameError("");
    setClassDateError("");
    setStartTimeError("");
    setEndTimeError("");
  };

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    if (firebaseApp.auth().currentUser) {
      firebaseApp.auth().onAuthStateChanged((user) => {
        const db = firebaseApp.firestore();
        const userCollection = db
          .collection("ClassRoom")
          .where("UId", "==", firebaseApp.auth().currentUser.uid);

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot((ss) => {
          // ตัวแปร local
          const ClassRoom = [];
          let count = 0;

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            ClassRoom[count] = document.data();
            ClassRoom[count].key = document.id;
            ClassRoom[count].daycolor = DaysColor[ClassRoom[count].ClassDate];
            count++;
          });

          // เปลี่ยนค่าตัวแปร state
          ClassRoom.sort((a, b) =>
            a.SubjectCode > b.SubjectCode
              ? 1
              : b.SubjectCode > a.SubjectCode
              ? -1
              : 0
          );
          setClassRoom(ClassRoom);
          console.log(ClassRoom);
        });

        return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe();
        };
      });
    }
  }, []);

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
                    <div class="upload-btn-wrapper text-center">
                      <button class="btn-uploadCoverimg">
                        Select Cover Image
                      </button>
                      <input type="file" name="myfile" />
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {/*<Form>*/}
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
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{SubjectCodeError}</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          id=""
                          placeholder="CSS xxx"
                          type="text"
                          onChange={(e) => setSubjectCode(e.target.value)}
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
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{SectionError}</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          type="text"
                          placeholder="xxx"
                          onChange={(e) => setSection(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label className="form-control-label">
                          Subject Name
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{SubjectNameError}</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          id=""
                          placeholder="Software Engineer"
                          onChange={(e) => setSubjectName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label className="form-control-label">
                          Class Date
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{ClassDateError}</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="Lucky"
                          id="input-first-name"
                          placeholder="First name"
                          type="select"
                          onChange={(e) => setClassDate(e.target.value)}
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
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{StartTimeError}</span>
                        </label>
                        <input
                          type="time"
                          name="time"
                          className="form-control-alternative form-time"
                          onChange={(e) => setStartTime(e.target.value)}
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
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{EndTimeError}</span>
                        </label>
                        <input
                          type="time"
                          name="time"
                          className="form-control-alternative form-time"
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <div className="text-center">
                  <Button
                    className="mt-2 button-modal-detailClassroom"
                    color="dark"
                    onClick={(e) => CreateClass()}
                  >
                    Create Classroom
                  </Button>
                </div>
                {/*</Form>*/}
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 bg-home">
        <Container fluid>
          <div className="header-body">
            <div className="text-right">
              <Button
                className="mt-4"
                color="dark"
                onClick={() => ModalOpens()}
              >
                Create Classroom
              </Button>
            </div>
            <Row className="mt-4">
              {Object.keys(ClassRoom).map((id) => {
                return (
                  <Col lg="6" xl="3">
                    <Card
                      className="card-stats mb-4 mb-xl-0"
                      onClick={() => routeChange(ClassRoom[id].key)}
                    >
                      <CardBody className="subject-card">
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0 home-subjectName"
                            >
                              {ClassRoom[id].SubjectName}
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {ClassRoom[id].SubjectCode}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div
                              className="icon icon-shape text-white rounded-circle shadow circle-day"
                              style={{
                                backgroundColor: ClassRoom[id].daycolor,
                              }}
                            ></div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="mr-2">
                            {" "}
                            {ClassRoom[id].ClassDate} :{" "}
                            {ClassRoom[id].StartTime} - {ClassRoom[id].EndTime}
                          </span>
                          <span className="mr-2 section">
                            Sec : {ClassRoom[id].Section}
                          </span>{" "}
                        </p>
                      </CardBody>
                    </Card>
                    &nbsp;
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header2;
