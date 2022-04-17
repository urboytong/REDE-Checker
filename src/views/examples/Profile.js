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
//test punch22
// reactstrap components
import React, { useState, useEffect, useRef } from "react";
import firebaseApp from "../../firebase";
import { useLocation } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import Draggable from "react-draggable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Badge,
  Card,
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
import "assets/scss/argon-dashboard/custom/profile.scss";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { async } from "@firebase/util";

const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);
  const [modalOpen6, setModalOpen6] = useState(false);
  const [modalOpen7, setModalOpen7] = useState(false);
  const [modalOpen8, setModalOpen8] = useState(false);
  const [modalOpen9, setModalOpen9] = useState(false);
  const [modalOpen11, setModalOpen11] = useState(false);
  const [modalOpen12, setModalOpen12] = useState(false);
  const [modalOpen13, setModalOpen13] = useState(false);
  const [modalOpen14, setModalOpen14] = useState(false);
  const [modalOpen15, setModalOpen15] = useState(false);
  const [copiedText, setCopiedText] = useState();

  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();

  const [ClassRoom, setClassRoom] = useState({});
  const [Request, setRequest] = useState({});
  const [EmptyRequest, setEmptyRequest] = useState(false);
  const [Members, setMembers] = useState({});
  const [CurrentRequestProfile, setCurrentRequestProfile] = useState({});

  const [ObjectSelect, setObjectSelect] = useState("");
  const [CountdownTime, setCountdownTime] = useState("");
  const [FaceBoxposition, setFaceBoxposition] = useState({ x: 165, y: 250 });
  const [ObjectBoxposition, setObjectBoxposition] = useState({
    x: 480,
    y: 250,
  });
  const [CurrentQuest, setCurrentQuest] = useState({});
  const [StartTime, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();
  const [Countdown, setCountdown] = useState();
  const [CountdownSec, setCountdownSec] = useState();

  const [ObjectSelectError, setObjectSelectError] = useState("");
  const [CountdownTimeError, setCountdownTimeError] = useState("");

  const [NotOnQuest, setNotOnQuest] = useState(false);
  const [OnQuest, setOnQuest] = useState(false);

  const location = useLocation();

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged((user) => {
      const db = firebaseApp.firestore();
      const userCollection = db
        .collection("ClassRoom")
        .where("__name__", "==", location.search.substring(1));

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot((ss) => {
        // ตัวแปร local
        let ClassRoom = {};

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          ClassRoom = document.data();
        });

        // เปลี่ยนค่าตัวแปร state
        setClassRoom(ClassRoom);

        const userCollection = db.collection("User");

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot((ss) => {
          // ตัวแปร local
          let request = {};
          let members = [];
          let count = 0;

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            if (ClassRoom.Request.includes(document.data().Uid)) {
              request[document.id] = document.data();
            }
            if (ClassRoom.Members.includes(document.data().Uid)) {
              members[count] = document.data();
              members[count].key = document.id;
              count++;
            }
          });

          // เปลี่ยนค่าตัวแปร state
          setRequest(request);
          members.sort((a, b) =>
            a.StudentID > b.StudentID ? 1 : b.StudentID > a.StudentID ? -1 : 0
          );
          console.log(Object.keys(request).length);
          if (Object.keys(request).length == 0) {
            setEmptyRequest(true);
          }
          if (Object.keys(request).length != 0) {
            setEmptyRequest(false);
          }
          setMembers(members);

          return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            unsubscribe();
          };
        });
      });

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe();
      };
    });
  }, []);

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged((user) => {
      const db = firebaseApp.firestore();
      const userCollection = db
        .collection("Quest")
        .where("ClassRoomId", "==", location.search.substring(1));

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot((ss) => {
        // ตัวแปร local
        let CurrentQuest = {};

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          if (document.data().EndTimeStamp >= Date.now()) {
            CurrentQuest = document.data();
            CurrentQuest.DocId = document.id;
          }
        });

        // เปลี่ยนค่าตัวแปร state
        setCurrentQuest(CurrentQuest);
        const startdate = new Date(CurrentQuest.StartTimeStamp);
        const enddate = new Date(CurrentQuest.EndTimeStamp);
        setStartTime(startdate.toLocaleString("en-GB"));
        setEndTime(enddate.toLocaleString("en-GB"));

        if (Object.keys(CurrentQuest).length != 0) {
          setOnQuest(true);
          setNotOnQuest(false);
        }
        if (Object.keys(CurrentQuest).length == 0) {
          setOnQuest(false);
          setNotOnQuest(true);
        }
      });

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe();
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() > CurrentQuest.EndTimeStamp) {
        setOnQuest(false);
        setNotOnQuest(true);
      }
      setCountdown(
        millisToMinutesAndSeconds(CurrentQuest.EndTimeStamp - Date.now())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [millisToMinutesAndSeconds(CurrentQuest.EndTimeStamp - Date.now())]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const ProfileModalOpens = (requestinfo) => {
    setModalOpen2(!modalOpen2);
    setCurrentRequestProfile(requestinfo);
  };

  const ReportModalOpens = (requestinfo) => {
    setModalOpen3(!modalOpen3);
    setCurrentRequestProfile(requestinfo);
  };

  const DeleteModalOpens = (requestinfo) => {
    setModalOpen4(!modalOpen4);
    setCurrentRequestProfile(requestinfo);
  };

  const DeleteMember = async (id) => {
    const db = firebaseApp.firestore();
    let MemberList = ClassRoom.Members;
    var myIndex = MemberList.indexOf(id);
    if (myIndex !== -1) {
      MemberList.splice(myIndex, 1);
    }
    const res = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Members: MemberList,
      });
    setModalOpen4(!modalOpen4);
  };

  const accept = async (id) => {
    const db = firebaseApp.firestore();
    let RequestList = ClassRoom.Request;
    var myIndex = RequestList.indexOf(id);
    if (myIndex !== -1) {
      RequestList.splice(myIndex, 1);
    }
    const res = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Request: RequestList,
      });
    let MemberList = ClassRoom.Members;
    MemberList.push(id);
    const res2 = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Members: MemberList,
      });
  };

  const refuse = async (id) => {
    const db = firebaseApp.firestore();
    let RequestList = ClassRoom.Request;
    var myIndex = RequestList.indexOf(id);
    if (myIndex !== -1) {
      RequestList.splice(myIndex, 1);
    }
    const res = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Request: RequestList,
      });
  };

  const cancelquest = () => {
    const db = firebaseApp.firestore();
    const userCollection = db.collection("Quest");

    const documentRef = userCollection.doc(CurrentQuest.DocId);

    documentRef.delete();

    setModalOpen15(!modalOpen15);
  };

  const FacetrackPos = (data) => {
    setFaceBoxposition({ x: data.x + 110, y: data.y + 110 });
  };
  const ObjecttrackPos = (data) => {
    setObjectBoxposition({ x: data.x + 110, y: data.y + 110 });
  };

  async function SendQuest() {
    clearErrors();
    ErrorsCheck();
    let UId = firebaseApp.auth().currentUser.uid;
    let ClassRoomId = location.search.substring(1);
    let Complete = [];
    let Absent = [];
    let Leave = [];
    let StartTimeStamp = Date.now();
    let EndTimeStamp = Date.now() + CountdownTime * 60000;
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    }
    let date = formatDate(new Date());
    if (ObjectSelect != "" && CountdownTime != "") {
      const db = firebaseApp.firestore();
      const userCollection = db.collection("Quest");
      const documentRef = await userCollection.add({
        UId,
        ClassRoomId,
        ObjectSelect,
        CountdownTime,
        StartTimeStamp,
        EndTimeStamp,
        Date: date,
        FaceBoxposition,
        ObjectBoxposition,
        Complete,
        Absent,
        Leave,
      });
      setModalOpen14(!modalOpen14);
      setObjectSelect("");
      setCountdownTime("");
      setFaceBoxposition({ x: 165, y: 250 });
      setObjectBoxposition({ x: 480, y: 250 });
    }
  }

  function ErrorsCheck() {
    if (ObjectSelect == "") setObjectSelectError("Must not be empty");
    if (CountdownTime == "") setCountdownTimeError("Must not be empty");
  }

  const clearErrors = () => {
    setObjectSelectError("");
    setCountdownTimeError("");
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 margin-b" xl="3">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle img-facedetection"
                        src={
                          require("../../assets/img/theme/team-3-800x800.gif")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>

                <Modal
                  toggle={() => setModalOpen(!modalOpen)}
                  isOpen={modalOpen}
                  size="md"
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
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h1 className="invite-className subjectname-invite">
                        <span>{ClassRoom.SubjectCode}</span> &nbsp;
                        <span>{ClassRoom.SubjectName}</span>
                      </h1>
                      {/* <h1 className="invite-className">
                        {ClassRoom.SubjectCode} {ClassRoom.SubjectName}
                      </h1> */}
                      <CopyToClipboard
                        text={location.search.substring(1)}
                        onCopy={() =>
                          setCopiedText(location.search.substring(1))
                        }
                      >
                        <button
                          className="btn-icon-clipboard copy-link-box"
                          id="tooltip982655500"
                          type="button"
                        >
                          <div className="link-box">
                            <i class="fas fa-solid fa-link link-icon"></i>
                            <h4 className="link-text">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {location.search.substring(1)}
                            </h4>
                          </div>
                        </button>
                      </CopyToClipboard>
                      <UncontrolledTooltip
                        delay={0}
                        trigger="hover focus"
                        target="tooltip982655500"
                      >
                        {copiedText === "ni ni-active-40"
                          ? "This was Copied!"
                          : "Copy To Clipboard"}
                      </UncontrolledTooltip>
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>

                <Modal
                  toggle={() => setModalOpen1(!modalOpen1)}
                  isOpen={modalOpen1}
                  size="lg"
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
                    {" "}
                    <Col className="order-xl-1">
                      <Card className="bg-secondary shadow">
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="text-center header-request">
                                Request to join a class
                              </h3>
                            </div>
                          </Row>
                        </CardHeader>
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">id</th>
                              <th scope="col">name</th>
                              <th scope="col">action</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(Request).map((id) => {
                              return (
                                <tr>
                                  <th scope="row">
                                    <Media className="align-items-center">
                                      <Media>
                                        <span className="mb-0 text-sm">
                                          {Request[id].StudentID}
                                        </span>
                                      </Media>
                                    </Media>
                                  </th>

                                  <td>
                                    <Badge color="" className="badge-dot mr-4">
                                      {Request[id].FirstName}{" "}
                                      {Request[id].LastName}
                                    </Badge>
                                  </td>
                                  <td>
                                    <Button
                                      color="success"
                                      onClick={() => accept(Request[id].Uid)}
                                      size="sm"
                                      className="icon-requestModal"
                                    >
                                      <i class="fas fa-solid fa-check"></i>
                                    </Button>
                                    <Button
                                      color="danger"
                                      onClick={() => refuse(Request[id].Uid)}
                                      size="sm"
                                      className="icon-requestModal"
                                    >
                                      <i class="fas fa-regular fa-xmark"></i>
                                    </Button>
                                  </td>
                                  <td className="text-right threedot">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        className="btn-icon-only text-light"
                                        role="button"
                                        size="sm"
                                        color=""
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <i className="fas fa-ellipsis-v" />
                                      </DropdownToggle>
                                      <DropdownMenu
                                        className="dropdown-menu-arrow"
                                        right
                                      >
                                        <DropdownItem
                                          onClick={() =>
                                            ProfileModalOpens(Request[id])
                                          }
                                        >
                                          Profile
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        {EmptyRequest ? (
                          <div className="no-request text-red">
                            No requests recently
                          </div>
                        ) : null}
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen2(!modalOpen2)}
                  isOpen={modalOpen2}
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen2(!modalOpen2)}
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
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                          <Row>
                            <div className="col">
                              <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                <div>
                                  <h2 className="heading">
                                    {CurrentRequestProfile.StudentID}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="text-center">
                            <h2>
                              {CurrentRequestProfile.FirstName}{" "}
                              {CurrentRequestProfile.LastName}
                            </h2>
                            <div className="h3 font-weight-300">
                              <i className="ni location_pin mr-2" />
                              {CurrentRequestProfile.Faculty},{" "}
                              {CurrentRequestProfile.Department}
                            </div>
                            <hr className="my-4" />
                            <div className="h5 mt-4">
                              <i className="ni business_briefcase-24 mr-2" />
                              {CurrentRequestProfile.Email}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>

                <Modal
                  toggle={() => setModalOpen3(!modalOpen3)}
                  isOpen={modalOpen3}
                  size="xl"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen3(!modalOpen3)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Row>
                      {" "}
                      <Col xl="4">
                        <Card className="card-profile shadow profileModal">
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
                          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                          <CardBody className="pt-0 pt-md-4">
                            <Row>
                              <div className="col">
                                <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                  <div>
                                    <h2 className="heading">
                                      {CurrentRequestProfile.StudentID}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </Row>
                            <div className="text-center">
                              <h2>
                                {CurrentRequestProfile.FirstName}{" "}
                                {CurrentRequestProfile.LastName}
                              </h2>
                              <div className="h3 font-weight-300">
                                <i className="ni location_pin mr-2" />
                                {CurrentRequestProfile.Faculty},{" "}
                                {CurrentRequestProfile.Department}
                              </div>
                              <hr className="my-4" />
                              <div className="h5 mt-4">
                                <i className="ni business_briefcase-24 mr-2" />
                                {CurrentRequestProfile.Email}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <ModalBody>
                        <Col className="order-xl-1" xl="12">
                          <row>
                            <Card className="bg-secondary shadow">
                              <CardHeader className="border-0">
                                <Row className="align-items-center">
                                  <div className="col">
                                    <h3 className="mb-0">Report</h3>
                                  </div>
                                  <div className="col text-right">
                                    <h3>{ClassRoom.SubjectCode}</h3>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col">completed</th>
                                    <th scope="col">absent</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            Quest Check
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      {" "}
                                      <div>
                                        <Button
                                          color="success"
                                          outline
                                          type="button"
                                          id="toggler1"
                                        >
                                          5
                                        </Button>
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        color="danger"
                                        outline
                                        type="button"
                                        id="toggler"
                                      >
                                        1
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Card>
                          </row>
                          <UncontrolledCollapse toggler="#toggler1">
                            <Card className="bg-secondary shadow">
                              <CardHeader className="border-0">
                                <Row className="align-items-center">
                                  <div className="col">
                                    <h3 className="mb-0">Completed</h3>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Quest</th>
                                    <th scope="col" className="col text-right">
                                      details
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            31/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                        onClick={() =>
                                          setModalOpen11(!modalOpen11)
                                        }
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            24/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            17/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            10/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            3/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Card>
                          </UncontrolledCollapse>

                          <UncontrolledCollapse toggler="#toggler">
                            <Card className="bg-secondary shadow ">
                              <CardHeader className="border-0">
                                <Row>
                                  <div className="col">
                                    <h3 className="mb-0">Selfie with a pen</h3>
                                  </div>
                                  <div className="col text-right">
                                    <h4>Absent</h4>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Quest</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            7 February 2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-danger" />
                                        Selfie with Pillow
                                      </Badge>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Card>
                          </UncontrolledCollapse>
                        </Col>
                      </ModalBody>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen11(!modalOpen11)}
                  isOpen={modalOpen11}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen11(!modalOpen11)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                      <Card className="card-profile shadow">
                        <CardBody className="pt-0 pt-md-4">
                          <div className="text-center">
                            <img
                              src="https://www.img.in.th/images/3176e43743c0c9e923693782aa34c326.jpg"
                              width="300"
                              height="450"
                              className="img-fluid shadow-4"
                              alt="..."
                            />
                            <div>
                              <i className="ni education_hat mr-2" />
                              <h2>TIME : 9:47 A.M.</h2>
                            </div>
                            <div className="h3 font-weight-300">
                              <i className="ni location_pin mr-2" />
                              Completed
                            </div>
                            <hr className="my-4" />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen9(!modalOpen9)}
                  isOpen={modalOpen9}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen9(!modalOpen9)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                      <Card className="card-profile shadow profileModal">
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
                              Science, Mathematics
                            </div>
                            <hr className="my-4" />
                            <h2 className="text-success">Completed</h2>
                            <div>
                              <h4>31/01/2022</h4>
                              <h4>TIME : 9:47 A.M.</h4>
                            </div>

                            <img
                              src="https://www.img.in.th/images/3176e43743c0c9e923693782aa34c326.jpg"
                              width="180"
                              height="360"
                              className="img-fluid shadow-4"
                              alt="..."
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen4(!modalOpen4)}
                  isOpen={modalOpen4}
                  size="sm"
                  className="confirm-modal"
                >
                  <div className=" modal-header"></div>
                  <ModalBody>
                    {" "}
                    <span className="font-weight-light">
                      You want to Delete &nbsp;
                      <span className="font-weight-bold">
                        {CurrentRequestProfile.FirstName}{" "}
                        {CurrentRequestProfile.LastName}
                      </span>
                      &nbsp; ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        onClick={() => DeleteMember(CurrentRequestProfile.Uid)}
                        className="ml-2 mr-2"
                        size="l"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen4(!modalOpen4)}
                        className="ml-2 mr-2"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen5(!modalOpen5)}
                  isOpen={modalOpen5}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen5(!modalOpen5)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Row>
                      {" "}
                      <Col className="order-xl-1">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Summary</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col" className="td-nonePadding">
                                  name
                                </th>
                                <th scope="col">hour learned</th>
                                <th scope="col">completed</th>
                                <th scope="col">absent</th>
                                <th scope="col" className="text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td className="td-nonePadding">
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name"
                                  >
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    90 %
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />4
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />1
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        Profile
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen3(!modalOpen3)
                                        }
                                      >
                                        Report
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td className="td-nonePadding">
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name"
                                  >
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    90 %
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />5
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />0
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        Profile
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen3(!modalOpen3)
                                        }
                                      >
                                        Report
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500427
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td className="td-nonePadding">
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name"
                                  >
                                    Suriyasak Najaeiei
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    90 %
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />0
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />5
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        Profile
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen3(!modalOpen3)
                                        }
                                      >
                                        Report
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="shadow">
                          <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                              <div className="col">
                                <h2 className="mb-0">Dashboard</h2>
                              </div>
                            </Row>
                          </CardHeader>
                          <CardBody>
                            {/* Chart */}
                            <div className="chart">
                              <img
                                src="https://www.img.in.th/images/f3266bbdac74a856947d039473720428.jpg"
                                className="img-fluid shadow-4"
                                alt="..."
                              />
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen6(!modalOpen6)}
                  isOpen={modalOpen6}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen6(!modalOpen6)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Col className="order-xl-1" xl="12">
                      <row>
                        <Card className="bg-secondary shadow">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Quest Check</h3>
                              </div>
                              <div className="col text-right">
                                <h3>31/1/2021</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Quest</th>
                                <th scope="col">completed</th>
                                <th scope="col">absent</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        Selfie with a pen
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  {" "}
                                  <div>
                                    <Button
                                      color="success"
                                      outline
                                      type="button"
                                      id="toggler1"
                                    >
                                      39
                                    </Button>
                                  </div>
                                </td>
                                <td>
                                  <Button
                                    color="danger"
                                    outline
                                    type="button"
                                    id="toggler"
                                  >
                                    1
                                  </Button>
                                </td>
                                <td></td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        Selfie with a spoon
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  {" "}
                                  <Button color="success" outline type="button">
                                    39
                                  </Button>
                                </td>
                                <td>
                                  <Button color="danger" outline type="button">
                                    1
                                  </Button>
                                </td>
                                <td></td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </row>
                      <UncontrolledCollapse toggler="#toggler1">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Selfie with a pen</h3>
                              </div>
                              <div className="align-items-center">
                                <h4 className="col text-right text-success status-report">
                                  COMPLETED
                                </h4>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </UncontrolledCollapse>

                      <UncontrolledCollapse toggler="#toggler">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row>
                              <div className="col">
                                <h3 className="mb-0">Selfie with a pen</h3>
                              </div>
                              <div className="align-items-center">
                                <h4 className="col text-right text-danger status-report">
                                  ABSENT / LEAVE
                                </h4>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">status</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>

                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Leave
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen13(!modalOpen13)
                                        }
                                      >
                                        See Leave Form
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Leave
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen13(!modalOpen13)
                                        }
                                      >
                                        See Leave Form
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Leave
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen13(!modalOpen13)
                                        }
                                      >
                                        See Leave Form
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </UncontrolledCollapse>
                      <row>
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row>
                              <div className="col summary-history">
                                <h3 className="mb-0">Summary</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">status</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-success" />
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>

                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Complete
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Leave
                                  </Badge>
                                </td>

                                <td className="text-right threedot"></td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Leave
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen13(!modalOpen13)
                                        }
                                      >
                                        See Leave Form
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Complete
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </row>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen7(!modalOpen7)}
                  isOpen={modalOpen7}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen7(!modalOpen7)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>777</ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen8(!modalOpen8)}
                  isOpen={modalOpen8}
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen8(!modalOpen8)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>8888</ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen12(!modalOpen12)}
                  isOpen={modalOpen12}
                  size="sm"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen12(!modalOpen12)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h2 className="upload-leave-form">
                        Please upload leave form
                      </h2>
                      <img
                        src={
                          require("../../assets/img/theme/img-upload.png")
                            .default
                        }
                        className="img-fluid shadow-4 img-upload"
                        alt="..."
                      />
                    </div>
                    <div class="upload-btn-wrapper text-center">
                      <button class="btn-uploadFile">Upload File</button>
                      <input type="file" name="myfile" />
                    </div>
                    <div className="box mt-3">
                      <div className="line"></div>
                      <div className="lightGray-textSize or">OR</div>
                      <div className="line"></div>
                    </div>
                    <div>
                      <button class="btn-uploadFile2">Not Upload File</button>
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen13(!modalOpen13)}
                  isOpen={modalOpen13}
                  size="sm"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen13(!modalOpen13)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h2 className="heading-leaveForm">Leave form</h2>
                      <img
                        src={
                          require("../../assets/img/theme/leave_form.jpg")
                            .default
                        }
                        className="img-fluid shadow-4 img-leaveForm"
                        alt="..."
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen14(!modalOpen14)}
                  isOpen={modalOpen14}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen14(!modalOpen14)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Row>
                      {" "}
                      <Col>
                        <Card className="shadow">
                          <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                              <div className="col">
                                <h2 className="mb-0">Create Quest</h2>
                              </div>
                            </Row>
                          </CardHeader>
                          <CardBody className="createQuest">
                            <Row className="align-items-center mb-4">
                              <Col className="col-selectQuest">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Select Quest
                                  <span className="text-red">*</span>
                                  &nbsp;
                                  <span className="text-red">
                                    {ObjectSelectError}
                                  </span>
                                </label>
                                <Input
                                  type="select"
                                  placeholder="Department"
                                  style={{
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                  }}
                                  className="select-quest"
                                  onChange={(event) =>
                                    setObjectSelect(event.target.value)
                                  }
                                >
                                  <option value="" disabled selected hidden>
                                    Select Quest
                                  </option>
                                  <option value="cup">cup</option>
                                  <option value="bottle">bottle</option>
                                </Input>
                              </Col>
                              &nbsp;
                              <Col className="col-selectQuest">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Countdown Time
                                  <span className="text-red">*</span>
                                  &nbsp;
                                  <span className="text-red">
                                    {CountdownTimeError}
                                  </span>
                                </label>
                                <Input
                                  type="select"
                                  placeholder="Department"
                                  style={{
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                  }}
                                  className="select-quest2"
                                  onChange={(event) =>
                                    setCountdownTime(event.target.value)
                                  }
                                >
                                  <option value="" disabled selected hidden>
                                    Countdown Time
                                  </option>
                                  <option value="0.2">12 second</option>
                                  <option value="5">5 minute</option>
                                  <option value="10">10 minute</option>
                                  <option value="15">15 minute</option>
                                  <option value="20">20 minute</option>
                                  <option value="25">25 minute</option>
                                  <option value="30">30 minute</option>
                                </Input>
                              </Col>
                            </Row>
                            <Row>
                              <div
                                className="box"
                                style={{
                                  height: "480px",
                                  width: "640px",
                                  position: "relative",
                                  overflow: "auto",
                                  padding: "0",
                                  background: "lightgrey",
                                }}
                              >
                                <div
                                  style={{
                                    height: "480px",
                                    width: "640px",
                                    padding: "10px",
                                  }}
                                >
                                  <Draggable
                                    bounds="parent"
                                    onDrag={(e, data) => FacetrackPos(data)}
                                    defaultPosition={{ x: 55, y: 140 }}
                                  >
                                    <div
                                      style={{
                                        height: "200px",
                                        width: "200px",
                                        position: "absolute",
                                        cursor: "move",
                                        color: "black",
                                        borderRadius: "5px",
                                        margin: "auto",
                                        userSelect: "none",
                                        background: "white",
                                      }}
                                    >
                                      Face x: {FaceBoxposition.x.toFixed(0)}, y:{" "}
                                      {FaceBoxposition.y.toFixed(0)}
                                    </div>
                                  </Draggable>
                                  <Draggable
                                    bounds="parent"
                                    onDrag={(e, data) => ObjecttrackPos(data)}
                                    defaultPosition={{ x: 370, y: 140 }}
                                  >
                                    <div
                                      style={{
                                        height: "200px",
                                        width: "200px",
                                        position: "absolute",
                                        cursor: "move",
                                        color: "black",
                                        borderRadius: "5px",
                                        margin: "auto",
                                        userSelect: "none",
                                        background: "white",
                                      }}
                                    >
                                      Object x: {ObjectBoxposition.x.toFixed(0)}
                                      , y: {ObjectBoxposition.y.toFixed(0)}
                                    </div>
                                  </Draggable>
                                </div>
                              </div>
                            </Row>
                            <Row>
                              <Button
                                className="mt-4 buttonStyle btn-create"
                                color="dark"
                                type="button"
                                onClick={(e) => SendQuest()}
                              >
                                SEND QUEST
                              </Button>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen15(!modalOpen15)}
                  isOpen={modalOpen15}
                  size="sm"
                >
                  <div className=" modal-header"></div>
                  <ModalBody className="question-box">
                    {" "}
                    <span className="font-weight-bold confirm-leaveRoom text-center ">
                      Do you want to cancel this quest ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        // onClick={() => leaveclassroom()}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                        size="l"
                        onClick={() => cancelquest()}
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen15(!modalOpen15)}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 header-createQuest">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-3">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats card-quest d-flex justify-content-center mt-md-5"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <h1>QUEST CHECK</h1>
                  <div className="h5 font-weight-300">
                    <h2 className="date-profile">{date}</h2>
                  </div>
                  <div className="text-center">
                    {NotOnQuest ? (
                      <Button
                        className="mt-3"
                        color="dark"
                        type="button"
                        onClick={() => setModalOpen14(!modalOpen14)}
                      >
                        CREATE QUEST
                      </Button>
                    ) : null}
                    {OnQuest ? (
                      <div>
                        <p>ObjectSelect: {CurrentQuest.ObjectSelect}</p>
                        <p>
                          CountdownTime: {CurrentQuest.CountdownTime} Minute
                        </p>
                        {/* <p className="mt-5">Start: {StartTime}</p> */}
                        {/* <p>End: {EndTime}</p> */}
                        <h3 className="text-red mt-5">
                          Remaining time: {Countdown} Minute
                        </h3>
                        <p className="text-red">End: {EndTime}</p>
                        <Button
                          className="mt-3"
                          color="dark"
                          type="button"
                          onClick={() => setModalOpen15(!modalOpen15)}
                        >
                          CANCEL QUEST
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1 mg-b20 margin-b" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Member</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="dark"
                      onClick={() => setModalOpen(!modalOpen)}
                      size="sm"
                    >
                      Invite
                    </Button>
                    <Button
                      color="dark"
                      onClick={() => setModalOpen1(!modalOpen1)}
                      size="sm"
                    >
                      Request
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col" className="td-nonePadding">
                      name
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(Members).map((id) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {Members[id].StudentID}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        <td className="td-nonePadding hightBox-profile">
                          <Badge
                            color=""
                            className="badge-dot mr-4  short-name"
                          >
                            {Members[id].FirstName} {Members[id].LastName}
                          </Badge>
                        </td>
                        <td className="text-right threedot">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() => ProfileModalOpens(Members[id])}
                              >
                                Profile
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => ReportModalOpens(Members[id])}
                              >
                                Report
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => DeleteModalOpens(Members[id])}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="5">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Attendence</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="dark"
                      onClick={() => setModalOpen5(!modalOpen5)}
                      size="sm"
                    >
                      Dashboard
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="td-nonePadding4">
                      Date
                    </th>
                    <th scope="col" className="td-nonePadding2">
                      completed
                    </th>
                    <th scope="col" className="td-nonePadding3">
                      absent
                    </th>
                    <th scope="col" className="td-nonePadding5" />
                  </tr>
                </thead>
                <tbody>
                  <tr className="hightBox-profile">
                    <th scope="row" className="td-nonePadding4">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">31/01/2022</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding2">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        39
                      </Badge>
                    </td>
                    <td className="td-nonePadding3">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />1
                      </Badge>
                    </td>

                    <td className="td-nonePadding5">
                      <div className="d-flex align-items-right">
                        <Button
                          color="dark"
                          type="button"
                          onClick={() => setModalOpen6(!modalOpen6)}
                          className="btn-seeMore-attendence"
                        >
                          See More
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default Profile;
