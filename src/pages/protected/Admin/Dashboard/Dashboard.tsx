import { Row, Col, Container } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import UserList from "./UserList";
import Courses from "./Courses";
import HomeDashboard from "./Home";
import SidebarComponent from "../../../../components/sidebar/AdminSideBar";

const SuperAdminDashboard: React.FC = () => {
    const location = useLocation();
    const part = location.pathname.split("/").pop()

    const renderContent = () => {
        switch (part) {
            case "users":
                return <UserList />
            case "courses":
                return <Courses />
            default:
                return <HomeDashboard />
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="sidebar">
                    <SidebarComponent />
                </Col>
                <Col md={9} lg={10} className="main-content">
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    )
};

export default SuperAdminDashboard;

