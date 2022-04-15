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
import "assets/scss/argon-dashboard/custom/Notification.scss";

const Notification = (props) => {
  return (
    <>
    <UncontrolledDropdown nav>
      <DropdownToggle nav className="nav-link-icon-noti">
        <i className="ni ni-bell-55" />
      </DropdownToggle>
      <div className="have-noti"></div>
      <DropdownMenu
        aria-labelledby="navbar-default_dropdown_1"
        className="dropdown-menu-arrow noti-nav"
        right
      >
        <div className="box-noti-nav">
          <div className="sub-noti-nav">
            <Row className="from-noti-nav see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav see-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>

          {/* example noti */}
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
          <div className="sub-noti-nav">
            <Row className="from-noti-nav never-see-noti-nav">
              <div className="code-noti-nav">FROM : SPY888</div>
              <div className="subject-noti-nav shortName-noti-nav">SPY X FAMILY gerkogkerpogkreopgkeropgkeropgkeropgkeropg</div>
            </Row>
            <Row className="text-noti-nav">Your request has been approved.</Row>
            <Row className="time-noti-nav never-see-noti-nav">36 minutes ago</Row>
          </div>
        </div>
        
      </DropdownMenu>
    </UncontrolledDropdown>
    </>
  );
};

export default Notification;
