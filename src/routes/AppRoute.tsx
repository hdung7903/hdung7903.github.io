import { Route, Routes } from "react-router-dom";

import ExplainMe from "../pages/protected/ExplainMe/ExplainMe";
import ProtectedLayouts from "../layouts/protectedLayouts/ProtectedLayouts";
import AuthLayouts from "../layouts/authLayouts/AuthLayouts";
import LoginPage from "../pages/auth/Login/LoginPage";
import RegisterPage from "../pages/auth/Register/RegisterPage";
import Home from "../pages/landing/Home";
import GoogleCallbackPage from "../pages/auth/Login/GoogleCallBackPage";
import TestLayouts from "../layouts/testLayouts/TestLayouts";
import Blog from "../pages/protected/Blog/Blog";
import ExamList from "../pages/protected/Exam/ExamList";
import TestScreen from "../pages/protected/Test/Test";
import QuestionBank from "../pages/protected/QuestionBank/QuestionBank";
import StudentChatBot from "../pages/protected/ChatBot/Chatbot";
import ChatLayouts from "../layouts/chatLayouts/ChatLayouts";
import Upload from "../pages/protected/Upload/Upload";
import UploadQuiz from "../pages/protected/Upload/UploadQuiz";
import AddClass from "../pages/protected/AddClass/AddClass";
import Classroom from "../pages/protected/Classroom/Classroom";
import StudentClassroomDetail from "../pages/protected/Classroom/StudentClassroomDetail/StudentClassroomDetail";
import TestList from "../pages/protected/Test/TestList/TestList";
import TeacherChatBot from "../pages/protected/ChatBot/teacher/TeacherChatBot";
import SuperAdminDashboard from "../pages/protected/Admin/Dashboard/Dashboard";
import ReviewTest from "../pages/protected/Test/ReviewTest/ReviewTest";
import StudentProfile from "../pages/protected/User/Student/StudentProfile";
import TeacherProfile from "../pages/protected/User/Teacher/TeacherProfile";
import TeacherClassroomDetail from "../pages/protected/Classroom/TeacherClassroomDetail/TeacherClassroomDetail";
import ResultTest from "../pages/protected/Test/ResultTest/ResultTest";
import ClassResultTest from "../pages/protected/Test/ClassTestResult/ClassResultTest";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayouts />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/google-callback" element={<GoogleCallbackPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/explain-me" element={<ExplainMe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/exam-list" element={<ExamList />} />
        <Route path="/tests" element={<TestList />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-quiz" element={<UploadQuiz />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/teacher/review-test" element={<ReviewTest />} />
        <Route path="/student/profile/:id" element={<StudentProfile />} />
        <Route path="/teacher/profile/:id" element={<TeacherProfile />} />
        <Route
          path="/student/class-detail"
          element={<StudentClassroomDetail />}
        />
        <Route
          path="/teacher/class-detail"
          element={<TeacherClassroomDetail />}
        />
        <Route path="/add-class" element={<AddClass />} />
        <Route path="/teacher/test-review/:id" element={<ReviewTest />} />
        <Route path="/admin/dashboard/*" element={<SuperAdminDashboard />} />
        <Route path="/student/test-result/:id" element={<ResultTest />} />
        <Route path="/teacher/test-result/:id" element={<ClassResultTest />} />
        <Route path="/teacher/test-result/:id/:studentid" element={<ResultTest />} />
      </Route>

      {/* Test Routes */}
      <Route element={<TestLayouts />}>
        <Route path="/test/:id" element={<TestScreen />} />
        <Route path="student/chat-bot" element={<StudentChatBot />}></Route>
        <Route path="teacher/chat-bot" element={<TeacherChatBot />} />
      </Route>

      <Route element={<ChatLayouts />}>

      </Route>
    </Routes>
  );
};
export default AppRoute;
