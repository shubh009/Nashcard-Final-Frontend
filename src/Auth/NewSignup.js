import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RightImage from "../assets/images/login-image.jpeg";
import NashcardLogo from "../assets/images/nashcard-logo.png";

const Newsignup = () => {
    const [name, setName] = useState('');

    const [contact, setContact] = useState('');
    const [contactValidationError, setcontactValidationError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailValidationError, setemailValidationError] = useState(false);


    const [password, setPassword] = useState('');
    const [passwordValidationError, setpasswordValidationError] = useState(false);


    const [rePassword, setrePassword] = useState('');
    const [rePasswordValidationError, setrePasswordValidationError] = useState(false);

    const [isvalid, setIsValid] = useState(true);
    const isactive = true;
    const navigate = useNavigate();
    const handleName = (e) => {
        setName(e.target.value);

    }

    const handleContact = (e) => {
        setContact(e.target.value);
        let userContact = e.target.value;
        const ContRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!userContact.match(ContRegExp)) {
            setcontactValidationError(true);
            setIsValid(false)
        }
        else {
            setcontactValidationError(false);
            setIsValid(true)
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        let userEmail = e.target.value;
        const EmailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        if (!userEmail.match(EmailRegex)) {
            setemailValidationError(true);
            setIsValid(false)
        }
        else {
            setemailValidationError(false);
            setIsValid(true)
        }
    }

    const handlePass = (e) => {
        setPassword(e.target.value);
        let userPassword = e.target.value;
        if (userPassword.length < 6) {
            setpasswordValidationError(true);
            setIsValid(false)
        }
        else {
            setpasswordValidationError(false);
            setIsValid(true)
        }
    }



    const handleRePassword = (e) => {
        setrePassword(e.target.value);
        let userrepassword = e.target.value;
        let userpassword = password;
        if (userpassword === userrepassword) {
            setrePasswordValidationError(false)
            setIsValid(true)
        }
        else {
            setrePasswordValidationError(true)
            setIsValid(false)

        }
        //console.log(userrepassword, userpassword);

    }
    const userSignup = async () => {
        if (isvalid) {
            if (name !== "" && contact !== "" && email !== "" && password !== "" && rePassword !== "") {
                // console.log(name, email, contact, password);
                const min = 999;
                const max = 10000;
                let userid = min + Math.random() * (max - min);
                userid=Math.round(userid);
                alert(userid)
                let result = await fetch('http://localhost:5000/register', {
                    method: 'post',
                    body: JSON.stringify({ name, lastname: "", email, contact, password, isactive, userid }),
                    headers: {
                        'content-type': 'application/json'
                    },
                });
                result = await result.json();
                if (result) {

                    // localStorage.setItem("user", JSON.stringify(result.userid));
                    // localStorage.setItem("name", JSON.stringify(result.name));
                    alert("Thanks, your account has been successfully created at Nashcard!!! Now You can login & enjoy grading services ");
                    navigate("/login");
                   

                }
            }
            else {
                alert("Any Field Can Not Be Blank")
            }
        }
        else {
            alert("Please Check Validation Error Mesage");
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div class="row justify-content-md-center">
                    <div className="col-lg-6 noleftrightpadding">
                        <div className="login-left signup-Outer">
                            <div>
                                <img src={NashcardLogo} className="loginPage-logo"></img>
                            </div>

                            <h3 className="fw-bold">Sign up</h3>
                            <p className="text-secondary">Hey, it's look like you dont have Nashcard account. <br></br> Lets create New Account </p>
                            <div className="login-form">
                                <form>
                                    <div className="form-group">
                                        <input type="textbox" className="form-control auth-textbox " placeholder="Name" value={name} onChange={handleName} name="name"></input>
                                    </div>
                                    <div className="form-group">
                                        <input type="textbox" className="form-control auth-textbox " placeholder="Email" value={email} name="email" onChange={handleEmail}></input>
                                        {emailValidationError ? <label className="text-danger">Invalid Email</label> : ""}
                                    </div>
                                    <div className="form-group">
                                        <input type="textbox" className="form-control auth-textbox " placeholder="Contact" value={contact} name="contact" onChange={handleContact} ></input>
                                        {contactValidationError ? <label className="text-danger">Invalid Phone NO</label> : ""}
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input className="form-control auth-textbox " placeholder="Password" value={password} onChange={handlePass} type="password"></input>
                                                {passwordValidationError ? <label className="text-danger">Password should be greater then 6 character</label> : ""}

                                            </div>
                                            <div className="col-lg-6">
                                                <input className="form-control auth-textbox " placeholder="Confirm Password" value={rePassword} onChange={handleRePassword} type="password"></input>
                                                {rePasswordValidationError ? <label className="text-danger">Password Does not match</label> : ""}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button className=" login-btn" type="button" onClick={userSignup}> Signin To Continue</button>
                                    </div>

                                    <div className="form-group text-center ">
                                        <Link to={"/login"} className="text-primary">Already a Nashcards Customer? <b>Login Now</b></Link>
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

export default Newsignup