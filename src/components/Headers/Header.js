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
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/Header.scss";
import JoinClass from "components/Headers/JoinClass.js";

const Header = () => {
  const db = firebaseApp.firestore();
  const userCollection = db.collection("ClassRoom");

  const [ClassRoom, setClassRoom] = useState({});
  const [RequestClassRoom, setRequestClassRoom] = useState({});
  const [DaysColor, setDaysColor] = useState({
    Monday: "#ffd600",
    Tuesday: "#f3a4b5",
    Wednesday: "#2dce89",
    Thursday: "#fb6340",
    Friday: "#28b8ed",
    Saturday: "#8965e0",
    Sunday: "#f5365c",
  });

  const history = useHistory();

  const routeChange = (e) => {
    history.push({
      pathname: "/student/student-home/student-class",
      search: e,
      state: { detail: e },
    });
  };

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    if (firebaseApp.auth().currentUser) {
      firebaseApp.auth().onAuthStateChanged((user) => {
        const db = firebaseApp.firestore();
        const userCollection = db
          .collection("ClassRoom")
          .where(
            "Members",
            "array-contains",
            firebaseApp.auth().currentUser.uid
          );

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

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    if (firebaseApp.auth().currentUser) {
      firebaseApp.auth().onAuthStateChanged((user) => {
        const db = firebaseApp.firestore();
        const userCollection = db
          .collection("ClassRoom")
          .where(
            "Request",
            "array-contains",
            firebaseApp.auth().currentUser.uid
          );

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
          setRequestClassRoom(ClassRoom);
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
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 bg-home">
        <Container fluid>
          <div className="text-right">
            <JoinClass />
          </div>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <h2 className="text-home">Let's join the classroom and start to do Quest Check.</h2>
              <div className="btn-joinclass-home-std text-home">
                <JoinClass />
              </div>
            </Row>
            <Row className="row-student-home">
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
                              
                            ><i class="fa-solid fa-hourglass sand-clock-icon"/></div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="mr-2">
                            {" "}
                            {ClassRoom[id].ClassDate} :{" "}
                            {ClassRoom[id].StartTime} - {ClassRoom[id].EndTime}
                          </span>
                          <span className="mr-2 section">Sec : {ClassRoom[id].Section}</span>{" "}
                        </p>
                      </CardBody>
                    </Card>
                    &nbsp;
                  </Col>
                );
              })}
              {Object.keys(RequestClassRoom).map((id) => {
                return (
                  <Col lg="6" xl="3">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody className="subject-card">
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0 home-subjectName"
                            >
                              {RequestClassRoom[id].SubjectName}{" "}
                              <span className="text-red text-center">
                                &nbsp;&nbsp;Wait for permission
                              </span>
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {RequestClassRoom[id].SubjectCode}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div
                              className="icon icon-shape text-white rounded-circle shadow circle-day"
                              style={{
                                backgroundColor: RequestClassRoom[id].daycolor,
                              }}
                            ></div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="mr-2">
                            {" "}
                            {RequestClassRoom[id].ClassDate} :{" "}
                            {RequestClassRoom[id].StartTime} -{" "}
                            {RequestClassRoom[id].EndTime}
                          </span>
                          <span className="mr-2 section">Sec : -</span>{" "}
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

export default Header;
