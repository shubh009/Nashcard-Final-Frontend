import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/public/publicHeader";
import NashcardLogo from "../assets/images/nashcard-logo.png";
const forgotpassword = () => {

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
    }

    const handleRePassword = (e) => {
        let userRePassword = e.target.value;
        setrePassword(userRePassword);

        if (userRePassword === newPassword) {
            setPasswordMatch(false)

        }
        else {
            setPasswordMatch(true)
            setisValid(true);
        }

    }

    const sendLink = () => {
        console.warn(emailError);

        if (emailError) {
            alert("Email Can Not Be Sent.");
        }
        else {

            setForgotForm(false);
            alert("An OTP has been sent on your Email Id.");
        }
    }

    const handlePasswordChange = () => {
        if (isvalid) {
            alert("Password has been changed. Now you can login with new password");
            navigate("/login")
        }

    }

    return (
        <>
            <Header></Header>
            <div className="container-fluid">
                <div class="row justify-content-md-center">
                    <div className="col-lg-4 col-md-6 col-sm-12">

                        {
                            forgotForm ?


                                <div className="forgot-Outer box-shadow">
                                    <div className="login-header text-center">
                                        <div className="forgot-left">
                                            <img src={NashcardLogo} className="loginPage-logo"></img>
                                        </div>
                                        <span className="heading ">Forgot Password? </span>
                                        <p>Enter your email that you used to register your account <br></br> so we can send a link to reset password</p>
                                    </div>
                                    <div className="login-formm">
                                        <div className="form-group">

                                            <input type="text" className="form-control auth-textbox" placeholder=" Registered Email Id" value={email} onChange={validateEmail}></input>

                                            <label className="text-danger">{
                                                emailError ? <span>Please Input Valid Email</span> : ""

                                            }</label>


                                        </div>

                                        <div className="form-group">
                                            <button className=" login-btn" type="button" onClick={sendLink}> Send Link On Email</button>
                                        </div>

                                    </div>
                                </div>
                                :

                                <div className="login-Outer box-shadow">
                                    <div className="login-header text-center">
                                        <span className="heading text-theme">Change Password </span>
                                        <p>Change your password with the help of OTP which you recive don your register email Id</p>



                                    </div>
                                    <div className="login-form">
                                        <div className="form-group">
                                            <label>OTP</label>
                                            <input type="text" className="form-control" placeholder="Enter OTP?" value={Otp} onChange={handleOTP}></input>
                                            {otpValidation ? <label className="text-danger">Invalid OTP</label> : ""}
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input className="form-control" placeholder="Enter New Password" value={newPassword} onChange={handleNewPassword} type="password"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Re Type Password</label>
                                            <input className="form-control" placeholder="Re-Enter New Password" value={rePassword} onChange={handleRePassword} type="password"></input>
                                            {passwordMatch ? <label className="text-danger">Password not match.</label> : ""}
                                        </div>

                                        <div className="form-group">
                                            <button className=" login-btn" type="button" onClick={handlePasswordChange}> Change Password</button>
                                        </div>

                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
export default forgotpassword