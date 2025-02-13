import "flag-icons/css/flag-icons.min.css";
// import "../assets/css/style.css"
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
const Blog: React.FC = () => {
  return (
      <section id="blog-page" className="pb-120 gray-bg">
        <Container>
          <div className="d-flex justify-content-center btn-category-containter">
            <div>
              <Button variant="outline-dark" className="btn-category-active">
                All
              </Button>
              <Button
              
                variant="secondary"
                className="btn-category bg-dark-subtle text-dark"
              >
                Science
              </Button>
              <Button
                variant="secondary"
                className="btn-category bg-dark-subtle text-dark"
              >
                Education
              </Button>
              <Button
                variant="secondary"
                className="btn-category bg-dark-subtle text-dark"
              >
                Literature
              </Button>
            </div>
          </div>
          <Row className="row first-row">
            <Col lg={8} className="col-lg-8">
              <div className="singel-blog ">
                <div className="blog-thum">
                  <img
                    src="/src/assets/images/blog/img-sample.jpg"
                    alt="Blog"
                  />
                </div>
              </div>
            </Col>
            <Col lg={4} className="col-lg-4 d-flex align-items-center">
              <div className="singel-blog ">
                <div className="blog-cont">
                  <ul className="mb-3 p-0">
                    <li>
                      <a href="#" className="blog-category">
                        Education
                      </a>
                    </li>
                  </ul>
                  <a href="blog-singel.html" className="mb-4">
                    <h3 className="m-0">
                      Few tips for get better results in examination
                    </h3>
                  </a>

                  <p className="mb-4">
                    Lorem ipsum gravida nibh vel velit auctor aliquetn
                    sollicitudirem quibibendum auci elit cons equat ipsutis sem
                  </p>

                  <div className="">
                    <a href="#" className="text-black-50">
                      Read more <i className="fa fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="row mt-3">
            {[...Array(5)].map((_, index) => (
              <Col lg={4} className="col-lg-4" key={index}>
                <div className="singel-blog mt-30">
                  <div className="blog-thum">
                    <img
                      src="/src/assets/images/blog/img-sample.jpg"
                      alt="Blog"
                    />
                  </div>
                  <div className="blog-cont">
                    <a href="blog-singel.html">
                      <h4>Few tips for get better results in examination</h4>
                    </a>
                    <ul className="pb-0 pt-1">
                      <li>
                        <a href="#" className="blog-category">
                          Education
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {/* <Pagination className="courses-pagination mt-50 justify-content-lg-end justify-content-center">
            <Pagination.Prev className="page-item" aria-label="Previous">
              <i className="fa fa-angle-left"></i>
            </Pagination.Prev>
            <Pagination.Item className="page-item active">{1}</Pagination.Item>
            <Pagination.Item className="page-item">{2}</Pagination.Item>
            <Pagination.Item className="page-item">{3}</Pagination.Item>
            <Pagination.Next className="page-item" aria-label="Next">
              <i className="fa fa-angle-right"></i>
            </Pagination.Next>
          </Pagination> */}

          <nav className="courses-pagination mt-50">
            <ul className="pagination justify-content-lg-end justify-content-center">
              <li className="page-item">
                <a href="#" aria-label="Previous">
                  <i className="fa fa-angle-left"></i>
                </a>
              </li>
              <li className="page-item">
                <a className="active" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a href="#">2</a>
              </li>
              <li className="page-item">
                <a href="#">3</a>
              </li>
              <li className="page-item">
                <a href="#" aria-label="Next">
                  <i className="fa fa-angle-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </section>
  );
};

export default Blog;
