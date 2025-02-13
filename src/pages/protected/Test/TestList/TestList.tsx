import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CustomButton from "../../../../components/common/button/custom-button/Custom-Button";

import "./testlist.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";

const TestList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [tests] = useState([
    {
      id: 1,
      title: "Bài thi 1",
      createdBy: "Nguyễn Văn A",
      totalTime: 60, // in minutes
      subject: "Toán",
      grade: "3",
    },
    {
      id: 2,
      title: "Bài thi 2",
      createdBy: "Nguyễn Văn B",
      totalTime: 45,
      subject: "Tiếng Anh",
      grade: "4",
    },
    {
      id: 3,
      title: "Bài thi 3",
      createdBy: "Nguyễn Văn C",
      totalTime: 90,
      subject: "Lịch sử",
      grade: "5",
    },
  ]);
  const navigate = useNavigate();

  const handleCreateTest = () => {
    navigate("/upload-quiz");
  };

  return (
    <div className="min-vh-100">
    <Container className="my-4">
      {auth.user?.roles[0] === "teacher" && (
        <div className="button-create-test">
          <CustomButton
            width="400px"
            height="31px"
            border="1px solid #1A61CF;"
            title="Tạo đề thi với AI"
            color="black"
            backgroundColor="transparent"
            icon="../src/assets/images/all-icon/lock.svg"
            onClick={handleCreateTest}
          />
        </div>
      )}


      <Row xs={1} md={3} className="g-4">
        {tests.map((test) => (
          <Col key={test.id}>
            <Card>
              <Card.Body>
                <Card.Title>{test.title}</Card.Title>
                <Card.Text>
                  <div className="mb-2">
                    <strong>Tạo bởi:</strong> {test.createdBy}
                  </div>
                  <div className="mb-2">
                    <strong>Thời gian:</strong> {test.totalTime} phút
                  </div>
                  <div className="mb-2">
                    <strong>Môn học:</strong> {test.subject}
                  </div>
                  <div className="mb-2">
                    <strong>Lớp:</strong> {test.grade}
                  </div>
                </Card.Text>
                <Button
                  style={{ backgroundColor: "rgb(45, 100, 159)" }}
                  onClick={() => {
                    auth.user?.roles[0]==="student"?
                    navigate(`/test/${test.id}`):
                    navigate(`/teacher/test-review/${test.id}`)
                  }                    
                  }
                >
                  {auth.user?.roles[0] === "teacher" ? "Đánh giá" : "Tham gia"}

                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container >
    </div>
  );
};

export default TestList;
