import React from "react";
import { Link } from "react-router-dom";
import '../../assets/style/auth-module.css';
import NashcardLogo from '../../assets/images/nashcard-logo.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const publicHeader = () => {
    return (
        <>
            <div className="header box-shadow">
                <Navbar>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img src={NashcardLogo} className="logo" alt="logo"></img>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <a href="/">Home</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <a href="/">Grade</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <a href="/">Shop</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <a href="/">Retail</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <a href="/">About</a>
                            </Navbar.Text>
                            <Navbar.Text>
                                <Link to={"/login"} className="signup-btn bg-primary">Login</Link>
                            </Navbar.Text>
                            <Navbar.Text>
                                <Link to={"/signup"} className="signup-btn bg-theme">Signup</Link>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default publicHeader;
