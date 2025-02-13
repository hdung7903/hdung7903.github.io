import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BookOpen, Settings, User } from "lucide-react";
import styles from "./AdminSideBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

const ChatBotSidebarComponent: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    const navTopItems = [
        { path: "/", icon: Home },
        { path: "/tests", icon: BookOpen},
        { path: `/${auth.user?.roles[0]}/chat-bot`, icon: Users },
    ];

    const navBottomItems = [
        { path: "#", icon: Settings },
        { path: `/${auth.user?.roles[0]}/profile/${auth.user?.id}`, icon: User },
    ];

    return (
        <div className={`${styles.sidebar} ${styles.collapsed}`}>
            <Nav className={`flex-column ${styles.sidebarNav}`}>
                <div className={styles.navTop}>
                    {navTopItems.map((item) => (
                        <Nav.Item key={item.path}>
                            <Nav.Link
                                as={Link}
                                to={item.path}
                                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ""}`}
                            >
                                <item.icon size={25} />
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </div>
                <div className={styles.navBottom}>
                    {navBottomItems.map((item) => (
                        <Nav.Item key={item.path}>
                            <Nav.Link
                                as={Link}
                                to={item.path}
                                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ""}`}
                            >
                                <item.icon size={25} />
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </div>
            </Nav>
        </div>
    );
};

export default ChatBotSidebarComponent;