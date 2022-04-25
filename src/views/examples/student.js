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
import React, { useState, useEffect, useRef, useContext } from "react";
import firebaseApp from "../../firebase";
import { AuthContext } from "components/Auth/Auth.js";
import { useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
import "assets/scss/argon-dashboard/custom/student.scss";

// core components
import UserHeader from "components/Headers/UserHeader2.js";
import Quest from "views/examples/Quest.js";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;
const Profile = () => {
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  const [CurrentQuest, setCurrentQuest] = useState({});
  const [AllQuest, setAllQuest] = useState([]);
  const [StartTime, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();
  const [Countdown, setCountdown] = useState();
  const [SeeDetail, setSeeDetail] = useState({});
  const [QuestCompleted, setQuestCompleted] = useState(0);

  const [NotOnQuest, setNotOnQuest] = useState(false);
  const [OnQuest, setOnQuest] = useState(false);

  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser._delegate.uid) {
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
          let AllQuest = [];
          let count = 0;
          let countall = 0;

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            if (document.data().EndTimeStamp >= Date.now()) {
              for (let i = 0; i < document.data().Complete.length; i++) {
                if (
                  document.data().Complete[i].Uid == currentUser._delegate.uid
                ) {
                  count++;
                }
              }
            }
            if (document.data().EndTimeStamp >= Date.now() && count == 0) {
              CurrentQuest = document.data();
            }
            AllQuest[countall] = document.data();
            AllQuest[countall].Complete = false;
            for (let i = 0; i < document.data().Complete.length; i++) {
              if (
                document.data().Complete[i].Uid == currentUser._delegate.uid
              ) {
                AllQuest[countall].Complete = true;
                AllQuest[countall].Image = document.data().Complete[i].Image;
              }
            }
            countall++;
          });

          // เปลี่ยนค่าตัวแปร state
          AllQuest.sort((a, b) =>
            a.EndTimeStamp < b.EndTimeStamp
              ? 1
              : b.EndTimeStamp < a.EndTimeStamp
              ? -1
              : 0
          );
          let completecount = 0;
          for(let i = 0; i < AllQuest.length; i++){
            if(AllQuest[i].Complete){
              completecount++;
            }
          }
          setQuestCompleted(100*completecount/AllQuest.length);
          completecount = 0;
          console.log(AllQuest);
          setAllQuest(AllQuest);
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
    }
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

  const seedetail = (id) => {
    setModalOpen3(!modalOpen3);
    setSeeDetail(AllQuest[id]);
    console.log(AllQuest[id]);
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
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
                    <h3 className="text-center">You want to leave CSS111 ??</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        Natthaphat Wannawat
                      </Badge>
                    </td>
                    <td>
                      <Button
                        color="success"
                        //onClick={() => setModalOpen1(!modalOpen1)}
                        size="md"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        // onClick={() => setModalOpen1(!modalOpen1)}
                        size="md"
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal
        toggle={() => setModalOpen2(!modalOpen2)}
        isOpen={modalOpen2}
        size="lg"
        className="modal-doQuest"
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
        <ModalBody>
          <Row>
            {" "}
            <Col>
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h2 className="mb-0">Quest Check</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="createQuest">
                  <Row className="align-items-center mb-4">
                    <Quest />
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal
        toggle={() => setModalOpen3(!modalOpen3)}
        isOpen={modalOpen3}
        size="lg"
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
          {" "}
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h2 className="text-success text-complete">Completed</h2>
                  <h2 className="text-success">
                    " Selfie with a {SeeDetail.ObjectSelect}"
                  </h2>
                  <div>
                    <h4>{SeeDetail.Date}</h4>
                  </div>
                  <img
                    src={SeeDetail.Image}
                    width="640"
                    height="480"
                    className="img-fluid shadow-4"
                    alt="..."
                    style={{
                      transform: "rotateY(180deg)",
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter className="footer-none"></ModalFooter>
      </Modal>

      <Container className="mt--7 " fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
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
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 header-createQuest">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-3">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-2"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <div className="h1 font-weight-300">
                    <h2 className="date-profile">{date}</h2>
                  </div>
                  {OnQuest ? (
                    <div>
                      <div>
                        <h1 className="mb-0 text-danger">
                          " Selfie with a {CurrentQuest.ObjectSelect} "
                        </h1>

                        <h4 className="mb-0 text-danger">
                          TIME REMAING : {Countdown} minute
                        </h4>
                      </div>
                      <div className="text-center">
                        <Button
                          className="do-quest"
                          color="dark"
                          type="button"
                          onClick={() => setModalOpen2(!modalOpen2)}
                        >
                          LET'S DO QUEST
                        </Button>
                      </div>
                    </div>
                  ) : null}
                  {NotOnQuest ? (
                    <div>
                      <div>
                        <h1 className="mb-4 text-red">" There is no quest available "</h1>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="5">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 Attendance-student">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0 ">Attendance</h3>
                  </div>
                  <div className="col text-right">Quest Completed {QuestCompleted.toFixed(0)} %</div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="td-nonePadding6">
                      Date
                    </th>
                    <th scope="col" className="td-nonePadding">
                      Status
                    </th>
                    <th scope="col" className="td-nonePadding"></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(AllQuest).map((id) => {
                    return (
                      <tr>
                        <th scope="row" className="td-nonePadding6">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {AllQuest[id].Date}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        {AllQuest[id].Complete ? (
                          <td className="td-nonePadding hightBox-profile">
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              Completed
                            </Badge>
                          </td>
                        ) : null}

                        {!AllQuest[id].Complete &&
                        AllQuest[id].EndTimeStamp < Date.now() ? (
                          <td className="td-nonePadding hightBox-profile">
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-danger" />
                              Absent
                            </Badge>
                          </td>
                        ) : null}

                        {!AllQuest[id].Complete &&
                        AllQuest[id].EndTimeStamp >= Date.now() ? (
                          <td className="td-nonePadding hightBox-profile">
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-primary" />
                              On going
                            </Badge>
                          </td>
                        ) : null}

                        {AllQuest[id].Complete ? (
                          <td className="td-nonePadding hightBox-profile">
                            <div className="d-flex align-items-center">
                              <Button
                                color="dark"
                                type="button"
                                size="sm"
                                onClick={() => seedetail(id)}
                              >
                                See Detail
                              </Button>
                            </div>
                          </td>
                        ) : null}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="no-request text-red">
                No quest recently
              </div>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default Profile;
