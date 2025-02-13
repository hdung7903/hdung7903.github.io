import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { numberToLetter } from "../../../../utils/Converters";

const ReviewTest: React.FC = () => {
    const storedData = JSON.parse(localStorage.getItem("quiz") || "{}");
    const quizData = Array.isArray(storedData.quiz) ? storedData.quiz : [];

    const [quizs, setQuizs] = useState(quizData);
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editQuiz, setEditQuiz] = useState<any>({});
    const [editAnswer, setEditAnswer] = useState<{ id: number | null; value: string }>({ id: null, value: "" });
    const [showAddModal, setShowAddModal] = useState(false);
    const [newQuiz, setNewQuiz] = useState<any>({ "Question Type": "", Question: "", Answers: [], "Correct Answer": "", Reference: "" });

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditQuiz(quizs[index]);
        setShowModal(true);
    };

    const handleAnswerChange = (index: number, newValue: string) => {
        setEditAnswer({ id: index, value: newValue });
    };

    const handleSaveAnswer = (index: number) => {
        const updatedQuiz = { ...editQuiz };
        if (updatedQuiz.Answers && Array.isArray(updatedQuiz.Answers)) {
            updatedQuiz.Answers[index] = editAnswer.value;
            setEditQuiz(updatedQuiz);
        }
        setEditAnswer({ id: null, value: "" });
    };

    const handleAddAnswer = () => {
        const updatedQuiz = { ...editQuiz };
        if (Array.isArray(updatedQuiz.Answers)) {
            updatedQuiz.Answers.push("");
        }
        setEditQuiz(updatedQuiz);
    }

    const handleSave = () => {
        if (editIndex !== null) {
            const updatedQuizList = [...quizs];
            const updatedQuiz = { ...editQuiz };

            // Lọc bỏ các chuỗi rỗng trong mảng Answers
            updatedQuiz.Answers = updatedQuiz.Answers.filter((answer: string) => answer !== "");

            updatedQuizList[editIndex] = updatedQuiz;
            setQuizs(updatedQuizList);
            localStorage.setItem("quiz", JSON.stringify({ quiz: updatedQuizList }));
        }
        setShowModal(false);
    };

    const handleAddNewQuestion = () => {
        setShowAddModal(true);
    };

    const handleSaveNewQuestion = () => {
        if (!newQuiz.Question.trim()) {
            alert("Question cannot be empty");
            return;
        }

        if (newQuiz["Question Type"] === "TF") {
            setNewQuiz({ ...newQuiz, Answers: ["Có", "Không"] });
        } else if (newQuiz["Question Type"] === "MCQ" && newQuiz.Answers.length < 2) {
            alert("Multiple choice questions must have at least two answers");
            return;
        }

        if (!newQuiz["Correct Answer"].trim()) {
            alert("You must select a correct answer");
            return;
        }

        const updatedQuizList = [...quizs, newQuiz];
        setQuizs(updatedQuizList);
        localStorage.setItem("quiz", JSON.stringify({ quiz: updatedQuizList }));
        setShowAddModal(false);
        setNewQuiz({ Question: "", "Question Type": "", Answers: [], "Correct Answer": "", Reference: "" });
    };

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <h1 className="text-bold text-center">Review Quiz</h1>
                <div className="d-flex justify-content-end my-3">
                    <Button style={{ width: "20%", backgroundColor: "#07294d" }} onClick={() => handleAddNewQuestion()}>Add new question</Button>
                </div>
                <Col md={{ span: 12 }} style={{ minWidth: "80%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {quizs.map((quiz: any, index: number) => (
                        <Card key={index} className="mb-3 pe-3" style={{
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            width: "100%", // Hoặc bạn có thể đặt width cụ thể như "80%" tùy vào yêu cầu
                            maxWidth: "1200px" // Để giới hạn độ rộng tối đa của Card
                        }}>
                            <Card.Body>
                                <Container className="d-flex flex-grow-1">
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
                                                <span className="text-dark">{quiz.Question}</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6} className="px-4 d-flex flex-column">
                                        {/* Main Question Content */}
                                        <div className="flex-grow-1">
                                            <div className="mb-3 px-2">
                                                {quiz.Answers.map((option, Answerindex) => (
                                                    <div
                                                        style={{ cursor: "pointer" }}
                                                        key={Answerindex}
                                                        className={`d-flex align-items-center gap-3 mb-3 hover-effect`}
                                                    >
                                                        <div
                                                            className={`flex-grow-1 d-flex justify-content-between align-items-center border border-3 rounded-pill px-3 py-2`}
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
                                </Container>
                                <Button className="ms-4" onClick={() => handleEdit(index)} style={{ width: "20%", backgroundColor: "#07294d" }}>Edit</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Question Type</Form.Label>
                            <Form.Control
                                type="text"
                                value={editQuiz["Question Type"] || ""}
                                onChange={(e) => setEditQuiz({ ...editQuiz, "Question": e.target.value })}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                value={editQuiz["Question"] || ""}
                                onChange={(e) => setEditQuiz({ ...editQuiz, "Question": e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Group>
                                <Form.Label>Answers</Form.Label>
                                {Array.isArray(editQuiz.Answers) && editQuiz.Answers.map((answer, i) => (
                                    <div key={i} className="d-flex align-items-center">
                                        {editAnswer.id === i ? (
                                            <>
                                                <Form.Control
                                                    type="text"
                                                    value={editAnswer.value}
                                                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                                                />
                                                <Button variant="success" onClick={() => handleSaveAnswer(i)} className="ms-2">Submit</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Check
                                                    type="radio"
                                                    id={`radio-${i}`}
                                                    label={answer}
                                                    name="quiz-answer"
                                                    checked={editQuiz["Correct Answer"] === answer}
                                                    onChange={() => setEditQuiz({ ...editQuiz, "Correct Answer": answer })}
                                                />
                                                {
                                                    editQuiz["Question Type"] !== "TF" && (
                                                        <Button variant="white" className="ms-2" style={{ width: "2%" }} onClick={() => handleAnswerChange(i, answer)}><Pencil /></Button>
                                                    )
                                                }

                                            </>
                                        )}
                                    </div>
                                ))}
                                {
                                    editQuiz["Question Type"] !== "TF" && (
                                        <Button style={{ backgroundColor: "#07294d" }} onClick={handleAddAnswer}>Add answer</Button>
                                    )
                                }

                            </Form.Group>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correct Answer</Form.Label>
                            <Form.Control
                                type="text"
                                value={editQuiz["Correct Answer"] || ""}
                                onChange={(e) => setEditQuiz({ ...editQuiz, "Correct Answer": e.target.value })}
                            />

                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Reference</Form.Label>
                            <Form.Control
                                type="text"
                                value={editQuiz.Reference || ""}
                                onChange={(e) => setEditQuiz({ ...editQuiz, Reference: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "#07294d" }} onClick={handleSave}>Save changes</Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Question Type</Form.Label>
                            <Form.Select
                                value={newQuiz["Question Type"]}
                                onChange={(e) => setNewQuiz({ ...newQuiz, "Question Type": e.target.value })}
                            >
                                <option value="">Select question type</option>
                                <option value="MCQ">Multiple Choice</option>
                                <option value="TF">True False</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                value={newQuiz.Question}
                                onChange={(e) => setNewQuiz({ ...newQuiz, Question: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            {newQuiz["Question Type"] === "MCQ" ? (
                                <Form.Group>
                                    <Form.Label>Answers</Form.Label>
                                    {newQuiz.Answers.map((answer: string, i: number) => (
                                        <div key={`answer-${answer}-${i}`} className="d-flex align-items-center gap-2 mb-2">
                                            <div className="ps-3">
                                                <Form.Check type="radio" name="correctAnswer" checked={newQuiz["Correct Answer"] === answer} onChange={() => setNewQuiz({ ...newQuiz, "Correct Answer": answer })} />
                                                <Form.Control type="text" value={answer} onChange={(e) => {
                                                    const updatedAnswers = [...newQuiz.Answers];
                                                    updatedAnswers[i] = e.target.value;
                                                    setNewQuiz({ ...newQuiz, Answers: updatedAnswers });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                    <Button style={{ backgroundColor: "#07294d" }} onClick={() => setNewQuiz({ ...newQuiz, Answers: [...newQuiz.Answers, ""] })}>Add Answer</Button>
                                </Form.Group>
                            ) : (
                                <Form.Group>
                                    <Form.Label>Answers</Form.Label>
                                    {["Có", "Không"].map((answer: string, i: number) => (
                                        <div key={`answer-${answer}-${i}`} className="d-flex align-items-center gap-2 mb-2">
                                            <div className="ps-3">
                                                <Form.Check type="radio" name="correctAnswer" checked={newQuiz["Correct Answer"] === answer} onChange={() => setNewQuiz({ ...newQuiz, "Correct Answer": answer })} />
                                                <Form.Control type="text" value={answer} onChange={(e) => {
                                                    const updatedAnswers = [...newQuiz.Answers];
                                                    updatedAnswers[i] = e.target.value;
                                                    setNewQuiz({ ...newQuiz, Answers: updatedAnswers });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </Form.Group>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correct Answer</Form.Label>
                            <Form.Control
                                type="text"
                                value={newQuiz["Correct Answer"]}
                                onChange={(e) => setNewQuiz({ ...newQuiz, "Correct Answer": e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Reference</Form.Label>
                            <Form.Control
                                type="text"
                                value={newQuiz.Reference}
                                onChange={(e) => setNewQuiz({ ...newQuiz, Reference: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "#07294d" }} onClick={handleSaveNewQuestion}>Save Question</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ReviewTest;
