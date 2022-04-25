import { useState, useEffect, useContext } from "react";
import firebaseApp from "../../firebase";
import { useLocation, Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
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
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  const [ClassRoom, setClassRoom] = useState({});
  const [Permission, setPermission] = useState(true);

  const [SubjectCode, setSubjectCode] = useState("");
  const [Section, setSection] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [ClassDate, setClassDate] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [AcademicYear, setAcademicYear] = useState("");
  const [Semester, setSemester] = useState("");

  const [SubjectCodeError, setSubjectCodeError] = useState("");
  const [SectionError, setSectionError] = useState("");
  const [SubjectNameError, setSubjectNameError] = useState("");
  const [ClassDateError, setClassDateError] = useState("");
  const [StartTimeError, setStartTimeError] = useState("");
  const [EndTimeError, setEndTimeError] = useState("");
  const [AcademicYearError, setAcademicYearError] = useState("");
  const [SemesterError, setSemesterError] = useState("");

  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
      firebaseApp.auth().onAuthStateChanged((user) => {
        const db = firebaseApp.firestore();
        const userCollection = db
          .collection("ClassRoom")
          .where("__name__", "==", location.search.substring(1));

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot((ss) => {
          // ตัวแปร local
          let ClassRoom;

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            ClassRoom = document.data();
          });

          // เปลี่ยนค่าตัวแปร state
          if (ClassRoom) {
            setClassRoom(ClassRoom);
            setPermission(ClassRoom.UId.includes(currentUser._delegate.uid));
            console.log(ClassRoom.UId.includes(currentUser._delegate.uid));
          }
          if (!ClassRoom) {
            setPermission(false);
          }
        });

        return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe();
        };
      });
    }
  }, []);

  const editclassroom = () => {
    setSubjectCode(ClassRoom.SubjectCode);
    setSection(ClassRoom.Section);
    setSubjectName(ClassRoom.SubjectName);
    setClassDate(ClassRoom.ClassDate);
    setStartTime(ClassRoom.StartTime);
    setEndTime(ClassRoom.EndTime);
    setAcademicYear(ClassRoom.AcademicYear);
    setSemester(ClassRoom.Semester);
    clearErrors();
    setModalOpen(!modalOpen);
  };

  const updateclassroom = async () => {
    clearErrors();
    ErrorsCheck();
    const db = firebaseApp.firestore();
    if (
      SubjectCode != "" &&
      Section != "" &&
      SubjectName != "" &&
      ClassDate != "" &&
      StartTime != "" &&
      EndTime != "" &&
      AcademicYear != "" &&
      Semester != ""
    ) {
      const res = await db
        .collection("ClassRoom")
        .doc(location.search.substring(1))
        .update({
          SubjectCode: SubjectCode,
          Section: Section,
          SubjectName: SubjectName,
          ClassDate: ClassDate,
          StartTime: StartTime,
          EndTime: EndTime,
          AcademicYear: AcademicYear,
          Semester: Semester,
        });
      setModalOpen(!modalOpen);
    }
  };

  function ErrorsCheck() {
    if (SubjectCode == "") setSubjectCodeError("Empty.");
    if (Section == "") setSectionError("Empty.");
    if (SubjectName == "") setSubjectNameError("Empty.");
    if (ClassDate == "") setClassDateError("Empty.");
    if (StartTime == "") setStartTimeError("Empty.");
    if (EndTime == "") setEndTimeError("Empty.");
    if (AcademicYear == "") setAcademicYearError("Empty.");
    if (Semester == "") setSemesterError("Empty.");
  }

  const clearErrors = () => {
    setSubjectCodeError("");
    setSectionError("");
    setSubjectNameError("");
    setClassDateError("");
    setStartTimeError("");
    setEndTimeError("");
    setAcademicYearError("");
    setSemesterError("");
  };

  if (Permission == false) {
    return <Redirect to="/professor/profile-home" />;
  }

  if (location.search.substring(1) == "") {
    return <Redirect to="/professor/profile-home" />;
  }

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
                <br />
              </h1>
              <h1 className="display-2 text-white subject-name">
                {ClassRoom.SubjectName}
              </h1>
              <div className="time-sec">
                <span className="text-white">Section {ClassRoom.Section}</span>
                <span className="text-white mt-0 subject-date-time">
                  {ClassRoom.ClassDate} {ClassRoom.StartTime} -{" "}
                  {ClassRoom.EndTime} A.M.
                </span>
              </div>

              
              <div className="time-sec">
                <span className="text-white"></span>
                <span className="text-white mt-0 subject-date-time">
                  {ClassRoom.ClassDate} {ClassRoom.StartTime} -{" "}
                  {ClassRoom.EndTime} A.M.
                </span>
              </div>


              <div className="row-button mt-4">
                  <Button
                    color="dark"
                    size="sm"
                    className="edit-classroom"
                    onClick={() => editclassroom()}
                  >
                    Edit Classroom
                  </Button>
                  
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light threedot-classroom"
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem 
                        onClick={() => setModalOpen2(!modalOpen2)}>
                        End Classroom
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => setModalOpen3(!modalOpen3)}>
                        Delete Classroom
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                
              </div>
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
                              <button class="btn-uploadCoverimg">
                                Select Cover Image
                              </button>
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
                                    <span className="text-red">*</span>
                                    &nbsp;
                                    <span className="text-red">
                                      {SubjectCodeError}
                                    </span>
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id=""
                                    placeholder="CSSxxx"
                                    type="text"
                                    value={SubjectCode}
                                    onChange={(e) =>
                                      setSubjectCode(e.target.value)
                                    }
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
                                    <span className="text-red">
                                      {SectionError}
                                    </span>
                                  </label>

                                  <Input
                                    className="form-control-alternative"
                                    type="text"
                                    placeholder="xxx"
                                    value={Section}
                                    onChange={(e) => setSection(e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="12">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Subject Name
                                    <span className="text-red">*</span>
                                    &nbsp;
                                    <span className="text-red">
                                      {SubjectNameError}
                                    </span>
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id=""
                                    placeholder="Software Engineer"
                                    value={SubjectName}
                                    onChange={(e) =>
                                      setSubjectName(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Academic Year
                                    <span className="text-red">*</span>
                                    &nbsp;
                                    <span className="text-red">
                                      {AcademicYearError}
                                    </span>
                                  </label>

                                  <Input
                                    className="form-control-alternative"
                                    id=""
                                    placeholder="Academic Year"
                                    type="number"
                                    min="1900"
                                    max="2099"
                                    step="1"
                                    value={AcademicYear}
                                    onChange={(e) =>
                                      setAcademicYear(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Semester
                                    <span className="text-red">*</span>
                                    &nbsp;
                                    <span className="text-red">
                                      {SemesterError}
                                    </span>
                                  </label>

                                  <Input
                                    className="form-control-alternative"
                                    type="select"
                                    placeholder="x"
                                    value={Semester}
                                    onChange={(e) =>
                                      setSemester(e.target.value)
                                    }
                                  >
                                    <option>1</option>
                                    <option>2</option>
                                  </Input>
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
                                    <span className="text-red">
                                      {ClassDateError}
                                    </span>
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    defaultValue="Lucky"
                                    id="input-first-name"
                                    placeholder="First name"
                                    type="select"
                                    value={ClassDate}
                                    onChange={(e) =>
                                      setClassDate(e.target.value)
                                    }
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
                                    <span className="text-red">
                                      {StartTimeError}
                                    </span>
                                  </label>
                                  <input
                                    type="time"
                                    name="time"
                                    className="form-control-alternative form-time"
                                    value={StartTime}
                                    onChange={(e) =>
                                      setStartTime(e.target.value)
                                    }
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
                                    <span className="text-red">
                                      {EndTimeError}
                                    </span>
                                  </label>
                                  <input
                                    type="time"
                                    name="time"
                                    className="form-control-alternative form-time"
                                    value={EndTime}
                                    onChange={(e) => setEndTime(e.target.value)}
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
                                    onChange={(e) => setClassDate(e.target.value)}
                                  >
                                    <option selected hidden>---------</option>
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
                            <Row className="box-add-date-btn mb-5">
                              <Button className="add-date-btn"
                              color="dark">
                                <i class="fa-solid fa-plus"/> &nbsp;
                                Add class date and time
                              </Button>
                            </Row>
                          </div>

                          <div className="text-center">
                            <Button
                              className="mt-2 button-modal-detailClassroom"
                              color="dark"
                              onClick={() => updateclassroom()}
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
              <Modal
                  toggle={() => setModalOpen2(!modalOpen2)}
                  isOpen={modalOpen2}
                  size="sm"
                >
                  <div className=" modal-header"></div>
                  <ModalBody className="question-box">
                    {" "}
                    <span className="font-weight-bold confirm-leaveRoom text-center ">
                      Do you want to end this classroom ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        // onClick={() => leaveclassroom()}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                        size="l"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen2(!modalOpen2)}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen3(!modalOpen3)}
                  isOpen={modalOpen3}
                  size="sm"
                >
                  <div className=" modal-header"></div>
                  <ModalBody className="question-box">
                    {" "}
                    <span className="font-weight-bold confirm-leaveRoom text-center ">
                      Do you want to delete this classroom ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        // onClick={() => leaveclassroom()}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                        size="l"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen3(!modalOpen3)}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
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
