import React, { useEffect, useState } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./profile.css";
import Userprofile from "../../../../assets/images/rectangle-user-icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const profile = () => {
  const userid = localStorage.getItem("userid");
  //States to manage profile
  const [pname, setName] = useState("");
  const [uslastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [Npassword, setNPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  //States to manage home adrss
  const [homeAddress, setHomeAddress] = useState("");
  const [homecity, setHomecity] = useState("");
  const [homepincode, setHomePincode] = useState("");
  const [homeSttae, sethomeState] = useState("");
  //States to manage office adrss
  const [officeAddress, setofficeAddress] = useState("");
  const [officecity, setofficecity] = useState("");
  const [officepincode, setofficePincode] = useState("");
  const [officeState, setofficeState] = useState("");
  //States to manage popups
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getprofiledata();
  };

  const [ dvalue, setdvalue ] = useState( "" );
  //toastr notification
  const notify = () => toast.success("Profile Information has been updated");
  const Changepassnotify = () =>
    toast.success("WOW! Password has been changed");
  const notifyalert = () => toast.error("Please fill all the details");

  

  const onServiceLevelDDL = (e) => {
    var index = e.target.selectedIndex;
    setdvalue(e.target.value) ;
    //alert(dvalue);
  };

  const handleRePassword = (e) => {
    let userRePassword = e.target.value;
    setNPassword(userRePassword);
    if (userRePassword === password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  useEffect(() => {
    getprofiledata();
  }, []);

  const getprofiledata = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/getprofile`, {
      method: "post",
      body: JSON.stringify({ userid: userid }),
      headers: {
        "content-type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    setName(result.name);
    setEmail(result.email);
    setContact(result.contact);
    setlastName(result.lastname);
    setHomeAddress(result.address);
    setHomecity(result.city);
    setHomePincode(result.pincode);
    sethomeState(result.state);
    setofficeAddress(result.officeAdress);
    setofficecity(result.officeCity);
    setofficePincode(result.officepincode);
    setofficeState(result.officeState);
  };

  const updateProfile = async () => {
    if (pname != "" && contactno != "") {
      let profileResult = await fetch(
        `${process.env.REACT_APP_API_URL}/updateprofileFromUser`,
        {
          method: "PATCH",
          body: JSON.stringify({
            userid: userid,
            name: pname,
            lastname: uslastname,
            contact: contactno,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      profileResult = await profileResult.json();
      //console.log(profileResult);
      notify();
    } else {
      notifyalert();
    }
  };

  //code to update home and office address
  const updateaddress = async () => {
    if (
      dvalue == 1
    ) {
      //alert(homeSttae);
      let profileResult = await fetch(
        `${process.env.REACT_APP_API_URL}/updateaddress`,
        {
          method: "PATCH",
          body: JSON.stringify({
            userid: userid,
            address: homeAddress,
            city: homecity,
            state: homeSttae,
            pincode: homepincode,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      profileResult = await profileResult.json();
      //console.log(profileResult);
      notify();
    } else if (dvalue == 2) {
      let profileResult = await fetch(
        `${process.env.REACT_APP_API_URL}/updateaddress`,
        {
          method: "PATCH",
          body: JSON.stringify({
            userid: userid,
            officeAdress: officeAddress,
            officeCity: officecity,
            officeState: officeState,
            officepincode: officepincode,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      profileResult = await profileResult.json();
      //console.log(profileResult);
      notify();
    } else {
      notifyalert();
    }
  };

  const updatepassword = async () => {
    if (password != "" && Npassword != "" && !passwordMatch) {
      let passwordResult = await fetch(
        `${process.env.REACT_APP_API_URL}/profilechangepassword`,
        {
          method: "post",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      passwordResult = await passwordResult.json();
      setPassword("");
      setNPassword("");

      Changepassnotify();
    } else {
      notifyalert();
    }

    //console.log(passwordResult);
  };

  return (
    <div className="container-fluid ppI">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Address</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          <div className="form-group mb-3 mt-2">
            <label>Adress Type</label>
            <select
              name="ServiceLevel"
              id="ServiceLevel"
              className="form-control"
              onChange={onServiceLevelDDL}
            >
              <option value="0" name="select">
                Select Adress Type
              </option>
              <option value="1" name="select">
                Home Address
              </option>
              <option value="2" name="select">
                Office Address
              </option>
            </select>
          </div>
          <div className="form-group mb-3 mt-2">
            <label>Address</label>
            <input
              className="form-control"
              type="text"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            ></input>
          </div>
          <div className="form-group mb-3 mt-2">
            <label>City</label>
            <input
              className="form-control"
              type="text"
              value={homecity}
              onChange={(e) => setHomecity(e.target.value)}
            ></input>
          </div>
          <div className="form-group mb-3 mt-2">
            <label>State</label>
            <input
              className="form-control"
              type="text"
              value={homeSttae}
              onChange={(e) => sethomeState(e.target.value)}
            ></input>
          </div>
          <div className="form-group mb-3 mt-2">
            <label>Zipcode</label>
            <input
              className="form-control"
              type="text"
              value={homepincode}
              onChange={(e) => setHomePincode(e.target.value)}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateaddress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col-lg-2 noleftrightpadding">
          <UsidePanel></UsidePanel>
        </div>
        <div className="col-lg-10 profile noleftrightpadding">
          <Uheader></Uheader>
          <div className="Dashboardsec box-shadow">
            <div className="row orer-details">
              <div className="Topl mb-3">
                <span className="heading-level-2">My Profile</span>
              </div>
              <div className="mt-2">
                <div className="row profile-tab-hz">
                  <div className="col-lg-2">
                    <img src={Userprofile} width="70%"></img>
                  </div>
                </div>
                <div className="row profile-tab-hz">
                  <div className="col-lg-3">
                    <h3 className="heading-level-3 mt-4">Customer Name</h3>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="textbox"
                        className="form-control"
                        value={pname}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="textbox"
                        className="form-control"
                        value={uslastname}
                        onChange={(e) => setlastName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row profile-tab-hz border-top pt-4">
                  <div className="col-lg-3">
                    <h3 className="heading-level-3 mt-4">Contact Info</h3>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label>Email Id</label>
                      <input
                        type="textbox"
                        className="form-control disabled"
                        value={email}
                        disabled
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label>Contact No</label>
                      <input
                        type="textbox"
                        className="form-control"
                        value={contactno}
                        onChange={(e) => setContact(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <button
                        type="submit"
                        className="submitbtn d-block mt-4 mt-2"
                        onClick={updateProfile}
                      >
                        Update Profile Info
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row profile-tab-hz border-top pt-4">
                  <div className="col-lg-3">
                    <h3 className="heading-level-3 mt-4">Set New Password</h3>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        value={Npassword}
                        onChange={handleRePassword}
                      ></input>
                      {passwordMatch ? (
                        <label className="text-danger">
                          Password does not match
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <button
                        type="submit"
                        className="submitbtn d-block mt-4 mt-2"
                        onClick={updatepassword}
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row profile-tab-hz border-top pt-4">
                  <div className="col-lg-3">
                    <h3 className="heading-level-3 mt-4">Adress</h3>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <p className="heading-level-4 mb-0">Home Address</p>
                      <p className="mb-0">{homeAddress}</p>
                      <p className="mb-0">{homecity}</p>
                      <p className="mb-0">
                        {homeSttae}, {homepincode}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <p className="heading-level-4 mb-0">Office Address</p>
                      <p className="mb-0">{officeAddress}</p>
                      <p className="mb-0">{officecity}</p>
                      <p className="mb-0">
                        {officeState} {officepincode}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <button
                        onClick={handleShow}
                        className="submitbtn d-block mt-4 mt-2"
                      >
                        Edit Adress
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default profile;
