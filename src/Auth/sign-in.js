import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RightImage from "../assets/images/login-image.jpeg";
import NashcardLogo from "../assets/images/nashcard-logo.png";

const signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setvalidationError] = useState(false);
    const [emailerror, setemailError] = useState(false);
    const navigate = useNavigate();

    const handleEmail = (e) => {
        let userEmail = e.target.value;
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        setEmail(userEmail);
        if (!userEmail.match(emailRegex)) {
            setemailError(true);
        }
        else {
            setemailError(false);
        }

    }

    const handlePass = (e) => {
        let userPass = e.target.value;
        setPassword(userPass);
        if (userPass.length < 3) {
            setvalidationError(true);
        }
        else {
            setvalidationError(false);
        }

    }

    const userLogin = async () => {
        if (email && password) {
            let resultt = await fetch('http://localhost:5000/login', {
                method: "post",
                body: JSON.stringify({ email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            resultt = await resultt.json();
            console.log(resultt);
            if (resultt.name) {
                if(resultt.name==="Admin")
                {
                    localStorage.setItem("adminid", resultt.adminid);
                    localStorage.setItem("name", resultt.name)
                    navigate("/admin/dashboard")
                }
                else
                {
                    localStorage.setItem("userid", resultt.userid);
                    localStorage.setItem("name", resultt.name)
                    navigate("/user/dashbaord")
                }
                
                // console.log(result.name)
               // navigate("/user/dashbaord");
            }
            else {
                alert("User Not Found");
            }
        }
        else {

            setvalidationError(true);
        }
    }

    return (
        <>
            {/* <Header></Header> */}
            <div className="container-fluid">
                <div class="row justify-content-md-center">
                    <div className="col-lg-6 noleftrightpadding">
                        <div className="login-left login-Outer">
                            <img src={NashcardLogo} className="loginPage-logo"></img>
                            <h3 className="fw-bold">Sign in</h3>
                            <p className="text-secondary">Hey, enter your login details to get sign <br></br> in to your account</p>
                            <div className="login-form">
                                <form>
                                    <div className="form-group">
                                        <input type="textbox" className="form-control auth-textbox " placeholder="Email" onChange={handleEmail} value={email}></input>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control auth-textbox " placeholder="Password" type="password" onChange={handlePass} value={password}></input>
                                        {/* //validation Error Message// */}
                                        <label>{validationError ? <span className="text-danger">Email & Password can not be blank </span> : ""}</label>

                                        <label>{emailerror ? <span className="text-danger">Invalid Email </span> : ""}</label>
                                        {/* //validation Error Message// */}
                                    </div>
                                    <div className="form-group">
                                        <button className=" login-btn" onClick={userLogin} type="button"> Signin To Continue</button>
                                    </div>

                                    <div className="form-group text-center">
                                        <Link to="/forgot-password">Forgot Password? Click Here...</Link>

                                    </div>
                                    <div className="form-group text-center">
                                        <Link to={"/signup"} className="text-black ">Not Yet a Nashcards Customer? <b>Create Account</b></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 noleftrightpadding">
                        <img src={RightImage} width="100%" className="login-right-image"></img>
                    </div>
                </div>
            </div>

        </>
    )

}

export default signin