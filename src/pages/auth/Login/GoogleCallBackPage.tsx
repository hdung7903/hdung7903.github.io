import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleGoogleCallback } from "../../../redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";
import SpinnerComponent from "../../../components/common/spinner/spinner";
import ToastComponent from "../../../components/common/toast/Toast";

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState<
    "success" | "error" | "warning"
  >("success");

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      if (code) {
        try {
          const resultAction = await dispatch(handleGoogleCallback(code));

          if (handleGoogleCallback.fulfilled.match(resultAction)) {
            setToastStatus("success");
            setToastMessage("Google login successful!");
            setShowToast(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate("/");
          } else {
            throw new Error(resultAction.payload as string);
          }
        } catch (error: any) {
          setToastStatus("error");
          setToastMessage(
            error.message || "An error occurred during Google login"
          );
          setShowToast(true);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          navigate("/login");
        }
      }
    };

    handleCallback();
  }, [searchParams, dispatch, navigate]);

  return (
    <div style={{ height: "100vh" }}>
      <SpinnerComponent />
      {/* Add your Toast component here */}
      {showToast && (
        <ToastComponent
          status={toastStatus}
          message={toastMessage}
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default GoogleCallbackPage;
