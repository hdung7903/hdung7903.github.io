import {
  faEye,
  faFolderClosed,
  faGear,
  faPaperclip,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "flag-icons/css/flag-icons.min.css";
import React from "react";

import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

const ExamList: React.FC = () => {
  return (
    <section id="exam-list">
      <Container>
        <Row className="row first-row mb-5 border-bottom pb-5">
          <Col lg={6} className="col-lg-6">
            <div className="singel-blog ">
              <div className="blog-thum">
                <img src="/src/assets/images/exam/banner.webp" alt="Blog" />
              </div>
            </div>
          </Col>
          <Col lg={6} className="col-lg-6 d-flex align-items-center">
            <div className="blog-cont">
              <div className="mb-4">
                <h3 className="m-0">
                  <span className="text-yellow">Submit</span> your own exams
                </h3>
              </div>

              <p className="mb-4">
                Lorem ipsum gravida nibh vel velit auctor aliquetn
                sollicitudirem quibibendum auci elit cons equat ipsutis sem
              </p>
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  size="lg"
                  className="px- py-3 rounded-4"
                >
                  <FontAwesomeIcon icon={faPaperclip} className="me-4" />
                  <span className="fw-semibold me-3"> Select File</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <span className="fs-5">
                      <FontAwesomeIcon icon={faFolderClosed} /> From my computer
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <span className="fs-5">
                      <FontAwesomeIcon icon={faPaperclip} /> By URL
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <span className="fs-5">
                      <FontAwesomeIcon icon={faGoogleDrive} /> From Google Drive
                    </span>
                  </Dropdown.Item>

                  <Dropdown.Item href="#/action-3">
                    <span className="fs-5">
                      <FontAwesomeIcon icon={faGear} /> Add manually
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <div className="blog-cont mb-5 d-flex justify-content-between">
          <h3 className="me-5">
            <span className="text-yellow">Exams</span> submited
          </h3>
          <div
            className="search-container"
            // style={{
            //   position: "absolute",
            //   bottom: "-30px",
            //   left: "50%",
            //   transform: "translateX(-50%)",
            //   width: "100%",
            //   zIndex: 10, // Increased z-index
            //   padding: "0 15px",
            // }}
          >
            <InputGroup
              size="lg"
              className="mx-auto"
              style={{
                maxWidth: "600px",
                background: "white",
                borderRadius: "10px",
                overflow: "visible",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <InputGroup.Text className="bg-white border-0">
                <i className="fa fa-search text-muted"></i>
              </InputGroup.Text>

              <Form.Control
                placeholder="Search"
                className="border-0 shadow-none"
                style={{ boxShadow: "none" }}
              />

              <InputGroup.Text className="bg-white border-0">
                <i className="fa fa-times-circle text-muted"></i>
              </InputGroup.Text>

              <Dropdown align="end" className="topic-dropdown">
                <Dropdown.Toggle
                  variant="white"
                  className="border-0 h-100"
                  style={{
                    backgroundColor: "white",
                    borderLeft: "1px solid #dee2e6",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  Topic
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #dee2e6",
                    borderRadius: "8px",
                    marginTop: "4px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    zIndex: 1050,
                  }}
                >
                  <Dropdown.Item>Topic 1</Dropdown.Item>
                  <Dropdown.Item>Topic 2</Dropdown.Item>
                  <Dropdown.Item>Topic 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </InputGroup>
          </div>
        </div>
        <Row className="bg-dark-subtle px-lg-5 py-4 rounded-5 mb-4 px-sm-3">
          <Col
            sm={12}
            lg={6}
            className="d-flex flex-lg-column flex-sm-row justify-content-between mb-sm-4 mb-lg-0 align-items-sm-center align-items-lg-start"
          >
            <div className="">
              <h3 className="exam-title">
                <strong>SAT Test Practice 1</strong>
              </h3>
            </div>

            <div className="d-flex justify-content-start flex-sm-row-reverse flex-lg-row">
              <Button
                className="me-lg-3 me-sm-0 px-4 rounded-pill fs-5"
                variant="primary"
              >
                Public
              </Button>
              <Button className="me-lg-3 me-sm-3 rounded-5" variant="light">
                <FontAwesomeIcon icon={faEye} />
              </Button>
              <Button className="rounded-5 me-sm-3" variant="light">
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </div>
          </Col>
          <Col className="d-flex justify-content-start">
            <div
              className="bg-light rounded-5 p-2 me-3"
              style={{ height: "100%" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                width="75"
                height="75"
              >
                <rect width="256" height="256" fill="none" />
                <line
                  x1="32"
                  y1="64"
                  x2="32"
                  y2="144"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
                <path
                  d="M56,216c15.7-24.08,41.11-40,72-40s56.3,15.92,72,40"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
                <polygon
                  points="224 64 128 96 32 64 128 32 224 64"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
                <path
                  d="M169.34,82.22a56,56,0,1,1-82.68,0"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
              </svg>
            </div>

            <div className="d-flex flex-column align-items-start justify-content-center">
              <div>
                <h5>
                  <strong>175</strong>
                </h5>
              </div>
              <div>
                <h6 className="fw-light">Student tested</h6>
              </div>
            </div>
          </Col>
          <Col className="d-flex justify-content-start">
            <div
              className="bg-light rounded-5 p-2 me-3"
              style={{ height: "100%" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                width="75"
                height="75"
              >
                <rect width="256" height="256" fill="none" />
                <path
                  d="M32,216V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V216l-32-16-32,16-32-16L96,216,64,200Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
                <polyline
                  points="64 160 96 96 128 160"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
                <line
                  x1="72"
                  y1="144"
                  x2="120"
                  y2="144"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
                <line
                  x1="144"
                  y1="128"
                  x2="192"
                  y2="128"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
                <line
                  x1="168"
                  y1="104"
                  x2="168"
                  y2="152"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                />
              </svg>
            </div>

            <div className="d-flex flex-column align-items-start justify-content-center">
              <div>
                <h5>
                  <strong>90%</strong>
                </h5>
              </div>
              <div>
                <h6 className="fw-light">Avarage grade</h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ExamList;
