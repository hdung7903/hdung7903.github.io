import React, { useState } from "react";
import "./addclass.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ToastComponent from "../../../components/common/toast/Toast";

// Initialize toast notifications
// Remove the toast.configure() line as it's no longer needed in newer versions of react-toastify

const AddClass: React.FC = () => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.user?.id;
  const navigate = useNavigate();
  const [toastStatus, setToastStatus] = useState<
    "success" | "warning" | "error"
  >("success");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newClassroom = { name, section, subject, room, accountId };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/classroom/add_class`,
        newClassroom
      );

      setToastStatus("success");
      setToastMessage("Tạo lớp học thành công!");
      setShowToast(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/classroom");

      setName("");
      setSection("");
      setSubject("");
      setRoom("");
    } catch (error) {
      setToastStatus("error");
      setToastMessage("Có lỗi xảy ra khi tạo lớp học");
      setShowToast(true);
    }
  };
  return (
    <div className="add-classroom-form">
      <ToastComponent
        status={toastStatus}
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <h2>Tạo một lớp học mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên lớp học</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="section">Học phần</label>
          <input
            type="text"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Môn học</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="room">Phòng</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button type="submit">Tạo</button>
      </form>
    </div>
  );
};

export default AddClass;
