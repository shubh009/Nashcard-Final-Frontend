
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/header/publicHeader";
const login = () => {

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

        console.warn(email, password);
        if (email && password) {
            let result = await fetch('http://localhost:5000/login', {
                method: "post",
                body: JSON.stringify({ email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json();
            console.log(result);
            if (result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                alert("Login Sucessfully. You will redirect to user Dashboard Page");
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
            <Header></Header>
            <div className="container-fluid">
                <div class="row justify-content-md-center">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="login-Outer box-shadow">
                            <div className="login-header text-center">
                                <span className="heading text-theme">Nashcard Login</span>
                                <p>Hey, enter your login details to get sign <br></br> in to your account</p>
                            </div>
                            <div className="login-form">
                                <div className="form-group">
                                    <label>Email Id</label>
                                    <input type="text" className="form-control" placeholder="Email Id" onChange={handleEmail} value={email} ></input>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" onChange={handlePass} value={password} ></input>
                                    <div className="text-center mt-1">
                                        <label>{validationError ? <span className="text-danger">Email & Password can not be blank </span> : ""}</label>

                                        <label>{emailerror ? <span className="text-danger">Invalid Email </span> : ""}</label>


                                    </div>
                                </div>

                                <div className="form-group">
                                    <button className=" login-btn" onClick={userLogin} type="button"> Login</button>
                                </div>

                                <div className="form-group text-center">
                                    <Link to="/forgot-password">Forgot Password? Click Here...</Link>

                                </div>


                                <div className="form-group text-center">
                                    <Link to={"/signup"} className="text-black ">Not Yet a Nashcards Customer? <b>Signup</b></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default login