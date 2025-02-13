import React from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';

const ResultTest = () => {
    const data = {
        "quiz": [
            {
                "Question": "Ai đã chỉ huy cuộc tấn công vào năm 1282 chống lại Đế quốc Chiêm?",
                "Answers": ["Hốt Tất Liệt", "Toa Đô", "Trần Nhân Tông"],
                "Correct Answer": "Toa Đô",
                "Answered": "Hốt Tất Liệt",
                "Reference": "Năm 1282, nhà Nguyên sai Toa Đô mang quân vượt biển đánh Chiêm Thành ở phía nam Đại Việt.",
                "Question Type": "MCQ",
            },
            {
                "Question": "Là đúng hay sai rằng Hốt Tất Liệt trực tiếp chỉ huy cuộc tấn công vào năm 1282 chống lại Đế quốc Chiêm?",
                "Answers": ["Đúng", "Sai"],
                "Correct Answer": "Sai",
                "Answered": "Đúng",
                "Reference": "Năm 1282, nhà Nguyên sai Toa Đô mang quân vượt biển đánh Chiêm Thành ở phía nam Đại Việt.",
                "Question Type": "TF",
            },
            {
                "Question": "Trần Hưng Đạo được thăng quan gì để chuẩn bị kháng chiến lần hai?",
                "Answers": ["Tướng quân", "Binh bộ thượng thư", "Thượng tướng"],
                "Correct Answer": "Tướng quân",
                "Answered": "Tướng quân",
                "Reference": "Tháng Mười (âm lịch) năm 1283, Trần Hưng Đạo được phong làm Quốc công tiết chế thống lĩnh chư quân.",
                "Question Type": "MCQ",
            },
            {
                "Question": "Trần Hưng Đạo đã chia các đơn vị quân đội như thế nào?",
                "Answers": ["Chia theo cấp độ", "Phân cho các quân hiệu tài giỏi", "Kết hợp cả hai"],
                "Correct Answer": "Phân cho các quân hiệu tài giỏi",
                "Answered": "Phân cho các quân hiệu tài giỏi",
                "Reference": "Ông chọn các quân hiệu tài giỏi, cho chia nhau chỉ huy các đơn vị quân đội.",
                "Question Type": "MCQ",
            },
            {
                "Question": "Ai đã cho duyệt quân ở bến Đông Bộ Đầu?",
                "Answers": ["Trần Hưng Đạo", "Hồ Quý Ly", "Lê Lợi"],
                "Correct Answer": "Trần Hưng Đạo",
                "Answered": "Lê Lợi",
                "Reference": "Tháng Tám (âm lịch) năm sau (1284), ông cho duyệt quân ở bến Đông Bộ Đầu.",
                "Question Type": "MCQ",
            },
        ],
    };

    // Calculate total score
    const totalQuestions = data.quiz.length;
    const correctAnswers = data.quiz.filter(q => q["Correct Answer"] === q["Answered"]).length;
    const score = (correctAnswers / totalQuestions) * 100;

    return (
        <Container className="my-4">
            <h1 className="text-center mb-4">Kết Quả Bài Kiểm Tra</h1>

            {/* Score Summary */}
            <Card className="mb-4 text-center">
                <Card.Body>
                    <Card.Title className="h2">Tổng Điểm</Card.Title>
                    <div className={`display-4 ${score >= 50 ? 'text-primary' : 'text-danger'}`}>{score.toFixed(1)}%</div>
                    <Card.Text>
                        Số câu đúng: {correctAnswers}/{totalQuestions}
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Questions and Answers */}
            <div>
                {data.quiz.map((question, index) => (
                    <Card
                        key={index}
                        className="mb-4"
                        border={question["Correct Answer"] === question["Answered"] ? "success" : "danger"}
                    >
                        <Card.Body>
                            <Card.Title className="mb-3">
                                Câu {index + 1}: {question.Question}
                            </Card.Title>
                            <div className="mb-3">
                                {question.Answers.map((answer, ansIndex) => (
                                    <div
                                        key={ansIndex}
                                        className={`p-2 mb-2 rounded ${answer === question["Correct Answer"]
                                            ? "bg-success text-white"
                                            : answer === question["Answered"] && answer !== question["Correct Answer"]
                                                ? "bg-danger text-white"
                                                : "bg-light"
                                            }`}
                                    >
                                        {answer}
                                    </div>
                                ))}
                            </div>
                            <Card className="bg-light">
                                <Card.Body>
                                    <Card.Subtitle className="mb-2">Tham khảo:</Card.Subtitle>
                                    <Card.Text className="text-muted">
                                        {question.Reference}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ResultTest;