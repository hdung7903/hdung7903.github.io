import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./classroom.css";
import LoadingLink from "../../../components/common/links/LoadingLink";

type Classroom = {
  id: string;
  name: string;
  section: string;
  classroomCode: string;
};

const Classroom = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.user?.id;
  const permission = auth.user?.roles.includes("teacher");
  const [classes, setClasses] = useState<Classroom[]>([]);
  const navigate = useNavigate();

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          permission
            ? `${import.meta.env.VITE_API}/classroom/list_classes_owner`
            : `${import.meta.env.VITE_API}/classroom/list_classes_member`,
          {
            params: {
              accountId: accountId,
            },
          }
        );
        setClasses(response.data);
      } catch (error) {
        console.error("There was an error fetching the classes!", error);
      }
    };

    fetchClasses();
  }, []);

  // const handleViewDetails = async (classroomId: string) => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API}/classroom-content/classroom`,
  //       {
  //         params: { classroomId: classroomId },
  //       }
  //     );

  //     // Navigate to ClassroomDetail with data
  //     navigate("/classroom/classroom-detail", {
  //       state: { classroomData: response.data },
  //     });
  //   } catch (error) {
  //     console.error("Error fetching classroom details:", error);
  //   }
  // };

  return (
    <div className="classroom-container">
      <h2 className="header-classroom text-2xl font-bold">Lớp học của bạn</h2>

      <Container>
        <Row>
          {classes.length > 0 ? (
            classes.map((classroom) => (
              <Col key={classroom.id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src="src/assets/images/class/class.jpg"
                      style={{ marginBottom: "10px" }}
                    />
                    <Card.Title>{classroom.name}</Card.Title>
                    <Card.Text>
                      {classroom.section || "Thông tin lớp học."}
                    </Card.Text>
                    <Card.Text>
                      <strong>Mã lớp học:</strong>{" "}
                      {classroom.classroomCode || "Mã lớp học."}
                    </Card.Text>
                    <LoadingLink
                      to={`/${auth.user?.roles[0]}/class-detail?classroomId=${classroom.id}`}
                    >
                      <Button variant="warning" style={{ color: "white" }}>
                        Xem chi tiết
                      </Button>
                    </LoadingLink>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center mt-4">
              <p>
                <strong>📢 Bạn chưa tham gia lớp học nào.</strong>
              </p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Classroom;
