import type React from "react"
import { Card, Row, Col } from "react-bootstrap"

const HomeDashboard: React.FC = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Users</Card.Title>
                            <Card.Text>1,234</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Active Courses</Card.Title>
                            <Card.Text>42</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default HomeDashboard;

