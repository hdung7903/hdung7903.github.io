import Logo from "../../../assets/images/logo-edu.jpg";

function Footer() {
    return (
        <footer id="footer-part">
            <div className="footer-top pt-40 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about mt-40">
                                <div className="logo">
                                    <a href="#" className="text-decoration-none"><img src={Logo} alt="Logo" /></a>
                                </div>
                                <p className="text-center">Hỗ trợ học sinh cấp 1 học tập</p>
                                <ul className="mt-20">
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-facebook-f"></i></a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-google-plus"></i></a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer-link mt-40">
                                <div className="footer-title pb-25">
                                    <h6>Sitemap</h6>
                                </div>
                                <ul>
                                    <li><a href="index-2.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>Home</a></li>
                                    <li><a href="about.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>About us</a></li>
                                    <li><a href="courses.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>Courses</a></li>
                                    <li><a href="blog.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>News</a></li>
                                    <li><a href="events.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>Event</a></li>
                                </ul>
                                <ul>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-angle-right"></i>Gallery</a></li>
                                    <li><a href="shop.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>Shop</a></li>
                                    <li><a href="teachers.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>Teachers</a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-angle-right"></i>Support</a></li>
                                    <li><a href="contact.html" className="text-decoration-none"><i className="fa fa-angle-right"></i>Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="footer-link support mt-40">
                                <div className="footer-title pb-25">
                                    <h6>Support</h6>
                                </div>
                                <ul>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-angle-right"></i>FAQS</a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-angle-right"></i>Privacy</a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-angle-right"></i>Policy</a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-angle-right"></i>Support</a></li>
                                    <li><a href="#" className="text-decoration-none"><i className="fa fa-angle-right"></i>Documentation</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-address mt-40">
                                <div className="footer-title pb-25">
                                    <h6>Contact Us</h6>
                                </div>
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-home"></i>
                                        </div>
                                        <div className="cont">
                                            <p>Smart Kids</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        <div className="cont">
                                            <p>+3 123 456 789</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-envelope-o"></i>
                                        </div>
                                        <div className="cont">
                                            <p>info@yourmail.com</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;