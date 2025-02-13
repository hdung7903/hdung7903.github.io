import "../Login/login-page.css";

import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../../../redux/store";
import { login, googleLogin } from "../../../redux/slices/authSlice";

import CustomButton from "../../../components/common/button/custom-button/Custom-Button";
import icon from "../../../constants/icon";
import EmailInput from "../../../components/common/input/Email-Input";
import PasswordInput from "../../../components/common/input/Password-Input";

import ToastComponent from "../../../components/common/toast/Toast";
import LoadingLink from "../../../components/common/links/LoadingLink";
import LoadingButton from "../../../components/common/button/LoadingButton";
import images from "../../../constants/image";

function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastStatus, setToastStatus] = useState<
    "success" | "warning" | "error"
  >("success");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsSubmitting(true);

    if (!email.trim() || !password.trim()) {
      setToastStatus("warning");
      setToastMessage(t("Email and Password are both required!"));
      setShowToast(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const resultAction = await dispatch(
        login({
          username: email,
          password,
          rememberMe,
        })
      );

      if (login.fulfilled.match(resultAction)) {
        setToastStatus("success");
        setToastMessage("Login successful!");
        setShowToast(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/");
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error: any) {
      setToastStatus("error");
      setToastMessage(error.message || "An error occurred during login");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(googleLogin());

      if (googleLogin.fulfilled.match(resultAction)) {
        setToastStatus("success");
        setToastMessage("Redirecting to Google login...");
        setShowToast(true);
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error: any) {
      setToastStatus("error");
      setToastMessage(
        error.message || "An error occurred while initiating Google login"
      );
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
      <div className="login-container">
        <ToastComponent
          status={toastStatus}
          message={toastMessage}
          show={showToast}
          onClose={() => setShowToast(false)}
        />

        <div className="login-left">
          <div className="login-left-inner">
            <div className="arrow-left">
              <LoadingLink to="/">
                <FontAwesomeIcon icon={faArrowLeft} color="white" />
              </LoadingLink>
            </div>
            <h2 className="login-left-header">
              {t("auth.header.createAccount")}
            </h2>
            <div className="padding-text">
              <p className="paragraph">{t("auth.paragraph.lorem-login-page")}</p>
              <LoadingLink to="/register">
              <LoadingButton
                isLoading={isSubmitting}
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "#001568",
                  border: "none",
                  fontWeight: 600,
                  marginTop: "12px",
                }}
              >
                {t("auth.buttonTitle.register")}
              </LoadingButton>
            </LoadingLink>
            </div>
            <div className="login-background">
              <img src={images.loginBackground} alt="Login Background" />
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-right-inner">
            <h2 className="login-right-header">{t("auth.header.login")}</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-field-container">
                <EmailInput
                  value={email}
                  onChange={(value) => setEmail(value)}
                  isRequired
                />
                <PasswordInput
                  value={password}
                  onChange={(value) => setPassword(value)}
                  isRequired
                />

                <Form.Check
                  className="remember-me"
                  type="checkbox"
                  id="default-checkbox"
                  label={t("auth.checkboxTitle.rememberMe")}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <LoadingButton
                  isLoading={isSubmitting}
                  onClick={handleLogin}
                  style={{
                    width: "100%",
                    height: "48px",
                    backgroundColor: "#001568",
                    border: "none",
                    fontWeight: 600,
                    marginTop: "12px",
                  }}
                >
                  {t("auth.buttonTitle.login")}
                </LoadingButton>

                <p
                  style={{
                    marginTop: 12,
                    textAlign: "center",
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  {t("auth.buttonTitle.forgotPass")}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default LoginPage;