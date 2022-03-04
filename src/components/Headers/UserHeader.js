
import { Button, Container, Row, Col,Modal, ModalBody, ModalFooter, } from "reactstrap";
import React, { useState } from "react";
import "assets/scss/argon-dashboard/custom/UserHeader.scss";

const UserHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            require("../../assets/img/theme/KMUTT01.jpg").default +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Software Engineer</h1>
              <p className="text-white mt-0 mb-5">
               MONDAY 9.00-12.00 a.m.
              </p>
              {/* <Button
                color="dark"
                href="#pablo"
                size="sm"
                className="edit-classroom"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Edit Classroom
              </Button>

              <Modal
                  toggle={() => setModalOpen(!modalOpen)}
                  isOpen={modalOpen}
                  size="sm"
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
                      <h2 className="heading-leaveForm">Edit Classroom</h2>
                      <Button
                        color="dark"
                        href="#pablo"
                        size="sm"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        Save
                      </Button>
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
