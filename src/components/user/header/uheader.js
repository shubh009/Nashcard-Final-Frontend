import React from "react";
import { Link } from "react-router-dom";
import './uheaderstyle.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import headerprofileicon from "../../../assets/images/nashcard-user-icon-profile.png"
import NavDropdown from 'react-bootstrap/NavDropdown';

const uheader = () =>
{
    return (
        <>
            <div className="headrbody">
                
                <Navbar>
      <Container>
        <Navbar.Brand href="#home"> <span className="heading-level-2">Dashboard</span></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
                         
                            <div className="header-profile-icon">
                                <img src={headerprofileicon}></img> <div className="crat"></div>

                         </div>
                            
        </Navbar.Collapse>
      </Container>
    </Navbar>
                
               
            </div>
        </>
    )
}
export default uheader;