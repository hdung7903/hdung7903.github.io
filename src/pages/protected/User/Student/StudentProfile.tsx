import React from "react";
import { Container, Row, Col, Card, Badge, Tabs, Tab, Nav } from "react-bootstrap";
import { BookOpen, CheckCircle, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import "./StudentProfile.scss";
import { useNavigate } from "react-router-dom";
import StudentImg from "../../../../assets/images/student.jpg";

const StudentProfile = () => {
    const navigate = useNavigate();
    const student = {
        name: "Trần Đức Trung",
        grade: "Lớp 1",
        classes: [
            { id: 1, title: "Toán", teacher: "Mrs. Emily Johnson" },
            { id: 2, title: "Tiếng Anh", teacher: "Mr. John Smith" },
            { id: 3, title: "Khoa Học", teacher: "Ms. Olivia Brown" },
            { id: 4, title: "Lịch Sử", teacher: "Dr. Robert Davis" },
        ],
        testHistory: [
            { id: 1, subject: "Toán", testName: "Toán 1", score: 85, date: "2024-01-15" },
            { id: 2, subject: "Tiếng Anh", testName: "Thì hiện tại", score: 78, date: "2024-01-20" },
            { id: 3, subject: "Khoa Học", testName: "Cơ quan cơ thể", score: 92, date: "2024-02-01" }
        ]
    };

    return (
        <Container className="py-4">
            {/* Header Card */}
            <Card className="profile-header mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <div className="position-relative">
                                <img
                                    src={StudentImg}
                                    alt="Student avatar"
                                    className="rounded-circle student-avatar"
                                />
                            </div>
                        </Col>
                        <Col>
                            <h1 className="student-name">{student.name}</h1>
                            <p className="student-grade mb-0">{student.grade}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Tabs Section */}
            <Tab.Container defaultActiveKey="classes">
                <Nav variant="tabs" className="mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="classes">
                            <BookOpen size={20} className="me-2" />
                            Lớp 
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="test-history">
                            <ClipboardList size={20} className="me-2" />
                            Lịch sử thi
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    {/* Classes Tab */}
                    <Tab.Pane eventKey="classes">
                        <div className="mb-4">
                            {student.classes.map((classItem) => (
                                <Card key={classItem.id} className="mb-3 class-card" onClick={() => { navigate(`/student/class-detail?classroomId=${classItem.id}`); }}>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="class-title">{classItem.title}</h5>
                                            <p className="class-teacher">Giáo Viên: {classItem.teacher}</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab.Pane>

                    {/* Test History Tab */}
                    <Tab.Pane eventKey="test-history">
                        <div>
                            <Row xs={1} md={2} className="g-4">
                                {student.testHistory.map((test) => (
                                    <Col key={test.id}>
                                        <Card className="test-history-card text-center">
                                            <Card.Body>
                                                <h4 className="test-subject">Môn: {test.subject}</h4>
                                                <p className="test-name">Tên bài thi: {test.testName}</p>
                                                <h5 className="test-score">Điểm: {test.score}%</h5>
                                                <p className="test-date">
                                                    Ngày: {format(new Date(test.date), "MMMM dd, yyyy")}
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default StudentProfile;
