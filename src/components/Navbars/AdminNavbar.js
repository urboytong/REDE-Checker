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
import { useState, useEffect, useContext } from "react";
import firebaseApp from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/AdminNavbar.scss";
import Profile from "components/Headers/Profile.js";
import ResetPassword from "components/Headers/ResetPassword.js";
import Notification from "components/Navbars/Notification.js";

const AdminNavbar = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [User, setUser] = useState({});
  const [Role, setRole] = useState("");

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
            User[document.id] = document.data();
            setRole(User[document.id].role);
            User = document.data();
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

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/auth/login" />;
  }
  if (currentUser && Role == "Student") {
    return <Redirect to="/student/student-home" />;
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block text-name-status"
            to="/"
          >
            {props.brandText}
          </Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>

            {/* <Notification/> */}
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-4-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block text-nameUser">
                    <span className="mb-0 text-sm font-weight-bold">
                      {User.FirstName} {User.LastName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => setModalOpen2(!modalOpen2)}
                >
                  <i className="ni ni-key-25" />
                  <span>Reset Password</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={() => firebaseApp.auth().signOut()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>

      <Profile modalOpen={modalOpen} setModalOpen={setModalOpen} modalOpen1={modalOpen1} setModalOpen1={setModalOpen1}/>
      <ResetPassword modalOpen2={modalOpen2} setModalOpen2={setModalOpen2}/>      
      
    </>
  );
};

export default AdminNavbar;
