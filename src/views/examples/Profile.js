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
//test punch22
// reactstrap components
import React, { useState, useContext } from "react";
import firebaseApp from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import "assets/scss/argon-dashboard/custom/profile.scss";

// core components
import UserHeader from "components/Headers/UserHeader.js";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);
  const [modalOpen6, setModalOpen6] = useState(false);
  const [modalOpen7, setModalOpen7] = useState(false);
  const [modalOpen8, setModalOpen8] = useState(false);
  const [modalOpen9, setModalOpen9] = useState(false);
  const [modalOpen11, setModalOpen11] = useState(false);
  const [modalOpen12, setModalOpen12] = useState(false);
  const [modalOpen13, setModalOpen13] = useState(false);
  const [copiedText, setCopiedText] = useState();

  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 margin-b" xl="3">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a onClick={(e) => e.preventDefault()}>
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

                <Modal
                  toggle={() => setModalOpen(!modalOpen)}
                  isOpen={modalOpen}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h1 className="invite-className">
                        CSS 111 Software Engineer
                      </h1>
                      <img
                        src="https://maesot.kpru.ac.th/wp-content/uploads/2018/01/maesot.png"
                        className="img-fluid shadow-4"
                        alt="..."
                      />
                      <CopyToClipboard
                        text={"https://tftactics.gg/tierlist/team-comps"}
                        onCopy={() =>
                          setCopiedText(
                            "https://tftactics.gg/tierlist/team-comps"
                          )
                        }
                      >
                        <button
                          className="btn-icon-clipboard copy-link-box"
                          id="tooltip982655500"
                          type="button"
                        >
                          <div className="link-box">
                            <i class="fas fa-solid fa-link link-icon"></i>
                            <h4 className="link-text">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Link :
                              https://tftactics.gg/tierlist/team-comps
                            </h4>
                          </div>
                        </button>
                      </CopyToClipboard>
                      <UncontrolledTooltip
                        delay={0}
                        trigger="hover focus"
                        target="tooltip982655500"
                      >
                        {copiedText === "ni ni-active-40"
                          ? "This was Copied!"
                          : "Copy To Clipboard"}
                      </UncontrolledTooltip>
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>

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
                              <h3 className="text-center">
                                Request to join a class
                              </h3>
                            </div>
                          </Row>
                        </CardHeader>
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">id</th>
                              <th scope="col">name</th>
                              <th scope="col">action</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      61090500411
                                    </span>
                                  </Media>
                                </Media>
                              </th>

                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  Natthaphat Wannawat
                                </Badge>
                              </td>
                              <td>
                                <Button
                                  color="success"
                                  //onClick={() => setModalOpen1(!modalOpen1)}
                                  size="sm"
                                  className="icon-requestModal"
                                >
                                  <i class="fas fa-solid fa-check"></i>
                                </Button>
                                <Button
                                  color="danger"
                                  // onClick={() => setModalOpen1(!modalOpen1)}
                                  size="sm"
                                  className="icon-requestModal"
                                >
                                  <i class="fas fa-regular fa-xmark"></i>
                                </Button>
                              </td>
                              <td className="text-right threedot">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                    <DropdownItem
                                      onClick={() => setModalOpen2(!modalOpen2)}
                                    >
                                      Profile
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
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
                  <ModalBody className="profileModal">
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                      <Card className="card-profile shadow">
                        <Row className="justify-content-center">
                          <Col className="order-lg-2" lg="3">
                            <div className="card-profile-image">
                              <a onClick={(e) => e.preventDefault()}>
                                <img
                                  alt="..."
                                  className="rounded-circle img-profileModal"
                                  src={
                                    require("../../assets/img/theme/team-4-800x800.jpg")
                                      .default
                                  }
                                />
                              </a>
                            </div>
                          </Col>
                        </Row>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                          <Row>
                            <div className="col">
                              <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                <div>
                                  <h2 className="heading">61090500411</h2>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="text-center">
                            <h2>Natthaphat Wannawat</h2>
                            <div className="h3 font-weight-300">
                              <i className="ni location_pin mr-2" />
                              Science, Mathematics
                            </div>
                            <hr className="my-4" />
                            <div className="h5 mt-4">
                              <i className="ni business_briefcase-24 mr-2" />
                              Natthaphat.tong@mail.kmutt.ac.th
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>

                <Modal
                  toggle={() => setModalOpen3(!modalOpen3)}
                  isOpen={modalOpen3}
                  size="xl"
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
                    <Row>
                      {" "}
                      <Col xl="4">
                        <Card className="card-profile shadow profileModal">
                          <Row className="justify-content-center">
                            <Col className="order-lg-2" lg="3">
                              <div className="card-profile-image">
                                <a onClick={(e) => e.preventDefault()}>
                                  <img
                                    alt="..."
                                    className="rounded-circle img-profileModal"
                                    src={
                                      require("../../assets/img/theme/team-4-800x800.jpg")
                                        .default
                                    }
                                  />
                                </a>
                              </div>
                            </Col>
                          </Row>
                          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                          <CardBody className="pt-0 pt-md-4">
                            <Row>
                              <div className="col">
                                <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                  <div>
                                    <h2 className="heading">61090500411</h2>
                                  </div>
                                </div>
                              </div>
                            </Row>
                            <div className="text-center">
                              <h2>Natthaphat Wannawat</h2>
                              <div className="h3 font-weight-300">
                                <i className="ni location_pin mr-2" />
                                Science, Mathematics
                              </div>
                              <hr className="my-4" />
                              <div className="h5 mt-4">
                                <i className="ni business_briefcase-24 mr-2" />
                                Natthaphat.tong@mail.kmutt.ac.th
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <ModalBody>
                        <Col className="order-xl-1" xl="12">
                          <row>
                            <Card className="bg-secondary shadow">
                              <CardHeader className="border-0">
                                <Row className="align-items-center">
                                  <div className="col">
                                    <h3 className="mb-0">Report</h3>
                                  </div>
                                  <div className="col text-right">
                                    <h3>CSS411</h3>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col">completed</th>
                                    <th scope="col">absent</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            Quest Check
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      {" "}
                                      <div>
                                        <Button
                                          color="success"
                                          outline
                                          type="button"
                                          id="toggler1"
                                        >
                                          5
                                        </Button>
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        color="danger"
                                        outline
                                        type="button"
                                        id="toggler"
                                      >
                                        1
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Card>
                          </row>
                          <UncontrolledCollapse toggler="#toggler1">
                            <Card className="bg-secondary shadow">
                              <CardHeader className="border-0">
                                <Row className="align-items-center">
                                  <div className="col">
                                    <h3 className="mb-0">Completed</h3>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Quest</th>
                                    <th scope="col" className="col text-right">
                                      details
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            31/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                        onClick={() =>
                                          setModalOpen11(!modalOpen11)
                                        }
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            24/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            17/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>

                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            10/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            3/01/2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        Selfie with a Pen
                                      </Badge>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        className="btn-icon btn-2"
                                        color="dark"
                                        type="button"
                                        size="sm"
                                      >
                                        <i className="ni ni-image" />
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Card>
                          </UncontrolledCollapse>

                          <UncontrolledCollapse toggler="#toggler">
                            <Card className="bg-secondary shadow ">
                              <CardHeader className="border-0">
                                <Row>
                                  <div className="col">
                                    <h3 className="mb-0">Selfie with a pen</h3>
                                  </div>
                                  <div className="col text-right">
                                    <h4>Absent</h4>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Quest</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            7 February 2022
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-danger" />
                                        Selfie with Pillow
                                      </Badge>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Card>
                          </UncontrolledCollapse>
                        </Col>
                      </ModalBody>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen11(!modalOpen11)}
                  isOpen={modalOpen11}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen11(!modalOpen11)}
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
                            <img
                              src="https://www.img.in.th/images/3176e43743c0c9e923693782aa34c326.jpg"
                              width="300"
                              height="450"
                              className="img-fluid shadow-4"
                              alt="..."
                            />
                            <div>
                              <i className="ni education_hat mr-2" />
                              <h2>TIME : 9:47 A.M.</h2>
                            </div>
                            <div className="h3 font-weight-300">
                              <i className="ni location_pin mr-2" />
                              Completed
                            </div>
                            <hr className="my-4" />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen9(!modalOpen9)}
                  isOpen={modalOpen9}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen9(!modalOpen9)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                      <Card className="card-profile shadow profileModal">
                        <Row className="justify-content-center">
                          <Col className="order-lg-2" lg="3">
                            <div className="card-profile-image">
                              <a onClick={(e) => e.preventDefault()}>
                                <img
                                  alt="..."
                                  className="rounded-circle img-profileModal"
                                  src={
                                    require("../../assets/img/theme/team-4-800x800.jpg")
                                      .default
                                  }
                                />
                              </a>
                            </div>
                          </Col>
                        </Row>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                          <Row>
                            <div className="col">
                              <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                <div>
                                  <h2 className="heading">61090500411</h2>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="text-center">
                            <h2>Natthaphat Wannawat</h2>
                            <div className="h3 font-weight-300">
                              Science, Mathematics
                            </div>
                            <hr className="my-4" />
                            <h2 className="text-success">Completed</h2>
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
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen4(!modalOpen4)}
                  isOpen={modalOpen4}
                  size="sm"
                  className="confirm-modal"
                >
                  <div className=" modal-header"></div>
                  <ModalBody>
                    {" "}
                    <span className="font-weight-light">
                      You want to Delete &nbsp;
                      <span className="font-weight-bold">
                        Natthaphat Wannawat
                      </span>
                      &nbsp; ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        //onClick={() => setModalOpen1(!modalOpen1)}
                        className="ml-2 mr-2"
                        size="l"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen4(!modalOpen4)}
                        className="ml-2 mr-2"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen5(!modalOpen5)}
                  isOpen={modalOpen5}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen5(!modalOpen5)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Row>
                      {" "}
                      <Col className="order-xl-1">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Summary</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col" className="td-nonePadding">
                                  name
                                </th>
                                <th scope="col">hour learned</th>
                                <th scope="col">completed</th>
                                <th scope="col">absent</th>
                                <th scope="col" className="text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td className="td-nonePadding">
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name"
                                  >
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    90 %
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />4
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />1
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        Profile
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen3(!modalOpen3)
                                        }
                                      >
                                        Report
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td className="td-nonePadding">
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name"
                                  >
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    90 %
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />5
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />0
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        Profile
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen3(!modalOpen3)
                                        }
                                      >
                                        Report
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500427
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td className="td-nonePadding">
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name"
                                  >
                                    Suriyasak Najaeiei
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    90 %
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />0
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />5
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        Profile
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen3(!modalOpen3)
                                        }
                                      >
                                        Report
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="shadow">
                          <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                              <div className="col">
                                <h2 className="mb-0">Dashboard</h2>
                              </div>
                            </Row>
                          </CardHeader>
                          <CardBody>
                            {/* Chart */}
                            <div className="chart">
                              <img
                                src="https://www.img.in.th/images/f3266bbdac74a856947d039473720428.jpg"
                                className="img-fluid shadow-4"
                                alt="..."
                              />
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen6(!modalOpen6)}
                  isOpen={modalOpen6}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen6(!modalOpen6)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Col className="order-xl-1" xl="12">
                      <row>
                        <Card className="bg-secondary shadow">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Quest Check</h3>
                              </div>
                              <div className="col text-right">
                                <h3>31/1/2021</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Quest</th>
                                <th scope="col">completed</th>
                                <th scope="col">absent</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        Selfie with a pen
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  {" "}
                                  <div>
                                    <Button
                                      color="success"
                                      outline
                                      type="button"
                                      id="toggler1"
                                    >
                                      39
                                    </Button>
                                  </div>
                                </td>
                                <td>
                                  <Button
                                    color="danger"
                                    outline
                                    type="button"
                                    id="toggler"
                                  >
                                    1
                                  </Button>
                                </td>
                                <td></td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        Selfie with a spoon
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  {" "}
                                  <Button color="success" outline type="button">
                                    39
                                  </Button>
                                </td>
                                <td>
                                  <Button color="danger" outline type="button">
                                    1
                                  </Button>
                                </td>
                                <td></td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </row>
                      <UncontrolledCollapse toggler="#toggler1">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Selfie with a pen</h3>
                              </div>
                              <div className="align-items-center">
                                <h4 className="col text-right text-success status-report">
                                  COMPLETED
                                </h4>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </UncontrolledCollapse>

                      <UncontrolledCollapse toggler="#toggler">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row>
                              <div className="col">
                                <h3 className="mb-0">Selfie with a pen</h3>
                              </div>
                              <div className="align-items-center">
                                <h4 className="col text-right text-danger status-report">
                                  ABSENT / LEAVE
                                </h4>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">status</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>

                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Leave
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen13(!modalOpen13)
                                        }
                                      >
                                        See Leave Form
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </UncontrolledCollapse>
                      <row>
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row>
                              <div className="col">
                                <h3 className="mb-0">Summary</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">status</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500411
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-success" />
                                    Natthaphat Wannawat
                                  </Badge>
                                </td>

                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Complete
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen9(!modalOpen9)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge
                                    color=""
                                    className="badge-dot mr-4 short-name2"
                                  >
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Absent
                                  </Badge>
                                </td>

                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen12(!modalOpen12)
                                        }
                                      >
                                        Leave
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>

                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Leave
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen13(!modalOpen13)
                                        }
                                      >
                                        See Leave Form
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        61090500437
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success" />
                                    Natthamon Wannawat
                                  </Badge>
                                </td>
                                <td className="height-statusReport">
                                  <Badge color="" className="badge-dot mr-4">
                                    Complete
                                  </Badge>
                                </td>
                                <td className="text-right threedot">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn-icon-only text-light"
                                      role="button"
                                      size="sm"
                                      color=""
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <i className="fas fa-ellipsis-v" />
                                    </DropdownToggle>
                                    <DropdownMenu
                                      className="dropdown-menu-arrow"
                                      right
                                    >
                                      <DropdownItem
                                        onClick={() =>
                                          setModalOpen2(!modalOpen2)
                                        }
                                      >
                                        See More
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card>
                      </row>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen7(!modalOpen7)}
                  isOpen={modalOpen7}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen7(!modalOpen7)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>777</ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen8(!modalOpen8)}
                  isOpen={modalOpen8}
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen8(!modalOpen8)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>8888</ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen12(!modalOpen12)}
                  isOpen={modalOpen12}
                  size="sm"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen12(!modalOpen12)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h2>Please upload leave form</h2>
                      <img
                        src={
                          require("../../assets/img/theme/img-upload.png")
                            .default
                        }
                        className="img-fluid shadow-4 img-upload"
                        alt="..."
                      />
                    </div>
                    {/* <Button
                      className="btn-icon btn-2 btn-upfile"
                      type="button"
                      size="sm"
                    >
                      Select File 
                    </Button> */}
                    <div class="upload-btn-wrapper text-center">
                      <button class="btn-uploadFile">Select File</button>
                      <input type="file" name="myfile" />
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen13(!modalOpen13)}
                  isOpen={modalOpen13}
                  size="sm"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen13(!modalOpen13)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h2 className="heading-leaveForm">Leave form</h2>
                      <img
                        src={
                          require("../../assets/img/theme/leave_form.jpg")
                            .default
                        }
                        className="img-fluid shadow-4 img-leaveForm"
                        alt="..."
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 header-createQuest">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-3">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats card-quest d-flex justify-content-center mt-md-5"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <h1>QUEST CHECK</h1>
                  <div className="h5 font-weight-300">
                    <h2 className="date-profile">{date}</h2>
                  </div>
                  <div>
                    <Input
                      type="select"
                      placeholder="Department"
                      style={{
                        textAlignVertical: "center",
                        textAlign: "center",
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select Quest
                      </option>

                      <option>Random</option>
                      <option>Bag</option>
                      <option>Banknote</option>
                      <option>Book</option>
                      <option>Bottle</option>
                      <option>Coin</option>
                      <option>Comb</option>
                      <option>Cup</option>
                      <option>Dish</option>
                      <option>Fork</option>
                      <option>Hanger</option>
                      <option>Key</option>
                      <option>Mask</option>
                      <option>Pen</option>
                      <option>Shoe</option>
                      <option>Spoon</option>
                      <option>Tissue</option>
                      <option>Toothpaste</option>
                    </Input>
                  </div>
                  &nbsp;
                  <div>
                    <Input
                      type="select"
                      placeholder="Department"
                      style={{
                        textAlignVertical: "center",
                        textAlign: "center",
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Countdown Time
                      </option>
                      <option>5 minute</option>
                      <option>10 minute</option>
                      <option>15 minute</option>
                      <option>20 minute</option>
                      <option>25 minute</option>
                      <option>30 minute</option>
                    </Input>
                  </div>
                  <div className="text-center">
                    <Button className="mt-4" color="info" type="button">
                      SEND QUEST
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1 mg-b20 margin-b" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Member</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="dark"
                      onClick={() => setModalOpen(!modalOpen)}
                      size="sm"
                    >
                      Invite
                    </Button>
                    <Button
                      color="dark"
                      onClick={() => setModalOpen1(!modalOpen1)}
                      size="sm"
                    >
                      Request
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col" className="td-nonePadding">
                      name
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">61090500411</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding hightBox-profile">
                      <Badge color="" className="badge-dot mr-4  short-name">
                        Natthaphat Wannawat
                      </Badge>
                    </td>
                    <td className="text-right threedot">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            onClick={() => setModalOpen2(!modalOpen2)}
                          >
                            Profile
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setModalOpen3(!modalOpen3)}
                          >
                            Report
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setModalOpen4(!modalOpen4)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <Media className="align-items-center id-member">
                        <Media>
                          <span className="mb-0 text-sm ">61090500437</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding hightBox-profile">
                      <Badge color="" className="badge-dot mr-3 short-name">
                        Natthamon Wannawat
                      </Badge>
                    </td>
                    <td className="text-right threedot">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Profile
                          </DropdownItem>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Report
                          </DropdownItem>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <Media className="align-items-center id-member">
                        <Media>
                          <span className="mb-0 text-sm ">61090500437</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding hightBox-profile">
                      <Badge color="" className="badge-dot mr-3 short-name">
                        Natthamon Wannawat
                      </Badge>
                    </td>
                    <td className="text-right threedot">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Profile
                          </DropdownItem>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Report
                          </DropdownItem>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <Media className="align-items-center id-member">
                        <Media>
                          <span className="mb-0 text-sm ">61090500437</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding hightBox-profile">
                      <Badge color="" className="badge-dot mr-3 short-name">
                        Natthamon Wannawat
                      </Badge>
                    </td>
                    <td className="text-right threedot">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Profile
                          </DropdownItem>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Report
                          </DropdownItem>
                          <DropdownItem onClick={(e) => e.preventDefault()}>
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="5">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Attendence</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="dark"
                      onClick={() => setModalOpen5(!modalOpen5)}
                      size="sm"
                    >
                      Dashboard
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="td-nonePadding4">
                      Date
                    </th>
                    <th scope="col" className="td-nonePadding2">
                      completed
                    </th>
                    <th scope="col" className="td-nonePadding3">
                      absent
                    </th>
                    <th scope="col" className="td-nonePadding5" />
                  </tr>
                </thead>
                <tbody>
                  <tr className="hightBox-profile">
                    <th scope="row" className="td-nonePadding4">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">31/01/2022</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding2">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        39
                      </Badge>
                    </td>
                    <td className="td-nonePadding3">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />1
                      </Badge>
                    </td>

                    <td className="td-nonePadding5">
                      <div className="d-flex align-items-right">
                        <Button
                          color="dark"
                          type="button"
                          onClick={() => setModalOpen6(!modalOpen6)}
                          className="btn-seeMore-attendence"
                        >
                          See More
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {/* <tr className="hightBox-profile">
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">24/01/2022</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding2">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        39
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />1
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex align-items-right">
                        <Button
                          color="dark"
                          type="button"
                          className="btn-seeMore-attendence"
                        >
                          See More
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hightBox-profile">
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">17/01/2022</span>
                        </Media>
                      </Media>
                    </th>

                    <td className="td-nonePadding2">
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        39
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />1
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex align-items-right">
                        <Button
                          color="dark"
                          type="button"
                          className="btn-seeMore-attendence"
                        >
                          See More
                        </Button>
                      </div>
                    </td>
                  </tr> */}
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