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
  Modal, ModalBody, ModalFooter,
  
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
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
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
  const [copiedText, setCopiedText] = useState();

  return (
    <>
    
      <UserHeader />
      {/* Page content */}
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} size="md">
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
        <ModalBody>   <div className="text-center"> <h2 className="mb-0">CSS111 Software Engineer</h2><img src='https://maesot.kpru.ac.th/wp-content/uploads/2018/01/maesot.png' className='img-fluid shadow-4' alt='...' />
        <CopyToClipboard
                      text={"https://tftactics.gg/tierlist/team-comps"}
                      onCopy={() => setCopiedText("https://tftactics.gg/tierlist/team-comps")}
                    >
                      <button
                        className="btn-icon-clipboard "
                        id="tooltip982655500"
                       
                        type="button"
                      >
                        <div >
                        <i className="ni ni-active-40" />
                          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Link : https://tftactics.gg/tierlist/team-comps</h4>
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
                    </UncontrolledTooltip></div></ModalBody>
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      
      <Modal toggle={() => setModalOpen1(!modalOpen1)} isOpen={modalOpen1}size="lg">
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
        <ModalBody> <Col className="order-xl-1" >
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
                  <tr>
                  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    
                    <td><Badge color="" className="badge-dot mr-4">
                       
                        Natthaphat Wannawat
                      </Badge></td>
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
                    </Button></td>
                    
                
                   
                  </tr>
                  
                  
                </tbody>
              </Table>
            
            </Card>
          </Col></ModalBody>
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen2(!modalOpen2)} isOpen={modalOpen2}>
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
        <ModalBody><Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">61090500411</span>
                        <span className="description">Student-ID</span>
                      </div>
                     
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h2>
                    Natthaphat Wannawat 
                   
                  </h2>
                  <div className="h3 font-weight-300">
                    <i className="ni location_pin mr-2" />
                   Science, Mathematics
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Natthaphat.tong@mail.kmutt.ac.th
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                  
                  </div>
                  <hr className="my-4" />
                 
                </div>
              </CardBody>
            </Card>
          </Col></ModalBody>
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      
      <Modal toggle={() => setModalOpen3(!modalOpen3)} isOpen={modalOpen3} size="xl">
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
        <ModalBody><Row> <Col xl="4">
          <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
                
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">61090500411</span>
                        <span className="description">Student-ID</span>
                      </div>
                     
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h2>
                    Natthaphat Wannawat
                   
                  </h2>
                  <div className="h3 font-weight-300">
                    <i className="ni location_pin mr-2" />
                   Science, Mathematics
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Natthaphat.tong@mail.kmutt.ac.th
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                  
                  </div>
                  <hr className="my-4" />
                 
                </div>
              </CardBody>
            </Card>
          </Col><ModalBody><Col className="order-xl-1" xl="12">
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">completed </th>
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
                    
                    <td> <div>
  
      <Button color="success" outline type="button" id="toggler1" >
      5
    </Button>
  </div>
        </td>
                    <td>
                    <Button color="danger" outline type="button" id="toggler">
         1
        </Button>
                    </td>
                    
                    
                   
                  </tr>
                 
                  
                </tbody>
              </Table>
            
            </Card>
            </row>
            <UncontrolledCollapse toggler="#toggler1" >
        <Card className="bg-secondary shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Completed</h3>
                  </div>
               
                 
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Quest</th>
                    <th scope="col" className="col text-right">details</th>
             
            
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                           31 january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Selfie with a Pen
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm" onClick={() => setModalOpen11(!modalOpen11)}> 
        
        <i className="ni ni-image" />
     
    </Button>
                    </td>
                    
                
                   
                  </tr>
                  
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                          24 january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Selfie with a Pen
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm">
        
        <i className="ni ni-image" />
     
    </Button>
                    </td>
                    
                
                   
                  </tr>
                
                 
                  
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                          17january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Selfie with a Pen
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm">
        
        <i className="ni ni-image" />
     
    </Button>
                    </td>
                    
                
                   
                  </tr>

                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                          10january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Selfie with a Pen
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm">
        
        <i className="ni ni-image" />
     
    </Button>
                    </td>
                    
                
                   
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                          3january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Selfie with a Pen
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm">
        
        <i className="ni ni-image" />
     
    </Button>
                    </td>
                    
                
                   
                  </tr>
                </tbody>
              </Table>
            
            </Card>
    </UncontrolledCollapse>

    <UncontrolledCollapse toggler="#toggler" >
    
    <Card className="bg-secondary shadow ">
            <CardHeader className="border-0">
                <Row >
                  <div className="col">
                    <h3 className="mb-0">Selfie with a pen</h3>
                  </div>
                  <div className="col text-right">
             
                     <h4>Absent</h4>
                   
                    
                  </div>
                  
                 
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Selfie with Pillow
                      </Badge></td>
                   
                    
                
                   
                  </tr>
                </tbody>
              </Table>
            
            </Card>
           
    </UncontrolledCollapse>
          </Col>
          
          
          </ModalBody></Row></ModalBody>
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen11(!modalOpen11)} isOpen={modalOpen11} size="lg">
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
        <ModalBody> <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">


              <CardBody className="pt-0 pt-md-4">

                <div className="text-center">

                  <img src='https://www.img.in.th/images/3176e43743c0c9e923693782aa34c326.jpg' width="200" height="350"className='img-fluid shadow-4' alt='...' />
                  <div>
                    <i className="ni education_hat mr-2" />
                    <h2>
                   
                            " Selfie with a pen "
                       </h2>
                    <h4>
                     Completed

                  </h4>
                  </div>
                  <div className="h3 font-weight-300">
                
                61090500411
          </div>
          <div className="h3 font-weight-300">
                Natthaphat Wannawat
          </div>
               
                  <hr className="my-4" />

                </div>
              </CardBody>
            </Card>
          </Col></ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen9(!modalOpen9)} isOpen={modalOpen9} size="md">
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
        <ModalBody> <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">61090500411</span>
                        <span className="description">Student-ID</span>
                      </div>
                     
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h2>
                    Natthaphat Wannawat 
                   
                  </h2>
                  <div className="h3 font-weight-300">
                    <i className="ni location_pin mr-2" />
                   Science, Mathematics
                  </div>
                  <img src='https://www.img.in.th/images/3176e43743c0c9e923693782aa34c326.jpg' width="180" height="360"className='img-fluid shadow-4' alt='...' />
                  <div>
                    <i className="ni education_hat mr-2" />
                    <h2>
                    TIME : 9:47 A.M.
                   
                  </h2>
                  </div>
                  <div className="h3 font-weight-300">
                    <i className="ni location_pin mr-2" />
                   Completed
                  </div>
                  <hr className="my-4" />
                 
                </div>
              </CardBody>
            </Card>
          </Col></ModalBody>
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen4(!modalOpen4)} isOpen={modalOpen4} size="sm">
        <div className=" modal-header">
      
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen4(!modalOpen4)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>   < p className="font-weight-light" >You want to Delete Natthaphat Wannawat ?</p>
        <div className="col text-right">
             
        <Button
                      color="success"
                      href="#pablo"
                      //onClick={() => setModalOpen1(!modalOpen1)}
                      size="sm"
                      
                    >
                      Confirm
                    </Button>
                    <Button
                      color="danger"
                      href="#pablo"
                     // onClick={() => setModalOpen1(!modalOpen1)}
                      size="sm"
                      
                    >
                      Cancel
                    </Button>
           
            
          </div> </ModalBody>
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen5(!modalOpen5)} isOpen={modalOpen5} size="xl">
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
        <ModalBody><Row> <Col className="order-xl-1" xl="7">
            <Card className="bg-secondary shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Summary</h3>
                  </div>
             
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
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
                           61090500411
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        Natthaphat Wannawat
                      </Badge></td>
                      <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                       4
                      </Badge></td>
                    <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                      1
                      </Badge>
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        Natthamon Wannawat
                      </Badge></td>
                      <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                       5
                      </Badge></td>
                    <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                      0
                      </Badge>
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        Suriyasak Najaeiei
                      </Badge></td>
                      <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                       0
                      </Badge></td>
                    <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                      5
                      </Badge>
                    </td>
                    
                
                   
                  </tr>
                </tbody>
              </Table>
            
            </Card>
          </Col><Col xl="5">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      CSS111 Software Engineer
                    </h6>
                    <h2 className="mb-0">Dashboard</h2>
                    
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                <img src='https://www.img.in.th/images/f3266bbdac74a856947d039473720428.jpg' className='img-fluid shadow-4' alt='...' />
                </div>
              </CardBody>
            </Card>
          </Col></Row></ModalBody>
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen6(!modalOpen6)} isOpen={modalOpen6}size="lg">
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
        <ModalBody><Col className="order-xl-1" xl="12">
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Quest</th>
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
                           Selfie with a pen 
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td> <div>
  
      <Button color="success" outline type="button" id="toggler1" >
      39
    </Button>
  </div>
        </td>
                    <td>
                    <Button color="danger" outline type="button" id="toggler">
         1
        </Button>
                    </td>
                    
                    
                   
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
                    
                    <td> <Button color="success" outline type="button"  >
         39
        </Button>
        </td>
                    <td>
                    <Button color="danger" outline type="button">
         1
        </Button>
                    </td>
               
                   
                  </tr>
                 
                  
                </tbody>
              </Table>
            
            </Card>
            </row>
            <UncontrolledCollapse toggler="#toggler1" >
        <Card className="bg-secondary shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Selfie with a pen</h3>
                  </div>
                  <div className="align-items-center">
             
                     <h4 >Completed</h4>
                   
                    
                  </div>
                  
                 
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col" className="col text-right">details</th>
             
            
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Natthaphat Wannawat
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm" onClick={() => setModalOpen9(!modalOpen9)}>
        
        <i className="ni ni-image" />
     
    </Button>
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Natthamon Wannawat
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm">
        
        <i className="ni ni-image" />
     
    </Button>
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Natthamon Wannawat
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm">
        
            <i className="ni ni-image" />
         
        </Button>
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Natthamon Wannawat
                      </Badge></td>
                      <td className="text-right">
                      <Button className="btn-icon btn-2" color="dark" type="button" size="sm">
        
        <i className="ni ni-image" />
     
    </Button>
                    </td>
                    
                
                   
                  </tr>
                </tbody>
              </Table>
            
            </Card>
    </UncontrolledCollapse>

    <UncontrolledCollapse toggler="#toggler" >
    
    <Card className="bg-secondary shadow ">
            <CardHeader className="border-0">
                <Row >
                  <div className="col">
                    <h3 className="mb-0">Selfie with a pen</h3>
                  </div>
                  <div className="col text-right">
             
                     <h4>Absent</h4>
                   
                    
                  </div>
                  
                 
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    
             
            
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Natthaphat Wannawat
                      </Badge></td>
                     
                    
                
                   
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger"/>
                        Natthamon Wannawat
                      </Badge></td>
                 
                    
                
                   
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Natthamon Wannawat
                      </Badge></td>
                    
                    
                
                   
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
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        Natthamon Wannawat
                      </Badge></td>
                   
                    
                
                   
                  </tr>
                </tbody>
              </Table>
            
            </Card>
           
    </UncontrolledCollapse>
          </Col>
          
          
          </ModalBody>
        <ModalFooter>
        
        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen7(!modalOpen7)} isOpen={modalOpen7} size="md">
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
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      <Modal toggle={() => setModalOpen8(!modalOpen8)} isOpen={modalOpen8}>
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
        <ModalFooter>
  
        </ModalFooter>
      </Modal>
      <Container className="mt--7 " fluid >
        <Row >
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
              
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                 
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-3">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      
                    </div>
                  </div>
                </Row>
                <div className="text-center">
               
                  <div className="h1 font-weight-300">
                  <h2 className="date-profile">{date}</h2>

                  </div>
                  <div>
                  <h1 className="mb-0">" Selfie with a Pen "</h1>
                  
                  <h4 className="mb-0" >TIME REMAING : 5 min</h4>
            
                  </div>
                  <div className="text-center">
                <Button className="mt-4" color="dark" type="button">
               LET'S DO QUEST
                </Button>
              </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          
          <Col className="order-xl-1" xl="4">
            <Card className="bg-secondary shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">CSS111</h3>
                  </div>
                  <div className="col text-right">
                 
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    
                    <th scope="col" className="td-nonePadding">Status</th>
             
                    <th scope="col" className="td-nonePadding">details</th>
             
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                           31 january 2022
                          </span>
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
                      <Button color="dark" type="button" size="sm" onClick={() => setModalOpen11(!modalOpen11)}>
                      <i className="ni ni-album-2" />
                </Button>
                      </div>
                    </td>
                   
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                           24 january 2022
                          </span>
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
                      
                      </div>
                    </td>
                   
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                           17 january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                  
                    <td className="td-nonePadding hightBox-profile">
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                      Leave
                      </Badge>
                    </td>
                    
                    <td className="td-nonePadding hightBox-profile">
                      <div className="d-flex align-items-center">
                    
                      </div>
                    </td>
                   
                  </tr>
                  {/* <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                           10 january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                       39
                      </Badge></td>
                    <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                      1
                      </Badge>
                    </td>
                    
                    <td>
                      <div className="d-flex align-items-center">
                      <Button color="dark" type="button">
                      See all
                </Button>
                      </div>
                    </td>
                   
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                           3 january 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                       39
                      </Badge></td>
                    <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                      1
                      </Badge>
                    </td>
                    
                    <td>
                      <div className="d-flex align-items-center">
                      <Button color="dark" type="button">
                      See all
                </Button>
                      </div>
                    </td>
                   
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                           27 December 2022
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                       39
                      </Badge></td>
                    <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                      1
                      </Badge>
                    </td>
                    
                    <td>
                      <div className="d-flex align-items-center">
                      <Button color="dark" type="button">
                      See all
                </Button>
                      </div>
                    </td>
                   
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                     
                        <Media>
                          <span className="mb-0 text-sm">
                          20 December 2021
                          </span>
                        </Media>
                      </Media>
                    </th>
                    
                    <td><Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                       40
                      </Badge></td>
                    <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                     0
                      </Badge>
                    </td>
                  
                    <td>
                      <div className="d-flex align-items-center">
                     
                      <Button color="dark" type="button">
                      See all
                </Button>
                      </div>
                     
                    </td>
                   
                  </tr> */}
                  
                </tbody>
              </Table>
            
            </Card>
          </Col>
 
          
        </Row>
        <Row>
          
        </Row>
      </Container>
    </>
  );
};

export default Profile;
