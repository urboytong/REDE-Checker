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
import { useState, useEffect, useContext } from "react";
import firebaseApp from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
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
import { async } from "@firebase/util";

const Profile = ({ modalOpen, setModalOpen, modalOpen1, setModalOpen1 }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalOpen1, setModalOpen1] = useState(false);
  const [TeacherRoleForm, setTeacherRoleForm] = useState(false);
  const [StudentRoleForm, setStudentRoleForm] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [AcademicRanks, setAcademicRanks] = useState("");
  const [Faculty, setFaculty] = useState("");
  const [Department, setDepartment] = useState("");
  const [Major, setMajor] = useState("");
  const [StudentID, setStudentID] = useState("");
  const [{ country, state }, setData] = useState({
    country: "",
    state: "",
  });
  const countriesData = [
    {
      name: "Chemistry",
      states: ["Chemistry"],
    },
    {
      name: "Mathematics",
      states: ["Applied Computer Science", "Mathematics", "Statistics"],
    },
    {
      name: "Microbiology",
      states: ["Food Science and Technology", "Microbiology"],
    },
    {
      name: "Physics",
      states: ["Physics"],
    },
  ];

  const [FirstNameError, setFirstNameError] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [AcademicRanksError, setAcademicRanksError] = useState("");
  const [FacultyError, setFacultyError] = useState("");
  const [DepartmentError, setDepartmentError] = useState("");
  const [MajorError, setMajorError] = useState("");
  const [StudentIDError, setStudentIDError] = useState("");

  const [User, setUser] = useState({});
  const [UserDocID, setUserDocID] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
      firebaseApp.auth().onAuthStateChanged((user) => {
        const db = firebaseApp.firestore();
        const userCollection = db
          .collection("User")
          .where("Uid", "==", firebaseApp.auth().currentUser.uid);

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot((ss) => {
          // ตัวแปร local
          let User = {};

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            User = document.data();
            setUserDocID(document.id);
          });

          // เปลี่ยนค่าตัวแปร state
          setUser(User);
        });

        return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe();
        };
      });
    }
  }, []);

  const editprofile = () => {
    if (User.role == "Student") {
      setStudentRoleForm(true);
    }
    if (User.role == "Teacher1") {
      setTeacherRoleForm(true);
    }
    setAcademicRanks(User.AcademicRanks);
    setFirstName(User.FirstName);
    setLastName(User.LastName);
    setFaculty("Science");
    //setDepartment(User.Department);
    //setMajor(User.Major);
    setStudentID(User.StudentID);
    setData({ country: User.Department, state: User.Major });
    clearErrors();
    setModalOpen1(!modalOpen1);
  };

  const updateprofile = async () => {
    clearErrors();
    ErrorsCheck();
    const db = firebaseApp.firestore();
    if (User.role == "Student") {
      if (
        FirstName !== "" &&
        LastName !== "" &&
        StudentID !== "" &&
        Faculty !== "" &&
        country !== "" &&
        state !== ""
      ) {
        const res = await db.collection("User").doc(UserDocID).update({
          FirstName: FirstName,
          LastName: LastName,
          StudentID: StudentID,
          Faculty: Faculty,
          Department: country,
          Major: state,
        });
        setModalOpen1(!modalOpen1);
      }
    }
    if (User.role == "Teacher1") {
      if (
        FirstName !== "" &&
        LastName !== "" &&
        AcademicRanks !== "" &&
        Faculty !== "" &&
        country !== "" &&
        state !== ""
      ) {
        const res = await db.collection("User").doc(UserDocID).update({
          AcademicRanks: AcademicRanks,
          FirstName: FirstName,
          LastName: LastName,
          Faculty: Faculty,
          Department: country,
          Major: state,
        });
        setModalOpen1(!modalOpen1);
      }
    }
  };

  function ErrorsCheck() {
    if (FirstName == "") setFirstNameError("Must not be empty.");
    if (LastName == "") setLastNameError("Must not be empty.");
    if (AcademicRanks == "") setAcademicRanksError("Must not be empty.");
    if (Faculty == "") setFacultyError("Must not be empty.");
    if (country == "") setDepartmentError("Must not be empty.");
    if (state == "") setMajorError("Must not be empty.");
    if (StudentID == "") setStudentIDError("Must not be empty.");
  }

  const clearErrors = () => {
    setFirstNameError("");
    setLastNameError("");
    setAcademicRanksError("");
    setFacultyError("");
    setDepartmentError("");
    setMajorError("");
    setStudentIDError("");
  };

  const countries = countriesData.map((country) => (
    <option key={country.name} value={country.name}>
      {country.name}
    </option>
  ));

  const states = countriesData
    .find((item) => item.name === country)
    ?.states.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ));

  function handleCountryChange(event) {
    setData((data) => ({
      ...data,
      state: event.target.value,
      country: event.target.value,
    }));
  }

  function handleStateChange(event) {
    setData((data) => ({ ...data, state: event.target.value }));
  }

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
                    <a onClick={(e) => e.preventDefault()}>
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
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 cardHead-myProfile"></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                      <div>
                        <h2 className="heading">{User.StudentID}</h2>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h2>
                    {User.FirstName} {User.LastName}
                  </h2>
                  <div className="h3 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {User.Faculty}, {User.Department}
                    <br /> {User.Major}
                  </div>
                  <Button
                    color="primary"
                    size="sm"
                    className="edit-profile"
                    onClick={() => editprofile()}
                  >
                    Edit Profile
                  </Button>
                  <hr className="my-4" />
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {User.Email}
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
                          <i class="fas fa-pencil-alt penIcon"></i>
                        </button>
                        <input type="file" name="myfile" />
                      </div>
                    </div>
                  </div>
                  <Form role="form" className="formTeacher">
                    {TeacherRoleForm ? (
                      <div className="topicForm">
                        Academic Ranks<span className="text-red">*</span>
                      </div>
                    ) : null}
                    {TeacherRoleForm ? (
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            className="darkGray"
                            type="select"
                            placeholder="Academic Ranks"
                            value={AcademicRanks}
                            onChange={(e) => setAcademicRanks(e.target.value)}
                          >
                            <option>Assoc. Prof.</option>
                            <option>Asst. Prof.</option>
                            <option>Dr.</option>
                            <option>Instructor</option>
                            <option>Prof.</option>
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    ) : null}
                    <div className="topicForm lightGray">
                      First Name
                      <span className="text-red">*</span>
                      &nbsp;
                      <span className="text-red">{FirstNameError}</span>
                    </div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          onKeyPress={(e) => {
                            if (
                              (e.key.toLowerCase() >= " " &&
                                e.key.toLowerCase() <= "`") ||
                              (e.key.toLowerCase() >= "{" &&
                                e.key.toLowerCase() <= "~")
                            ) {
                              e.preventDefault();
                            }
                          }}
                          value={FirstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="darkGray width-field"
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">
                      Last Name
                      <span className="text-red">*</span>
                      &nbsp;
                      <span className="text-red">{LastNameError}</span>
                    </div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          onKeyPress={(e) => {
                            if (
                              (e.key.toLowerCase() >= " " &&
                                e.key.toLowerCase() <= "`") ||
                              (e.key.toLowerCase() >= "{" &&
                                e.key.toLowerCase() <= "~")
                            ) {
                              e.preventDefault();
                            }
                          }}
                          value={LastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="darkGray"
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>

                    {StudentRoleForm ? (
                      <div className="topicForm lightGray">
                        Student ID
                        <span className="text-red">*</span>
                        &nbsp;
                        <span className="text-red">{StudentIDError}</span>
                      </div>
                    ) : null}
                    {StudentRoleForm ? (
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            onKeyPress={(e) => {
                              if (
                                (e.key.toLowerCase() >= " " &&
                                  e.key.toLowerCase() <= "/") ||
                                (e.key.toLowerCase() >= ":" &&
                                  e.key.toLowerCase() <= "~")
                              ) {
                                e.preventDefault();
                              }
                            }}
                            value={StudentID}
                            onChange={(e) => setStudentID(e.target.value)}
                            className="darkGray"
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>
                    ) : null}

                    <div className="topicForm lightGray">
                      Faculty
                      <span className="text-red">*</span>
                      &nbsp;
                      <span className="text-red">{FacultyError}</span>
                    </div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          className="darkGray"
                          type="select"
                          placeholder="Faculty"
                          value={Faculty}
                          onChange={(e) => setFaculty(e.target.value)}
                        >
                          <option>Science</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">
                      Department
                      <span className="text-red">*</span>
                      &nbsp;
                      <span className="text-red">{DepartmentError}</span>
                    </div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          className="darkGray"
                          type="select"
                          placeholder="Department"
                          value={country}
                          onChange={handleCountryChange}
                        >
                          {countries}
                        </Input>
                      </InputGroup>
                    </FormGroup>

                    <div className="topicForm lightGray">
                      Major
                      <span className="text-red">*</span>
                      &nbsp;
                      <span className="text-red">{MajorError}</span>
                    </div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          className="darkGray"
                          type="select"
                          placeholder="Major"
                          value={state}
                          onChange={handleStateChange}
                        >
                          {states}
                        </Input>
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center lightGray">
                      <Button
                        className="mt-4 buttonStyle"
                        color="primary"
                        type="button"
                        onClick={() => updateprofile()}
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
