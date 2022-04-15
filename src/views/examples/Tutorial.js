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
import React, { useState, useEffect, useContext, useRef } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import firebaseApp from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/Tutorial.scss";

const Tutorial = () => {
  return (
    <>
      <div>
        <Row>
          <Col>
            <div className="box-red"></div>
          </Col>
          <Col>
            <div className="box-yellow"></div>
          </Col>
          <Col>
            <div className="box-blue"></div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Tutorial;
