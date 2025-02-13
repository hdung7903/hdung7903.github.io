import {
  faFolderClosed,
  faPaperclip,
  faGear,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import axios from "axios";

const Upload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  console.log(query);
  const classroomId = query.get("classroomId");

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

    // Convert file to Base64
    const fileToBase64 = (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    const base64File = await fileToBase64(selectedFile);
    const base64Data = base64File.split(",")[1]; // Remove the data URL prefix

    const requestBody = {
      classroomId: classroomId, // Replace with actual classroom ID
      title: title,
      content: description,
      fileData: atob(base64Data)
        .split("")
        .map((char) => char.charCodeAt(0)), // Convert Base64 to byte[]
      fileName: selectedFile.name,
      fileType: selectedFile.type,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/classroom-content/upload`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      alert("File uploaded successfully.");
      setSelectedFile(null);
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
                <span className="text-yellow">Đăng</span> tài liệu cho lớp học
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Tiêu đề</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Miêu tả</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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

export default Upload;
