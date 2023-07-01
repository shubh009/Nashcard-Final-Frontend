import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RightImage from "../assets/images/login-image.jpeg";
import NashcardLogo from "../assets/images/nashcard-logo.png";

const fpassword = () => {
    //send email textbox state
    const [email, setEmail] = useState('');
    const [emailError, setemailError] = useState(false);

    //Validation & change password form state
    const [Otp, setOtp] = useState('');
    const [otpValidation, setotpValidation] = useState(false);

    const [newPassword, setnewPassword] = useState('');

    const [rePassword, setrePassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    //form level state
    const [forgotForm, setForgotForm] = useState(true);
    const [isvalid, setisValid] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (e) => {

        let userEmail = e.target.value;
        setEmail(userEmail);
        const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        console.log(email);
        if (!email.match(emailRegex)) {
            setemailError(true);
        }
        else {
            setemailError(false);
        }
    }

    const handleOTP = (e) => {

        let UserOTP = e.target.value;
        setOtp(UserOTP);
        const Numregx = /^[0-9\b]+$/;
        if (!UserOTP.match(Numregx)) {
            setotpValidation(true);
        }
        else {
            setotpValidation(false);
            setisValid(true);
        }
    }

    const handleNewPassword = (e) => {
        let userNewPassword = e.target.value;
        setnewPassword(userNewPassword);
        setisValid(true);
    }

    const handleRePassword = (e) => {
        let userRePassword = e.target.value;
        setrePassword(userRePassword);
        console.log(rePassword);
        if (userRePassword === newPassword) {
            setPasswordMatch(false)
        }
        else {
            setPasswordMatch(true)
            setisValid(true);
        }

    }

    const sendLink = async () => {
        console.warn(emailError);

        if (emailError) {
            alert("Email Can Not Be Sent.");
        }
        else {
            setForgotForm(false);
            let result = await fetch('http://localhost:5000/emailsend', {
                method: 'post',
                body: JSON.stringify({ email }),
                headers: {
                    'content-type': 'application/json'
                },
            });
            result = await result.json();
            if (result) {
                alert("An OTP has been sent on your Email Id.", result);
            }

        }
    }

    const handlePasswordChange = async () => {
        console.log(isvalid);
        if (isvalid) {

            console.log(email, Otp, newPassword)

            let result = await fetch('http://localhost:5000/changepassword', {
                method: 'post',
                body: JSON.stringify({ email, Otp, newPassword }),
                headers: {
                    'content-type': 'application/json'
                },
            });
            result = await result.json();
            if (result) {
                alert("Password has been changed. Now you can login with new password");
                navigate("/login")
            }


        } else {
            alert("isvalid is false");
        }

    }


    return (
        <>
            <div className="container-fluid">
                <div class="row justify-content-md-center">
                    <div className="col-lg-6 noleftrightpadding">

                        {
                            forgotForm ?
                                <div className="login-left login-Outer">
                                    <img src={NashcardLogo} className="loginPage-logo"></img>

                                    <h3 className="fw-bold">Forgot Password</h3>
                                    <p className="text-secondary">Enter your email that you used to register your account<br></br> so we can send a link to reset password</p>
                                    <div className="login-form">
                                        <form>
                                            <div className="form-group">
                                                <input type="textbox" className="form-control auth-textbox " placeholder="Registered Email" value={email} onChange={validateEmail}></input>


                                                <label className="text-danger">{
                                                    emailError ? <span>Please Input Valid Email</span> : ""
                                                }</label>

                                            </div>

                                            <div className="form-group">
                                                <button className=" login-btn" onClick={sendLink} type="button"> Send Link On Email</button>
                                            </div>


                                            <div className="form-group text-center">
                                                <Link to={"/signup"} className="text-black ">Not Yet a Nashcards Customer? <b>Create Account</b></Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                :
                                <div className="login-left login-Outer">
                                    <img src={NashcardLogo} className="loginPage-logo"></img>
                                    <h3 className="fw-bold">Change Password</h3>
                                    <p className="text-secondary">Lost Your Password? Please Create New Password Here.</p>
                                    <div className="login-form">
                                        <form>
                                            <div className="form-group">
                                                <input type="textbox" className="form-control auth-textbox " placeholder="OTP" value={Otp} onChange={handleOTP}></input>
                                                {otpValidation ? <label className="text-danger">Invalid OTP</label> : ""}
                                            </div>
                                            <div className="form-group">
                                                <input type="password"
                                                    value={newPassword} onChange={handleNewPassword} className="form-control auth-textbox " placeholder="New Password"></input>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control auth-textbox "
                                                    value={rePassword} onChange={handleRePassword}
                                                    placeholder="Verify Password"></input>
                                                {passwordMatch ? <label className="text-danger">Password not match.</label> : ""}
                                            </div>
                                            <div className="form-group">
                                                <button className=" login-btn" type="button" onClick={handlePasswordChange}> Change Password</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        }

                    </div>
                    <div className="col-lg-6 noleftrightpadding">
                        <img src={RightImage} width="100%" className="login-right-image"></img>
                    </div>
                </div>
            </div>

        </>
    )

}

export default fpassword