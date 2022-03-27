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
/*eslint-disable*/
import { useState, useEffect, useContext } from "react";
import firebaseApp from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import "assets/scss/argon-dashboard/custom/Sidebar.scss";
import Profile from "components/Headers/Profile.js";
import ResetPassword from "components/Headers/ResetPassword.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
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
          const User = {};

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            User[document.id] = document.data();
            setRole(User[document.id].role);
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
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white sidebar-none"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={require("../../assets/img/theme/rede-checker.png").default}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/theme/team-4-800x800.jpg")
                        .default
                    }
                    onClick={() => setModalOpen(!modalOpen)}
                  />
                </span>
              </Media>
            </DropdownToggle>
          </UncontrolledDropdown>
        </Nav>
        
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <DropdownItem
                onClick={() => setModalOpen(!modalOpen)}
              >
                <div>
                  <i className="ni ni-single-02" />
                  &nbsp; &nbsp; My Profile
                </div>
              </DropdownItem>
              <DropdownItem
                  onClick={() => setModalOpen2(!modalOpen2)}
                >
                  <div>
                    <i className="ni ni-key-25" />
                    &nbsp; &nbsp; Reset Password
                  </div>
                </DropdownItem>
            </NavItem>
          </Nav>
          
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}

          {/* Navigation */}
          <Nav className="mb-md-3" navbar></Nav>
          
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <DropdownItem>
                <div onClick={() => firebaseApp.auth().signOut()}>
                <i className="ni ni-user-run" />
                  &nbsp; &nbsp; Logout
                </div>
              </DropdownItem>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      <Profile modalOpen={modalOpen} setModalOpen={setModalOpen} modalOpen1={modalOpen1} setModalOpen1={setModalOpen1}/>
      <ResetPassword modalOpen2={modalOpen2} setModalOpen2={setModalOpen2}/>      
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
