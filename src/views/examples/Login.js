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
import "assets/scss/argon-dashboard/custom/login.scss";

const Login = () => {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
         
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1 className="darkGray">Login</h1>
            </div>
            <Form role="form">
              <div className="topicForm">Email</div>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input className="darkGray"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>

              <div className="topicForm">Password</div>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input className="darkGray" type="password" autoComplete="new-password"/>
                </InputGroup>
              </FormGroup>
              <div className="box">
                <div className="custom-control custom-control-alternative custom-checkbox checkbox">
                  <input className="custom-control-input" id=" customCheckLogin" type="checkbox"/>
                  <label className="custom-control-label" htmlFor=" customCheckLogin">
                  <span className="text-muted remember">Remember me</span>
                  </label>
                </div>
                <div className="forgotPass lightGray-textSize">Forgot Password?</div>
              </div>

              <div className="text-center mt-2">
                <Button className="my-4 buttonStyle" color="primary" type="button">
                  LOGIN
                </Button>
              </div>              

              <div className="box mt-3">
                <div className="line"></div>
                <div className="lightGray-textSize or">OR</div>
                <div className="line"></div>
              </div>

              <div className="text-center mt-2">
                <Button className="my-4 buttonRegister" type="button">
                  REGISTER
                </Button>
              </div>   
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
