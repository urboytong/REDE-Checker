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
import "assets/scss/argon-dashboard/custom/register.scss";
import React, { useState, useEffect } from "react";
const Register = () => {
  const [role, setRole] = useState("Teacher1");
  const changeRole = (role) => {
    if (role === "Teacher") {
      setRole("Teacher1");
    } else {
      setRole("Student");
    }

    console.log("role :" + role);
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1 className="darkGray">REGISTER</h1>
            </div>
            <div className="flexBox">
              <div className="boxSwitch">
                <button
                  onClick={() => changeRole("Teacher")}
                  className={
                    role === "Teacher1"
                      ? "selectRoleActive "
                      : "selectRole darkGray"
                  }
                  darkGray
                >
                  Teacher
                </button>
                <button
                  onClick={() => changeRole("Student")}
                  className={
                    role === "Student"
                      ? "selectRoleActive "
                      : "selectRole darkGray"
                  }
                >
                  Student
                </button>
              </div>
            </div>

            {/* form regis teacher */}
            <div className="teacher">
              <div className="uploadImage">
                <div className="image2">
                  <img
                    className="faceIcon"
                    alt="..."
                    src={require("../../assets/img/image/face.png").default}
                  />
                </div>
                <div className="boxButton">
                  {/* <div className="uploadButton2">
                    <i class="fas fa-pencil-alt penIcon"></i>
                  </div> */}
                  <div class="upload-btn-wrapper text-center">
                    <button class="btn-uploadFile-imgProfile">
                    <i class="fas fa-pencil-alt penIcon"></i></button>
                    <input type="file" name="myfile" />
                  </div>
                </div>
              </div>
              <Form role="form" className="formTeacher">
                <div className="topicForm">Academic Ranks</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      className="darkGray"
                      type="select"
                      placeholder="Academic Ranks"
                    >
                      <option>Assoc. Prof.</option>
                      <option>Asst. Prof.</option>
                      <option>Dr.</option>
                      <option>Instructor</option>
                      <option>Prof.</option>
                    </Input>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">First Name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text" />
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Last Name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text" />
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Faculty</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      className="darkGray"
                      type="select"
                      placeholder="Faculty"
                    >
                      <option>College of Multidisciplinary Science</option>
                      <option>
                        Darunsikkhalai School of Innovation Learning
                      </option>
                      <option>Engineering</option>
                      <option>Engineering Science Classroom</option>
                      <option>
                        Graduate School of Management and Innovation
                      </option>
                      <option>Industrial Education and Technology</option>
                      <option>Institute of Field Robotics</option>
                      <option>KOSEN KMUTT</option>
                      <option>School of Architecture and Design</option>
                      <option>School of Bioresources and Technology</option>
                      <option>
                        School of Energy, Environment and Materials
                      </option>
                      <option>School of Information Technology</option>
                      <option>School of Liberal Arts</option>
                      <option>Science</option>
                      <option>
                        The Joint Graduate School of Energy and Environment
                      </option>
                    </Input>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Department</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text" />
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Major</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text" />
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Email</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text" />
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Password</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="Password" />
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Confirm Password</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="password" />
                  </InputGroup>
                </FormGroup>

                <div className="text-center lightGray">
                  <Button
                    className="mt-4 buttonStyle"
                    color="primary"
                    type="button"
                  >
                    SIGNUP
                  </Button>
                </div>
              </Form>
            </div>

            {/* form regis student*/}

            {/* <div className="student">
              <div className="uploadImage">
                <div className="image2">
                  <img className="faceIcon"
                    alt="..."
                    src={
                      require("../../assets/img/image/face.png").default
                    }
                  />
                </div>
                <div className="boxButton">
                  <div className="uploadButton2">
                    <i class="fas fa-solid fa-camera penIcon"></i>
                  </div>
                </div>
              </div>

              <Form role="form" className="formStudent">
                <div className="topicForm lightGray">First Name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Last Name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Student ID</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Faculty</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="select" placeholder="Faculty">
                      <option>College of Multidisciplinary Science</option>
                      <option>Darunsikkhalai School of Innovation Learning</option>
                      <option>Engineering</option>
                      <option>Engineering Science Classroom</option>
                      <option>Graduate School of Management and Innovation</option>
                      <option>Industrial Education and Technology</option>
                      <option>Institute of Field Robotics</option>
                      <option>KOSEN KMUTT</option>                    
                      <option>School of Architecture and Design</option>
                      <option>School of Bioresources and Technology</option>
                      <option>School of Energy, Environment and Materials</option>
                      <option>School of Information Technology</option>
                      <option>School of Liberal Arts</option>
                      <option>Science</option>
                      <option>The Joint Graduate School of Energy and Environment</option>
                    </Input>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Department</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Major</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Email</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Password</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="password"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Confirm Password</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="password" />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="mt-4 buttonStyle" color="primary" type="button">
                    SIGNUP
                  </Button>
                </div>
              </Form>
            </div> */}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
