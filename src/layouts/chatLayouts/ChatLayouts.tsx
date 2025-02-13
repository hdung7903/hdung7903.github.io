import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/layout/header/Header";

const ChatLayouts: React.FC = () => {
  return (
    <div className="chat-layout">
      <HeaderComponent />
      <div className="chat-layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayouts;
