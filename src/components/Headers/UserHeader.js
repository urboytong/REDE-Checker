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
  const [Date, setDate] = useState([]);
  const [CoverImage, setCoverImage] = useState("https://res.cloudinary.com/daxwfdlwj/image/upload/v1653629566/CoverImage/KMUTT01_mxtvzp.jpg");

  const [SubjectCode, setSubjectCode] = useState("");
  const [Section, setSection] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [AcademicYear, setAcademicYear] = useState("");
  const [Semester, setSemester] = useState("");
  const [DateTime, setDateTime] = useState([]);

  const [SubjectCodeError, setSubjectCodeError] = useState("");
  const [SectionError, setSectionError] = useState("");
  const [SubjectNameError, setSubjectNameError] = useState("");
  const [AcademicYearError, setAcademicYearError] = useState("");
  const [SemesterError, setSemesterError] = useState("");
  const [DateTimeError, setDateTimeError] = useState("");

  const [ImageCover, setImageCover] = useState();
  const [ImageCoverURL, setImageCoverURL] = useState();

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
          if (ClassRoom.DateTime) {
            setDate(ClassRoom.DateTime);
          }
          if (ClassRoom) {
            setClassRoom(ClassRoom);
            if(ClassRoom.CoverImage != undefined){              
              if(ClassRoom.CoverImage != ""){
                setCoverImage(ClassRoom.CoverImage);
              }
            }
            setPermission(ClassRoom.UId.includes(currentUser._delegate.uid));
            //console.log(ClassRoom.UId.includes(currentUser._delegate.uid));
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
  }, [DateTime]);

  const editclassroom = () => {
    setImageCoverURL(ClassRoom.CoverImage)
    setSubjectCode(ClassRoom.SubjectCode);
    setSection(ClassRoom.Section);
    setSubjectName(ClassRoom.SubjectName);
    setAcademicYear(ClassRoom.AcademicYear);
    setSemester(ClassRoom.Semester);
    setDateTime(ClassRoom.DateTime);
    clearErrors();
    setModalOpen(!modalOpen);
  };

  const uploadcover = (file) => {
    setImageCover(file);
    setImageCoverURL(URL.createObjectURL(file))
  };

  const updateclassroom = async () => {
    clearErrors();
    let dt = DateTime;
    let count = 0;
    for (let i = 0; i < dt.length; i++) {
      if (dt[i].Date == "") {
        count++;
      }
      if (dt[i].StartTime == "") {
        count++;
      }
      if (dt[i].EndTime == "") {
        count++;
      }
    }
    ErrorsCheck(count);
    const db = firebaseApp.firestore();
    if (
      SubjectCode != "" &&
      Section != "" &&
      SubjectName != "" &&
      count == 0 &&
      AcademicYear != "" &&
      Semester != ""
    ) {
      let coverimage = CoverImage
      if(ImageCoverURL != CoverImage){
        const files = ImageCover;
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", "CoverImage_images");
        const res = await fetch(
          "	https://api.cloudinary.com/v1_1/daxwfdlwj/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        //เปลี่ยน setIimage เป็น setImage เพื่อเก็บ url โดยตรง
        coverimage = file.secure_url;
      }
      const res = await db
        .collection("ClassRoom")
        .doc(location.search.substring(1))
        .update({
          SubjectCode: SubjectCode,
          Section: Section,
          SubjectName: SubjectName,
          DateTime: DateTime,
          AcademicYear: AcademicYear,
          Semester: Semester,
          CoverImage: coverimage
        });
      setModalOpen(!modalOpen);
    }
  };

  function ErrorsCheck(count) {
    if (SubjectCode == "") setSubjectCodeError("Empty.");
    if (Section == "") setSectionError("Empty.");
    if (SubjectName == "") setSubjectNameError("Empty.");
    if (AcademicYear == "") setAcademicYearError("Empty.");
    if (Semester == "") setSemesterError("Empty.");
    if (count != 0) setDateTimeError("All dates and times must not be empty.");
  }

  const clearErrors = () => {
    setSubjectCodeError("");
    setSectionError("");
    setSubjectNameError("");
    setAcademicYearError("");
    setSemesterError("");
    setDateTimeError("");
  };

  const adddatetime = () => {
    setDateTime((DateTime) => [
      ...DateTime,
      { Date: "Monday", StartTime: "", EndTime: "" },
    ]);
  };

  const deletedatetime = (index) => {
    let test = DateTime;
    test.splice(index, 1);
    //console.log(test)
    setDateTime((DateTime) => [...test]);
  };

  const dateupdate = (val, id) => {
    let test = [...DateTime];
    test[id].Date = val;
    setDateTime(test);
  };

  const starttimeupdate = (val, id) => {
    let test = DateTime;
    test[id].StartTime = val;
    setDateTime((DateTime) => [...test]);
  };

  const endtimeupdate = (val, id) => {
    let test = DateTime;
    test[id].EndTime = val;
    setDateTime((DateTime) => [...test]);
  };

  const deleteclassroom = () => {
    setPermission(false);
    const db = firebaseApp.firestore();
    const userCollection = db.collection("ClassRoom");

    const documentRef = userCollection.doc(location.search.substring(1));

    documentRef.delete();

    setInterval(() => {
      window.location.reload();
    }, 500);
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
          backgroundImage: "url("+CoverImage+")",
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
              <Row className="time-sec">
                <Col className="text-white">Section {ClassRoom.Section}</Col>
                <Col className="text-white mt-0 subject-date-time">
                  <Row className="subject-date-time">
                    {Object.keys(Date).map((id) => {
                      return (
                          <div>
                            {Date[id].Date} {Date[id].StartTime} - {Date[id].EndTime}{" "}
                          </div>
                      );
                    })}
                  </Row>
                </Col>
              </Row>

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
                    {/*<DropdownItem 
                        onClick={() => setModalOpen2(!modalOpen2)}>
                        End Classroom
                      </DropdownItem>*/}
                    <DropdownItem onClick={() => setModalOpen3(!modalOpen3)}>
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
                              <input type="file" name="myfile" onChange={(e) => uploadcover(e.target.files[0])}/>
                            </div>
                          </Col>
                        </Row>
                        {!ImageCoverURL == "" ? (<img src={ImageCoverURL} style={{width: "100%", height: "300px"}} className="shadow-imgLeave"/>) : null}
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
                                    className="form-control-label subject-name-box"
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
                            {Object.keys(DateTime).map((id) => {
                              return (
                                <Row>
                                  <Col lg="4">
                                    <FormGroup>
                                      <label className="form-control-label">
                                        Class Date
                                        <span className="text-red">*</span>
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        defaultValue="Lucky"
                                        id="input-first-name"
                                        placeholder="First name"
                                        type="select"
                                        value={DateTime[id].Date}
                                        onChange={(e) =>
                                          dateupdate(e.target.value, id)
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
                                  <Col lg="3">
                                    <FormGroup>
                                      <label className="form-control-label">
                                        Start time
                                        <span className="text-red">*</span>
                                      </label>
                                      <input
                                        type="time"
                                        name="time"
                                        className="form-control-alternative form-time"
                                        value={DateTime[id].StartTime}
                                        onChange={(e) =>
                                          starttimeupdate(e.target.value, id)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="3">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-last-name"
                                      >
                                        End time
                                        <span className="text-red">*</span>
                                      </label>
                                      <input
                                        type="time"
                                        name="time"
                                        className="form-control-alternative form-time"
                                        value={DateTime[id].EndTime}
                                        onChange={(e) =>
                                          endtimeupdate(e.target.value, id)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="2" className="col-bin">
                                    <label>&nbsp;&nbsp;&nbsp;</label>
                                    {DateTime.length > 1 ? (
                                      <Button
                                        onClick={(e) => deletedatetime(id)}
                                        className="btn-bin"
                                      >
                                        <i class="fa-solid fa-trash"/>
                                      </Button>
                                    ) : null}
                                  </Col>
                                </Row>
                              );
                            })}
                            <h4 className="text-red text-center">
                              {DateTimeError}
                            </h4>
                            <Row className="box-add-date-btn mb-5">
                              {DateTime.length < 5 ? (
                                <Button
                                  className="add-date-btn"
                                  color="dark"
                                  onClick={(e) => adddatetime()}
                                >
                                  <i class="fa-solid fa-plus" /> &nbsp; Add
                                  class date and time
                                </Button>
                              ) : null}
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
                      onClick={() => deleteclassroom()}
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
