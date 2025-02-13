import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { numberToLetter } from "../../../../utils/Converters";
import { useNavigate } from "react-router-dom";

interface ReadingWritingModuleProps {
  testId: string;
}

const ReadingWritingModule: React.FC<ReadingWritingModuleProps> = ({ testId }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState(3600);
  const [selectedOption, setSelectedOption] = useState<{
    [key: number]: number | null;
  }>({});
  const target = useRef(null);
  const navigate = useNavigate();
  const data = {
    "quiz": [
      {
        "Question":
          "Ai đã chỉ huy cuộc tấn công vào năm 1282 chống lại Đế quốc Chiêm?",
        "Answers": ["Hốt Tất Liệt", "Toa Đô", "Trần Nhân Tông"],
        "Correct Answer": "Toa Đô",
        "Reference":
          "Năm 1282, nhà Nguyên sai Toa Đô mang quân vượt biển đánh Chiêm Thành ở phía nam Đại Việt.",
        "Question Type": "MCQ",
      },
      {
        "Question":
          "Là đúng hay sai rằng Hốt Tất Liệt trực tiếp chỉ huy cuộc tấn công vào năm 1282 chống lại Đế quốc Chiêm?",
        "Answers": ["Đúng", "Sai"],
        "Correct Answer": "Sai",
        "Reference":
          "Năm 1282, nhà Nguyên sai Toa Đô mang quân vượt biển đánh Chiêm Thành ở phía nam Đại Việt.",
        "Question Type": "TF",
      },
      {
        "Question":
          "Trần Hưng Đạo được thăng quan gì để chuẩn bị kháng chiến lần hai?",
        "Answers": ["Tướng quân", "Binh bộ thượng thư", "Thượng tướng"],
        "Correct Answer": "Tướng quân",
        "Reference":
          "Tháng Mười (âm lịch) năm 1283, Trần Hưng Đạo được phong làm Quốc công tiết chế thống lĩnh chư quân.",
        "Question Type": "MCQ",
      },
      {
        "Question": "Trần Hưng Đạo đã chia các đơn vị quân đội như thế nào?",
        "Answers": [
          "Chia theo cấp độ",
          "Phân cho các quân hiệu tài giỏi",
          "Kết hợp cả hai",
        ],
        "Correct Answer": "Phân cho các quân hiệu tài giỏi",
        "Reference":
          "Ông chọn các quân hiệu tài giỏi, cho chia nhau chỉ huy các đơn vị quân đội.",
        "Question Type": "MCQ",
      },
      {
        "Question": "Ai đã cho duyệt quân ở bến Đông Bộ Đầu?",
        "Answers": ["Trần Hưng Đạo", "Hồ Quý Ly", "Lê Lợi"],
        "Correct Answer": "Trần Hưng Đạo",
        "Reference":
          "Tháng Tám (âm lịch) năm sau (1284), ông cho duyệt quân ở bến Đông Bộ Đầu.",
        "Question Type": "MCQ",
      },
    ],
  };

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOptionClick = (questionIndex: number, optionIndex: number) => {
    setSelectedOption((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <Container className="px-0">
        <header className="bg-white p-3 d-flex justify-content-between align-items-center border border-top-1 border-secondary-subtle rounded-4 border-3">
          <div>
            <span className="fw-bold" style={{ fontSize: "1.2rem", whiteSpace: "nowrap" }}>
              Bài thi 1
            </span>
          </div>
          <div
            className="d-flex flex-column align-items-center"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <span className="fw-medium" style={{ fontSize: "1.2rem" }}>
              {formatTime(time)}
            </span>
          </div>
          <Button
            variant="outline-dark"
            className="rounded-pill px-2"
            style={{ width: "8%", marginLeft: "86%" }}
          >
            Save & Exit
          </Button>
        </header>
      </Container>

      {/* Main Content */}
      <Container className="flex-grow-1">
        {data.quiz.map((value, index) => {
          return (
            <Row className="py-4" key={index}>
              <Col md={6} className="border-end">
                <div className="d-flex justify-content-between align-items-center mb-3 bg-secondary-subtle rounded-pill px-3 py-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "14px",
                      }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-dark">{value.Question}</span>
                  </div>
                </div>
              </Col>
              <Col md={6} className="px-4 d-flex flex-column">
                {/* Main Question Content */}
                <div className="flex-grow-1">
                  <div className="mb-3 px-2">
                    {value.Answers.map((option, Answerindex) => (
                      <div
                        style={{ cursor: "pointer" }}
                        key={Answerindex}
                        className={`d-flex align-items-center gap-3 mb-3 hover-effect`}
                        onClick={() => handleOptionClick(index, Answerindex)}
                      >
                        <div
                          className={`flex-grow-1 d-flex justify-content-between align-items-center border border-3 rounded-pill px-3 py-2 ${selectedOption[index] === Answerindex ? "border-primary" : "border-secondary"}`}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle bg-secondary-subtle text-dark"
                              style={{
                                width: "28px",
                                height: "28px",
                                fontSize: "14px",
                              }}
                            >
                              {numberToLetter(Answerindex + 1)}
                            </div>
                            <span
                              className="text-black"
                            >
                              {option}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>

      {/* Footer */}
      <div className="bg-light mt-auto">
        <Container>
          <div className="p-3 d-flex justify-content-end">
            <Button
              variant="primary"
              className="rounded-pill px-3"
              style={{ width: "10%" }}
              onClick={() => { navigate(`/student/test-result/${testId}`) }}
            >
              Finish
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ReadingWritingModule;
