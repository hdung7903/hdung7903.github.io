import {
  faFolderClosed,
  faPaperclip,
  faGear,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import axios from "axios";
import { Book, Calculator, FlaskConical, Globe, Landmark, Library } from "lucide-react";

const UploadQuiz: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const classroomId = query.get("classroomId");
  const navigate = useNavigate();

  const subjects = [
    { id: "math", name: "Toán học", icon: <Calculator /> },
    { id: "history", name: "Lịch sử", icon: <Landmark /> },
    { id: "english", name: "Tiếng Anh", icon: <Book /> },
    { id: "geography", name: "Địa lý", icon: <Globe /> },
    { id: "physics", name: "Khoa học", icon: <FlaskConical /> },
    { id: "literature", name: "Văn học", icon: <Library /> },
  ]

  const handleSubjectSelect = (subjectName: string) => {
    setSubject(subjectName);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("classroomId", classroomId ?? "");
    formData.append("subject", subject);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AI_API}/upload_for_quiz`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);

      localStorage.setItem("quiz", JSON.stringify(response.data));
      alert("File uploaded successfully.");
      setSelectedFile(null);
      navigate("/teacher/review-test");
      console.log("Check response:",response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("There was an error uploading the file.");
    }
  };

  return (
    <section id="exam-list">
      <Container>
        <Row className="mb-5 border-bottom pb-5">
          <Col lg={6}>
            <img src="/src/assets/images/exam/banner.webp" alt="Banner" />
          </Col>

          <Col lg={6} className="d-flex align-items-center">
            <div>
              <h3>
                <span className="text-yellow">Đăng</span> khung tài liệu cho đề
                thi
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Môn học</label>
                  <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:"rgb(45, 100, 159)"}} id="dropdown-basic">
                      {subject ? (
                        <>
                          {subjects.find((s) => s.name === subject)?.icon} &nbsp;
                          {subjects.find((s) => s.name === subject)?.name}
                        </>
                      ) : (
                        "Chọn môn học"
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {subjects.map((subj) => (
                        <Dropdown.Item key={subj.id} onClick={() => handleSubjectSelect(subj.name)}>
                          {subj.icon} &nbsp; {subj.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <Dropdown>
                  <Dropdown.Toggle style={{backgroundColor:"rgb(45, 100, 159)"}} id="dropdown-basic">
                    <FontAwesomeIcon icon={faPaperclip} className="me-2" />
                    Chọn Tệp
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleFileSelect}>
                      <FontAwesomeIcon icon={faFolderClosed} className="me-2" />
                      Tải tệp lên
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon icon={faGoogleDrive} className="me-2" />
                      Google Drive
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon icon={faGear} className="me-2" />
                      Thêm thủ công
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {selectedFile && (
                  <div className="mt-3">
                    <div className="d-flex align-items-center">
                      <span>{selectedFile.name}</span>
                      <Button
                        variant="link"
                        className="ms-2"
                        onClick={handleRemoveFile}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  style={{backgroundColor:"rgb(45, 100, 159)"}}
                  type="submit"
                  className="mt-3"
                  disabled={!selectedFile}
                >
                  Tải Lên
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UploadQuiz;
