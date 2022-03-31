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

import "assets/scss/argon-dashboard/custom/UserHeader2.scss";

const UserHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [ClassRoom, setClassRoom] = useState({});
  const [Permission, setPermission] = useState(true);

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
            ClassRoom.ClassDate = ClassRoom.ClassDate.toUpperCase();
            setClassRoom(ClassRoom);
            setPermission(
              ClassRoom.Members.includes(currentUser._delegate.uid)
            );
            console.log(ClassRoom.Members.includes(currentUser._delegate.uid));
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

  if (Permission == false) {
    return <Redirect to="/student/student-home" />;
  }

  if (location.search.substring(1) == "") {
    return <Redirect to="/student/student-home" />;
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
        <Container className="d-flex align-items-center  subject-detail" fluid>
          <Row>
            <Col lg="7" md="10">
              <div className="mb-5 time-sec2">
                <span className="text-white">Section 2</span>
                <span className="text-white mt-0 subject-date-time">
                  {ClassRoom.ClassDate} {ClassRoom.StartTime} -{" "}
                  {ClassRoom.EndTime} A.M.
                </span>
              </div>
              <h1 className=" text-white subjectCode-userHeader">
                {ClassRoom.SubjectCode}
                <br />
              </h1>
              <h1 className="display-2 text-white subject-name">
                {ClassRoom.SubjectName}
              </h1>
              <div className="mb-5 time-sec">
                <span className="text-white">Section 2</span>
                <span className="text-white mt-0 subject-date-time">
                  {ClassRoom.ClassDate} {ClassRoom.StartTime} -{" "}
                  {ClassRoom.EndTime} A.M.
                </span>
              </div>
              <Button
                color="dark"
                href="#pablo"
                size="sm"
                className="edit-classroom"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Leave Classroom
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        size="sm"
      >
        <div className=" modal-header"></div>
        <ModalBody>
          {" "}
          <span className="font-weight-light confirm-leaveRoom text-center">
            Do you want to leave <br />
            <span className="font-weight-bold">CSS 111</span>
            &nbsp;
            <span className="font-weight-bold">Software Engineer</span>
            &nbsp; ?
          </span>
          <div className="col text-center mt-4">
            <Button
              color="success"
              href="#pablo"
              //onClick={() => setModalOpen1(!modalOpen1)}
              className="ml-2 mr-2 btn-confirm-leaveRoom"
              size="l"
            >
              Confirm
            </Button>
            <Button
              color="danger"
              href="#pablo"
              size="l"
              aria-label="Close"
              onClick={() => setModalOpen(!modalOpen)}
              className="ml-2 mr-2 btn-confirm-leaveRoom"
            >
              Cancel
            </Button>
          </div>{" "}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default UserHeader;
