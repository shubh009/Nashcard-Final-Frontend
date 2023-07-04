import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const UpdateDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const userid = localStorage.getItem("userIdUpd");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [stat, setStat] = useState("");

  const [contact, setContact] = useState("");
  const [contactValidationError, setcontactValidationError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValidationError, setemailValidationError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValidationError, setpasswordValidationError] = useState(false);

  const [rePassword, setrePassword] = useState("");
  const [rePasswordValidationError, setrePasswordValidationError] =
    useState(false);

  const [isvalid, setIsValid] = useState(true);
  const isactive = true;

  const handleName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleState = (e) => {
    setStat(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handlePincode = (e) => {
    setPincode(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
    let userContact = e.target.value;
    const ContRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!userContact.match(ContRegExp)) {
      setcontactValidationError(true);
      setIsValid(false);
    } else {
      setcontactValidationError(false);
      setIsValid(true);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    let userEmail = e.target.value;
    const EmailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!userEmail.match(EmailRegex)) {
      setemailValidationError(true);
      setIsValid(false);
    } else {
      setemailValidationError(false);
      setIsValid(true);
    }
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
    let userPassword = e.target.value;
    if (userPassword.length < 6) {
      setpasswordValidationError(true);
      setIsValid(false);
    } else {
      setpasswordValidationError(false);
      setIsValid(true);
    }
  };

  const handleRePassword = (e) => {
    setrePassword(e.target.value);
    let userrepassword = e.target.value;
    let userpassword = password;
    if (userpassword === userrepassword) {
      setrePasswordValidationError(false);
      setIsValid(true);
    } else {
      setrePasswordValidationError(true);
      setIsValid(false);
    }
    //console.log(userrepassword, userpassword);
  };

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-customer-updatedata`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setFirstName(data[0].name);
      setLastName(data[0].lastname);
      setCity(data[0].city);
      setContact(data[0].contact);
      setAddress(data[0].address);
      setPincode(data[0].pincode);
      setStat(data[0].state);
      setEmail(data[0].email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = firstname;
    if (isvalid) {
      if (firstname !== "" && contact !== "" && email !== "") {
        // console.log(name, email, contact, password);
        const getdata = async () => {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/updateprofile`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                lastname,
                contact,
                city,
                address,
                pincode,
                stat,
                email,
                userid,
              }),
            }
          );
          const data = await res.json();
          if (res.status === 422 || !data) {
            console.log("error ");
          } else {
            if (!data) {
            } else {
              toast.success("Updated!");
            }
          }
        };
        getdata();
      } else {
        alert("Any Field Can Not Be Blank");
      }
    } else {
      alert("Please Check Validation Error Mesage");
    }
  };

  const passwordUpdate = async (e) => {
    e.preventDefault();
    if (isvalid) {
      if (password !== "" && rePassword !== "") {
        // console.log(name, email, contact, password);
        const getdata = async () => {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/profilechangepassword`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify( { email :  email}),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            console.log("error ");
          } else {
            if (!data) {
            } else {
              // setSearchData(data);
              toast.success("Updated Password!");
              setPassword("");
              setrePassword("");
            }
          }
        };
        getdata();
      } else {
        alert("Any Field Can Not Be Blank");
      }
    } else {
      alert("Please Check Validation Error Mesage");
    }
  };

  return (
    <div className="container-fluid " id="admin">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="row" id="grade">
        <div className="col-lg-2 noleftrightpadding">
          <UsidePanel></UsidePanel>
        </div>
        <div className="col-lg-10 noleftrightpadding">
          <Uheader></Uheader>

          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-8">
                  <div className="Dashboardsec box-shadow helpform">
                    <div className="row ">
                      <div className="col-lg-8">
                        <div className="Topl">
                          <span className="heading-level-2">
                            Update User Details
                          </span>
                        </div>
                      </div>

                      {/* <div className="col-lg-4">
                                   <Link to="/address" className="submitbtn mt-1 float-start text-ce">Search By Address</Link>
                                 
                                </div> */}
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <label className="fw-bold">First Name</label>
                          <input
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={handleName}
                            className="form-control"
                          ></input>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={handleLastName}
                            className="form-control"
                          ></input>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Address</label>
                          <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={handleAddress}
                            className="form-control"
                          ></input>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">State</label>
                          <input
                            type="text"
                            placeholder="State"
                            value={stat}
                            onChange={handleState}
                            className="form-control"
                          ></input>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <label className="fw-bold">Contact No</label>
                          <input
                            type="text"
                            placeholder="Contact"
                            value={contact}
                            name="contact"
                            onChange={handleContact}
                            className="form-control"
                          ></input>
                          {contactValidationError ? (
                            <label className="text-danger">
                              Invalid Phone NO
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Email Id</label>
                          <input
                            placeholder="Email"
                            value={email}
                            name="email"
                            onChange={handleEmail}
                            type="text"
                            className="form-control"
                          ></input>
                          {emailValidationError ? (
                            <label className="text-danger">Invalid Email</label>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">City</label>
                          <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={handleCity}
                            className="form-control"
                          ></input>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Zipcode</label>
                          <input
                            type="text"
                            placeholder="Zipcode"
                            value={pincode}
                            onChange={handlePincode}
                            className="form-control"
                          ></input>
                        </div>
                      </div>
                      <div className="col-lg-12 text-center">
                        <div className="form-group">
                          <button
                            onClick={handleSubmit}
                            className="submitbtn text-center"
                          >
                            Update User Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="Dashboardsec box-shadow helpform">
                    <div className="Topl">
                      <span className="heading-level-2">Update Password</span>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        placeholder="Password"
                        value={password}
                        onChange={handlePass}
                        type="password"
                        className="form-control"
                      ></input>
                      {passwordValidationError ? (
                        <label className="text-danger">
                          Password should be greater then 6 character
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label>Re Type Password</label>
                      <input
                        className="form-control"
                        placeholder="Confirm Password"
                        value={rePassword}
                        onChange={handleRePassword}
                        type="password"
                      ></input>
                      {/* <input className="form-control auth-textbox " placeholder="Confirm Password" value={rePassword} onChange={handleRePassword} type="password"></input> */}
                      {rePasswordValidationError ? (
                        <label className="text-danger">
                          Password Does not match
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <button
                        onClick={passwordUpdate}
                        className="submitbtn text-center"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="container-fluid"> */}
        </div>
      </div>
    </div>
  );
};
export default UpdateDetails;
