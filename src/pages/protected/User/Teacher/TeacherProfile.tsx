import React, { useCallback } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Tab, Nav } from "react-bootstrap";
import { Users, BookOpen, Calendar, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./TeacherProfile.scss";
import TeacherImg from "../../../../assets/images/teacher.jpg";

const instructor = {
    name: "Nguyễn Thị A",
    school: "Tiểu học FPT",
    yearsExperience: 8,
    totalStudents: 25,
    classes: [
        { id: 1, title: "Toán", time: "09:00 AM", grade: "Lớp 3", studentsCount: 22 },
        { id: 2, title: "Tiếng Việt", time: "10:30 AM", grade: "Lớp 3", studentsCount: 23 },
        { id: 3, title: "Tự nhiên và xã hội", time: "01:00 PM", grade: "Lớp 3", studentsCount: 21 }
    ],
    tests: [
        { id: 1, subject: "Toán", description: "Phép cộng, phép trừ trong phạm vi 1000", date: "15/02/2025" },
        { id: 2, subject: "Tiếng Việt", description: "Ngày gặp lại", date: "20/02/2025" },
        { id: 3, subject: "Tự nhiên và xã hội", description: "Cơ quan thần kinh", date: "25/02/2025" }
    ],
    recent_class: [
        { id: 1, name: "SE1", time: "2022-2023" },
        { id: 2, name: "SE2", time: "2021-2022" },
        { id: 3, name: "SE3", time: "2020-2021" }
    ]
};

const TeacherProfile = () => {
    const navigate = useNavigate();
    const handleNavigate = useCallback((id) => navigate(`/teacher/class-detail?classroomId=${id}`), [navigate]);

    return (
        <Container className="py-4">
            <Card className="instructor-header mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <img src={TeacherImg} alt="Instructor avatar" className="rounded-circle instructor-avatar" />
                        </Col>
                        <Col>
                            <h1 className="instructor-name">{instructor.name}</h1>
                            <p className="instructor-subject mb-2">{instructor.school}</p>
                            <Badge bg="info" className="stats-badge">
                                <BookOpen size={16} className="me-1" />
                                {instructor.yearsExperience} năm kinh nghiệm
                            </Badge>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Row>
                <Col lg={8}>
                    <Tab.Container defaultActiveKey="classes">
                        <Card className="mb-4">
                            <Card.Header>
                                <Nav variant="tabs">
                                    <Nav.Item>
                                        <Nav.Link eventKey="classes">
                                            <Calendar size={16} className="me-1" /> Lớp
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="tests">
                                            <BarChart2 size={16} className="me-1" /> Danh sách bài thi
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Content>
                                    <Tab.Pane eventKey="classes">
                                        <ListGroup variant="flush">
                                            {instructor.classes.map((class_) => (
                                                <ListGroup.Item key={class_.id} className="class-item" onClick={() => handleNavigate(class_.id)}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h5 className="mb-1">{class_.title}</h5>
                                                            <p className="mb-0 text-muted">{class_.grade}</p>
                                                        </div>
                                                        <Badge bg="secondary">
                                                            <Users size={14} className="me-1" /> {class_.studentsCount} Học sinh
                                                        </Badge>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tests">
                                        <Row>
                                            {instructor.tests.map((test) => (
                                                <Col md={6} key={test.id} className="mb-3">
                                                    <Card className="test-card" onClick={() => navigate(`/teacher/test-result/${test.id}`)}>
                                                        <Card.Body>
                                                            <h5 className="test-title">{test.subject}</h5>
                                                            <p className="test-description">{test.description}</p>
                                                            <p className="test-date text-muted">Ngày: {test.date}</p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>

                <Col lg={4}>
                    <Card className="notifications-card">
                        <Card.Header>
                            <h5 className="mb-0">Các lớp học gần đây</h5>
                        </Card.Header>
                        <ListGroup variant="flush">
                            {instructor.recent_class.map((notif) => (
                                <ListGroup.Item key={notif.id} className="class-item">
                                    <p className="mb-1">{notif.name}</p>
                                    <small className="text-muted">{notif.time}</small>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TeacherProfile;
