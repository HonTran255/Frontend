import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

//cre: Scanfcode.com footer template
const Footer = (props) => {
    return (
        <footer className="site-footer">
            <div className="container-lg">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="mb-4">
                            <h6>About</h6>
                            <div className="mt-4 mb-2 d-block">
                                <Logo />
                            </div>
                            <p style={{ textAlign: 'justify' }}>
                                Website thương mại kinh doanh mô hình.
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                                Trần Thị Ngọc Hơn - B1809238
                            </p>
                        </div>

                        <div className="mb-4">
                            <h6>Technologies</h6>
                            <p style={{ textAlign: 'justify' }}>
                                React.js, Node.js, Express.js, Mongo DB and
                                Bootstrap v5.0.
                            </p>
                        </div>

                        {/* <div className="">
                            <h6>Thanks</h6>
                            <p style={{ textAlign: 'justify' }}>
                                Master Nguyen Huu Trung, Ho Chi Minh City
                                University of Technology and Education.
                            </p>
                        </div> */}
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Chăm sóc khách hàng</h6>
                        <ul className="footer-links">
                            <li>Hướng Dẫn Mua Hàng</li>
                            <li>Thanh Toán</li>
                            <li>Trung Tâm Trợ Giúp</li>
                            <li>Vận chuyển</li>
                            <li>Chính sách bảo hành</li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Về chúng tôi</h6>
                        <ul className="footer-links">
                            <li>
                                <Link className="link-hover text-reset" to="#">
                                    Giới thiệu về Dunne
                                </Link>
                            </li>
                            <li>
                                <Link className="link-hover text-reset" to="#">
                                    Liên hệ với chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link className="link-hover text-reset" to="#">
                                    Chính sách bảo mật
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            Copyright &copy; 2021 All Rights Reserved by{' '}
                            <Link className="link-hover text-reset" to="#">
                                Hon Tran
                            </Link>
                            .
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li>
                                <Link
                                    className="facebook"
                                    to={{
                                        pathname:
                                            'https://www.facebook.com/hontran255/',
                                    }}
                                    target="_blank"
                                >
                                    <i className="fab fa-facebook"></i>
                                </Link>
                            </li>
                            <li>
                                <Link className="google" to="#">
                                    <i className="fab fa-google"></i>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="github"
                                    to={{
                                        pathname:
                                            'https://github.com/HonTran255',
                                    }}
                                    target="_blank"
                                >
                                    <i className="fab fa-github"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
