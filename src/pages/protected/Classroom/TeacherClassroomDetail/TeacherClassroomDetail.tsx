import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Tabs, Tab, Table, Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import LoadingLink from "../../../../components/common/links/LoadingLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faArrowLeft,
  faUsers,
  faClock,
  faCalendarAlt,
  faFileAlt,
  faUser,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./classroom-detail.css";

function TeacherClassroomDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [classroomData, setClassroomData] = useState([]);
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    content: "",
    teacher: "",
    deadline: "",
    materials: "",
    topics: "",
    instructions: "",
    maxPoints: 100
  });

  // Mock Example Data for UI Testing with enhanced details
  const mockClassroomData = [
    {
      id: "1",
      title: "Math Homework",
      content: "Complete algebra exercises from chapter 5.",
      fileName: "algebra_homework.pdf",
      teacher: {
        name: "Dr. Smith",
        avatar: "https://example.com/avatar.jpg"
      },
      createdAt: "2024-02-05T14:30:00",
      deadline: "2024-02-12T23:59:59",
      materials: [
        { id: "m1", name: "Chapter 5 Exercises.pdf", type: "pdf" },
        { id: "m2", name: "Formula Sheet.docx", type: "document" }
      ],
      maxPoints: 100,
      topics: ["Algebra", "Equations"],
      instructions: "Please complete all exercises from 5.1 to 5.4. Show all your work and submit as a single PDF file."
    },
    {
      id: "2",
      title: "Science Project",
      content: "Prepare a presentation on the Solar System.",
      fileName: "solar_system.pptx",
      teacher: {
        name: "Mrs. Johnson",
        avatar: "https://example.com/avatar2.jpg"
      },
      createdAt: "2024-02-08T10:15:00",
      deadline: "2024-02-20T23:59:59",
      materials: [
        { id: "m3", name: "Project Guidelines.pdf", type: "pdf" },
        { id: "m4", name: "Template.pptx", type: "presentation" }
      ],
      maxPoints: 150,
      topics: ["Solar System", "Astronomy"],
      instructions: "Create a 10-minute presentation about one planet in our solar system. Include at least 5 interesting facts and 3 images."
    }
  ];

  const mockStudents = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "2", name: "Bob Smith", email: "bob@example.com" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com" }
  ];

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const classroomId = urlParams.get("classroomId");
      setId(classroomId || "mock-id");

      if (classroomId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API}/classroom-content/classroom`,
            { params: { classroomId } }
          );
          setClassroomData(response.data.length > 0 ? response.data : mockClassroomData);
        } catch (error) {
          console.error("Error fetching classroom details:", error);
          setClassroomData(mockClassroomData);
        }
      } else {
        setClassroomData(mockClassroomData);
      }
    };

    fetchClassroomDetails();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API}/classroom-content/students`,
            { params: { classroomId: id } }
          );
          setStudents(response.data.length > 0 ? response.data : mockStudents);
        } catch (error) {
          console.error("Error fetching student list:", error);
          setStudents(mockStudents);
        }
      }
    };

    fetchStudents();
  }, [id]);

  const handleDownload = async (contentId, fileName) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/classroom-content/download/${contentId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "downloaded_file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddAssignment = () => {
    const newEntry = {
      id: String(classroomData.length + 1),
      ...newAssignment,
      teacher: { name: newAssignment.teacher },
      createdAt: new Date().toISOString(),
      materials: newAssignment.materials.split(",").map((m) => m.trim()),
      topics: newAssignment.topics.split(",").map((t) => t.trim())
    };

    setClassroomData([...classroomData, newEntry]);
    setShowAddModal(false);
    setNewAssignment({
      title: "",
      content: "",
      teacher: "",
      deadline: "",
      materials: "",
      topics: "",
      instructions: "",
      maxPoints: 100
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="classroom-detail-header">
        <div className="cluster-header">
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginBottom: "20px", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h1 style={{ marginBottom: "20px", marginLeft: "20px" }}>
            Classroom
          </h1>
        </div>
        <div>

        </div>
      </div>
      <Container>
        {/* Tab Navigation */}
        <Tabs defaultActiveKey="classroom-data" id="classroom-tabs" className="mb-4">
          <Tab eventKey="classroom-data" title="Lớp học">
            <Container className="px-0">
              <Row className="mb-4 align-items-center">
                <Col xs={12} sm="auto" className="mb-2 mb-sm-0">
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "#07294d",
                      border: "none",
                      padding: "0.5rem 1rem",
                      fontWeight: "500"
                    }}
                    onClick={() => setShowAddModal(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Thêm bài tập
                  </Button>
                </Col>
                <Col xs={12} sm="auto">
                  <LoadingLink
                    className="btn btn-secondary"
                    to={`/upload?classroomId=${id}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem"
                    }}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    <span>Tải tài liệu cho AI</span>
                  </LoadingLink>
                </Col>
              </Row>

              <Row>
                <Col>
                  {classroomData.map((assignment) => (
                    <Card
                      key={assignment.id}
                      className="mb-3 shadow-sm"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowModal(true);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <Card.Header className="bg-light">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                          <span className="fw-medium">{assignment.teacher.name} đã thêm một bài tập mới</span>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title className="mb-3">{assignment.title}</Card.Title>
                        <div className="text-muted small">
                          <div className="mb-2">
                            <FontAwesomeIcon icon={faClock} className="me-2" />
                            Posted: {formatDate(assignment.createdAt)}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Container>
          </Tab>

          <Tab eventKey="students" title="Danh sách học sinh">
            <Container className="px-0">
              <div className="students-list-container">
                {students.length > 0 ? (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>#</th>
                        <th style={{ width: "10%" }}>Tên học sinh</th>
                        <th style={{ width: "10%" }}>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.name}</td>
                          <td>{student.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>Không có học sinh trong lớp này.</p>
                )}
              </div>
            </Container>
          </Tab>
        </Tabs>
      </Container>

      {/* Assignment Detail Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="assignment-modal"
      >
        {selectedAssignment && (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="assignment-modal">
                {selectedAssignment.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <strong>Giáo viên:</strong> {selectedAssignment.teacher.name}
              </div>
              <div className="mb-3">
                <strong>Thời gian đăng:</strong> {formatDate(selectedAssignment.createdAt)}
              </div>          
              <div className="mb-3">
                <strong>Hướng dẫn:</strong>
                <p>{selectedAssignment.instructions}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control type="text" onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nội dung</Form.Label>
              <Form.Control type="text" onChange={(e) => setNewAssignment({ ...newAssignment, instructions : e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddAssignment}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeacherClassroomDetail;