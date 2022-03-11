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
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="text-right">
            <JoinClass />
          </div>
          <div className="header-body">
            {/* Card stats */}
            <Row className="mt-4">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">MONDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-pink text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">TUSEDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-orange text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">THURSDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-orange text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">THURSDAY : 13:00 - 16:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">WEDNESDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">WEDNESDAY : 13:00 - 16:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-purple text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">FRIDAY : 9:00 - 12:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody className="subject-card">
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Software Engineer
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          CSS 111
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-purple text-white rounded-circle shadow circle-day"></div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="mr-2">FRIDAY : 13:00 - 16:00</span>
                      <span className="mr-2 section">SEC : 1</span>
                      <div className="shotname-teacher">
                        Professor : Wittawin Susutti
                      </div>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
