import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import CustomButton from "../../../components/common/button/custom-button/Custom-Button";
import "../QuestionBank/question-bank.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function QuestionBank() {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<
    { name: string; level: string }[]
  >([]);
  const { t, i18n } = useTranslation();

  const titleParts = t("questionBank.title", { returnObjects: true }) as Array<{
    className: string;
    text: string;
  }>;
  const handleSubjectChange = (subject: string, level: string) => {
    setSelectedSubjects((prev) => {
      const existingIndex = prev.findIndex((s) => s.name === subject);
      if (existingIndex !== -1) {
        const updatedSubjects = [...prev];
        updatedSubjects[existingIndex].level = level;
        return updatedSubjects;
      } else {
        return [...prev, { name: subject, level }];
      }
    });
  };
  const subjects = [
    "Đọc và viết",
    "Thông tin và Ý tưởng",
    "Quy tắc Tiếng Anh Chuẩn",
    "Diễn đạt Ý tưởng",
  ];
  const levels = ["Dễ", "Trung bình", "Khó"];
  const [skills, setSkills] = useState<string[]>([]);
  const handleCreateExam = () => {
    console.log("Danh sách môn học đã chọn:", selectedSubjects);
    setShowModal(false);
  };
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const language = i18n.language || "en";
        const data = await import(`../../../../i18n/locales/${language}.json`);
        const fetchedSkills = data.questionSpecific.module.flatMap(
          (module: any) => module.domain.flatMap((domain: any) => domain.skill)
        );
        setSkills(fetchedSkills);
      } catch (error) {
        console.error("Error loading JSON file: ", error);
      }
    };

    fetchSkills();
  }, [i18n.language]);

  return (
    <div className="question-bank-container">
      <h1>
        {(Array.isArray(titleParts) ? titleParts : []).map((part, index) => (
          <span key={index} className={part.className}>
            {part.text}
          </span>
        ))}
      </h1>
      <Button onClick={() => setShowModal(true)}>Tạo đề thi</Button>

      <h6 style={{ fontWeight: "lighter", marginBottom: 24 }}>
        Write anything here if you want
      </h6>
      <div className="modul e-title">
        <h2>{t("questionSpecific.module.0.name")}</h2>
        <CustomButton
          width="400px"
          height="31px"
          border="1px solid #1A61CF;"
          title={t("questionBank.button.title.purchase")}
          color="black"
          backgroundColor="transparent"
          icon="../src/assets/images/all-icon/lock.svg"
        />
      </div>
      <Row className="skill-container">
        {skills.map((skill) => (
          <Col className="skill-item">{skill}</Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn môn học và mức độ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {subjects.map((subject) => (
              <div key={subject} className="mb-3">
                <h5>{subject}</h5>
                {levels.map((level) => (
                  <Form.Check
                    key={level}
                    type="radio"
                    name={subject}
                    label={level}
                    onChange={() => handleSubjectChange(subject, level)}
                  />
                ))}
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCreateExam}>
            Tạo đề thi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuestionBank;
