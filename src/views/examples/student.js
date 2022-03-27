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
import React, { useState } from "react";
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
                        href="#pablo"
                        //onClick={() => setModalOpen1(!modalOpen1)}
                        size="md"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        href="#pablo"
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
                    <div>Status : Complete</div>
                  </Row>
                  <Row>
                    <div className="box-quest2" style={{position: 'relative', overflow: 'auto', padding: '0', background: 'lightgrey'}}>
                    </div>
                  </Row>
                  <Row>
                    <Button
                      className="mt-4 buttonStyle btn-create"
                      color="dark"
                      type="button"
                    >
                      SEND QUEST
                    </Button>
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
                  <h2 className="text-success">" Selfie with a Pen"</h2>
                  <div>
                    <h4>31/01/2022</h4>
                    <h4>TIME : 9:47 A.M.</h4>
                  </div>
                  <img
                    src="https://www.img.in.th/images/3176e43743c0c9e923693782aa34c326.jpg"
                    width="180"
                    height="360"
                    className="img-fluid shadow-4"
                    alt="..."
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
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
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
                  <div>
                    <h1 className="mb-0 text-danger">" Selfie with a Pen "</h1>

                    <h4 className="mb-0 text-danger">
                      TIME REMAING : 5 minute
                    </h4>
                  </div>
                  <div className="text-center">
                    <Button className="do-quest" color="dark" type="button" onClick={() => setModalOpen2(!modalOpen2)}>
                      LET'S DO QUEST
                    </Button>
                  </div>
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
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="td-nonePadding6">Date</th>
                    <th scope="col" className="td-nonePadding">Status</th>
                    <th scope="col" className="td-nonePadding"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="td-nonePadding6">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">31/01/2022</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding hightBox-profile">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Completed
                      </Badge>
                    </td>

                    <td className="td-nonePadding hightBox-profile">
                      <div className="d-flex align-items-center">
                        <Button
                          color="dark"
                          type="button"
                          size="sm"
                          onClick={() => setModalOpen3(!modalOpen3)}
                        >
                          See Detail
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="td-nonePadding6">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">24/01/2022</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding hightBox-profile">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Absent
                      </Badge>
                    </td>

                    <td className="td-nonePadding hightBox-profile">
                      <div className="d-flex align-items-center">
                        <Button
                          color="dark"
                          type="button"
                          size="sm"
                          onClick={() => setModalOpen3(!modalOpen3)}
                        >
                          See Detail
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="td-nonePadding6">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">17/01/2022</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding hightBox-profile">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Leave
                      </Badge>
                    </td>

                    <td className="td-nonePadding hightBox-profile">
                      <div className="d-flex align-items-center">
                        <Button
                          color="dark"
                          type="button"
                          size="sm"
                          onClick={() => setModalOpen3(!modalOpen3)}
                        >
                          See Detail
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default Profile;
