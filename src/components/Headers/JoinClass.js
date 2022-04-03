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
import "assets/scss/argon-dashboard/custom/Header.scss";

const Header = () => {
  const [modalOpen1, setModalOpen1] = useState(false);
  const [Code, setCode] = useState("");
  const [CodeError, setCodeError] = useState("");
  const [ClassRoom, setClassRoom] = useState({});
  const [JoinClassForm, setJoinClassForm] = useState(true);
  const [SentSuccess, setSentSuccess] = useState(false);

  const db = firebaseApp.firestore()

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged(user => {
        const db = firebaseApp.firestore()
        const userCollection = db.collection('ClassRoom').where('__name__' , '==' , Code)       
    
      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot(ss => {
          // ตัวแปร local
          let ClassRoom = {}

          ss.forEach(document => {
              // manipulate ตัวแปร local
              ClassRoom = document.data()
          })

          // เปลี่ยนค่าตัวแปร state
          setClassRoom(ClassRoom)
          console.log(ClassRoom)
      })

      return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe()
      }
      });
  }, [Code])
  
  const ModalOpens = () => {
    setJoinClassForm(true);
    setSentSuccess(false);
    setModalOpen1(!modalOpen1)
    setCodeError("");
  }

  const JoinClass = async () => {
    const UId = currentUser._delegate.uid
    setCodeError("");
    if(Code == ""){
      setCodeError("Must not be empty.")
      //console.log(currentUser._delegate.uid)
    }
    if(Object.keys(ClassRoom).length == 0){
      setCodeError("This code cannot be used.")
    }
    if(Object.keys(ClassRoom).length != 0){
      if(!ClassRoom.Members.includes(UId)){
        if(ClassRoom.Request.includes(UId)){
          setCodeError("You have already sent a request.");
        }
        if(!ClassRoom.Request.includes(UId)){
          if(!ClassRoom.Request){
            const request = [UId];
            console.log(request)
            const res = await db.collection('ClassRoom').doc(Code).update({
              'Request': request
            });
            setJoinClassForm(false);
            setSentSuccess(true);
          }
          if(ClassRoom.Request){
            const request = ClassRoom.Request;
            request.push(UId)
            console.log(request)
            const res = await db.collection('ClassRoom').doc(Code).update({
              'Request': request
            });
            setJoinClassForm(false);
            setSentSuccess(true);
          }
        }
      }
      if(ClassRoom.Members.includes(UId)){
        setCodeError("You are already in this classroom.");
      }
    }
  }

  return (
    <>
      <Modal
        toggle={() => setModalOpen1(!modalOpen1)}
        isOpen={modalOpen1}
        size="md"
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
        {JoinClassForm ? (
        <ModalBody>
          <h1 className="text-center">Join Classroom</h1>
          <Row className="align-items-center">
            <Col>
                  <div className="topicForm lightGray">
                    <span className="text-red">{CodeError}</span>
                  </div>
              <Input
                className="form-control-alternative input-classroomCode"
                id=""
                placeholder="Classroom Code"
                onChange={(e) => setCode(e.target.value)}
              />
            </Col>
            <Col className="text-right button-input-classroomCode">
              <Button
                color="dark"
                size="sm"
                className="search-classroomCode"
                onClick={JoinClass}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Col>
          </Row>
          {/* <h4 className="text-center mt-4 mb-2">OR</h4>
          <div className="text-center">
            <Button
              className="mt-2"
              color="dark"
              onClick={() => setModalOpen1(!modalOpen1)}
            >
              Scan QR Code
            </Button>
          </div> */}
        </ModalBody>
        ) : null}
        {SentSuccess ? (
        <ModalBody>
          <h1 className="text-center">The request has been sent</h1>
          <img
                        src={require("../../assets/img/image/CheckGreen.gif").default}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          width: "50%",
                          height: "50%",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      className="webcam-style"
                      />
        </ModalBody>
        ) : null}
        <ModalFooter></ModalFooter>
      </Modal>

      <Button
        className="mt-4 join-class-btn"
        color="dark"
        onClick={ModalOpens}
      >
        Join class
      </Button>
    </>
  );
};

export default Header;
