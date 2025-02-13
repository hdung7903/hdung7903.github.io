import "../header/header.css";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import LoadingLink from "../../common/links/LoadingLink";
import { DropdownButton, Dropdown, Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import AppLogo from "../../../assets/images/logo.png";
import { useState } from "react";
import axios from "axios";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const accountId = auth.user?.id;

  const validateCode = (value: string) => {
    const regex = /^[a-z0-9]{6}$/;
    if (!regex.test(value)) {
      setError("Code must be 6 characters long and contain only lowercase letters and numbers");
    } else {
      setError("");
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    validateCode(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateCode(code);

    if (!error && code.length === 6) {
      try {
        setIsLoading(true);
        setSuccessMessage("");
        setError("");

        const response = await axios.post(
          `${import.meta.env.VITE_API}/classroom/join`,
          {
            accountId,
            classroomCode: code,
          }
        );

        setSuccessMessage("Tham gia thành công!");
        setCode("");
        setTimeout(() => setShowModal(false), 2000);
      } catch (err: any) {
        console.error("Failed to join classroom:", err);
        setError(err.response?.data || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <header id="header-part">
        <div className="navigation">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                <div className="right-icon">
                  <ul>
                    <LoadingLink to="/" style={{ textDecoration: "none" }}>
                      <img src={AppLogo} alt="Logo" width="120px" className="mt-2" />
                    </LoadingLink>
                  </ul>
                </div>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-9 col-8">
                <nav className="navbar navbar-expand-lg justify-content-end">
                  <div className="collapse navbar-collapse sub-menu-bar justify-content-end">
                    <ul className="navbar-nav align-items-center">
                      <li className="nav-item">
                        <LoadingLink to="/" style={{ textDecoration: "none" }}>
                          {t("homePage.header.home")}
                        </LoadingLink>
                      </li>
                      {
                        auth.user?.roles[0] === "student" && (
                          <>
                            <li>
                              <LoadingLink to="/tests">
                                Kiểm tra
                              </LoadingLink>
                            </li>
                            <li>
                              <LoadingLink to="/student/chat-bot">
                                Chat Bot
                              </LoadingLink>
                            </li>
                            <li className="nav-item">
                              <div className="dropdown">
                                <LoadingLink to="/classroom">Lớp học</LoadingLink>
                                <div className="dropdown-content">
                                  {/* <LoadingLink to="/join-class">Tham gia</LoadingLink> */}
                                  <Button variant="white" onClick={() => setShowModal(true)}>
                                  <LoadingLink to="#">Tham gia lớp học</LoadingLink>
                                  </Button>
                                </div>
                              </div>
                            </li>
                          </>
                        )}
                      {auth.user?.roles[0] === "teacher" && (
                        <>
                          <li>
                            <LoadingLink to="/tests">
                              Tạo bài thi
                            </LoadingLink>
                          </li>
                          <li>
                            <LoadingLink to="/teacher/chat-bot">
                              Chat Bot
                            </LoadingLink>
                          </li>
                          <li className="nav-item">
                            <div className="dropdown">
                              <LoadingLink to="/classroom">Lớp học</LoadingLink>
                              <div className="dropdown-content">
                              
                                {auth.user?.roles.includes("teacher") && (
                                  <>
                                  <Button variant="white" onClick={() => setShowModal(true)}>
                                  <LoadingLink to="#">Tham gia lớp học</LoadingLink>
                                  
                                </Button>
                                  <LoadingLink to="/add-class">Tạo mới</LoadingLink>
                                  </>
                                )}
                              </div>
                            </div>
                          </li>
                        </>
                      )
                      }
                      {auth.user ? (
                        <DropdownButton id="dropdown-basic-button" className="user-dropdown" title={<FontAwesomeIcon icon={faUser} />}>
                          <Dropdown.Item href={`/${auth.user?.roles[0]}/profile/${auth.user?.id}`}>{t("homePage.dropdown.profile")}</Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>{t("homePage.dropdown.logout")}</Dropdown.Item>
                        </DropdownButton>
                      ) : (
                        <>
                          <li className="nav-item">
                            <a href="/login" className="main-btn" style={{ textDecoration: "none" }}>{t("homePage.header.login")}</a>
                          </li>
                          <li className="nav-item">
                            <a href="/register" style={{ textDecoration: "underline" }}>{t("homePage.header.register")}</a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tham gia lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="classCode">
              <Form.Label>Nhập mã lớp học</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={handleCodeChange}
                placeholder="Nhập mã chứa 6 ký tự"
                maxLength={6}
                isInvalid={!!error && code.length === 6}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!code || !!error || isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Tham gia"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Header;
