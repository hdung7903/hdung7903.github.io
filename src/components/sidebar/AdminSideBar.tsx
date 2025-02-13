import { useState } from "react"
import { Nav, Button } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { Home, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./AdminSideBar.module.css"

const SidebarComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()

    const toggleSidebar = () => setCollapsed(!collapsed)

    const navItems = [
        { path: "/admin/dashboard", icon: Home, label: "Dashboard" },
        { path: "/admin/dashboard/users", icon: Users, label: "Users" },
        { path: "/admin/dashboard/courses", icon: BookOpen, label: "Courses" },
    ]

    return (
        <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
            <Button
                onClick={toggleSidebar}
                style={{ width: "100%", color: "black", border: "none", background: "none" }}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                variant="outline-light"
            >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
            <Nav className={`flex-column ${styles.sidebarNav}`}>
                {navItems.map((item) => (
                    <Nav.Item key={item.path}>
                        <Nav.Link
                            as={Link}
                            to={item.path}
                            className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ""}`}
                        >
                            <item.icon size={18} />
                            {!collapsed && <span>{item.label}</span>}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    )
}

export default SidebarComponent