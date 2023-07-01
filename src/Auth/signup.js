import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/header/publicHeader";
const signup = () => {
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
                let result = await fetch('http://localhost:5000/register', {
                    method: 'post',
                    body: JSON.stringify({ name, email, contact, password, isactive }),
                    headers: {
                        'content-type': 'application/json'
                    },
                });
                result = await result.json();
                if (result) {

                    console.log(result);
                    localStorage.setItem("user", JSON.stringify(result));
                    navigate("/login");
                    //alert("User Has been Sucessfully ");

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
            <Header></Header>
            <div className="container-fluid">
                <div class="row justify-content-md-center">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="signup-Outer box-shadow">
                            <div className="login-header text-center">
                                <span className="heading text-theme">Nashcard Signup</span>
                                <p>Hey, fill the below details to get Signup <br></br> in to Nashcard</p>
                            </div>
                            <div className="login-form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Email Id" value={name} onChange={handleName} name="name"></input>

                                </div>
                                <div className="form-group">
                                    <label>Contact</label>
                                    <input type="text" className="form-control" placeholder="Contact No" value={contact} name="contact" onChange={handleContact}></input>
                                    {contactValidationError ? <label className="text-danger">Invalid Phone NO</label> : ""}
                                </div>
                                <div className="form-group">
                                    <label>Email Id</label>
                                    <input type="text" className="form-control" placeholder="Email Id" value={email} name="email" onChange={handleEmail}></input>
                                    {emailValidationError ? <label className="text-danger">Invalid Email</label> : ""}
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePass}
                                        name="password"></input>
                                    {passwordValidationError ? <label className="text-danger">Password should be greater then 6 character</label> : ""}
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" placeholder="Password" value={rePassword}
                                        name="password" onChange={handleRePassword}></input>
                                    {rePasswordValidationError ? <label className="text-danger">Password Does not match</label> : ""}
                                </div>




                                <div className="form-group">
                                    <button className=" login-btn" type="button" onClick={userSignup}> Signup</button>
                                </div>
                                <div className="form-group text-center">
                                    <Link to={"/login"} className="text-black ">Already a Nashcards Customer? <b>Login Now</b></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default signup;