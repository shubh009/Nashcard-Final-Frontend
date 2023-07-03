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

const Customers = () => {
  const [searchDatas, setSearchData] = useState([]);
  const [getCustomerData, setCustomerData] = useState([]);
  const [name, setName] = useState("");

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
  const columns = [
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Name",
      width: 150,
    },
    {
      field: "email",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Email",
      width: 150,
    },
    {
      field: "Detail",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Details/Create New Order",
      width: 200,
      renderCell: (row) => (
        <td>
          <Link
            to="/admin/customer/user-details/"
            onClick={() => orderDetails(row.row.userid)}
            className=""
          >
            Details/Create New Order
          </Link>
        </td>
      ),
    },
    {
      field: "update",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Update Customer",
      width: 200,
      renderCell: (row) => (
        <td>
          <Link
            to="/admin/update-details/"
            onClick={() => orderDetailsUpd(row.row.userid)}
            className=""
          >
            Update Customer
          </Link>
        </td>
      ),
    },
  ];

  const orderDetails = async (userid) => {
    localStorage.setItem("userid", userid);
  };
  const orderDetailsUpd = async (userid) => {
    localStorage.setItem("userIdUpd", userid);
  };

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/get-data-customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (data.length > 0) {
          setCustomerData(data);
        } else {
          setCustomerData([]);
        }
      }
    };
    getdata();
  }, []);

  const rows = getCustomerData.map((element, index) => ({
    _id: element._id,
    name: element.name,
    email: element.email,
    userid: element.userid,
  }));

  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };

  const handleName = (e) => {
    setName(e.target.value);
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
  const userSignup = async () => {
    if (isvalid) {
      if (
        name !== "" &&
        contact !== "" &&
        email !== "" &&
        password !== "" &&
        rePassword !== ""
      ) {
        // console.log(name, email, contact, password);
        const min = 999;
        const max = 10000;
        let userid = min + Math.random() * (max - min);
        userid = Math.round(userid);
        let result = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
          method: "post",
          body: JSON.stringify({
            name,
            lastname: "",
            email,
            contact,
            password,
            isactive,
            userid,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        result = await result.json();
        if (result) {
          toast.success("New account added!");
          setEmail("");
          setName("");
          setContact("");
          setPassword("");
          setrePassword("");
          // localStorage.setItem("user", JSON.stringify(result.userid));
          // localStorage.setItem("name", JSON.stringify(result.name));
          // alert("Thanks, your account has been successfully created at Nashcard!!! Now You can login & enjoy grading services ");
          // navigate("/login");
        }
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
                <div className="col-lg-7">
                  <div className="Dashboardsec box-shadow helpform">
                    <div className="row pt-3">
                      <div className="col-lg-8">
                        <div className="Topl">
                          <span className="heading-level-2">Our Customers</span>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <Link
                          to="/admin/address"
                          className="submitbtn mt-1 float-start text-ce"
                        >
                          Search By Address
                        </Link>
                      </div>
                    </div>

                    <DataGrid
                      className="mt-3 mb-3"
                      style={{ fontWeight: "400" }}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                      density="compact"
                      autoHeight
                      getRowId={(element) => element._id}
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 15,
                          },
                        },
                      }}
                      {...other}
                    />
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="Dashboardsec box-shadow helpform">
                    <h3 className="fw-bold mb-3">Sign up</h3>

                    <form>
                      <div className="form-group">
                        <input
                          type="textbox"
                          className="form-control auth-textbox "
                          placeholder="Name"
                          value={name}
                          onChange={handleName}
                          name="name"
                        ></input>
                      </div>
                      <div className="form-group">
                        <input
                          type="textbox"
                          className="form-control auth-textbox "
                          placeholder="Email"
                          value={email}
                          name="email"
                          onChange={handleEmail}
                        ></input>
                        {emailValidationError ? (
                          <label className="text-danger">Invalid Email</label>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="textbox"
                          className="form-control auth-textbox "
                          placeholder="Contact"
                          value={contact}
                          name="contact"
                          onChange={handleContact}
                        ></input>
                        {contactValidationError ? (
                          <label className="text-danger">
                            Invalid Phone NO
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-lg-6">
                            <input
                              className="form-control auth-textbox "
                              placeholder="Password"
                              value={password}
                              onChange={handlePass}
                              type="password"
                            ></input>
                            {passwordValidationError ? (
                              <label className="text-danger">
                                Password should be greater then 6 character
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-lg-6">
                            <input
                              className="form-control auth-textbox "
                              placeholder="Confirm Password"
                              value={rePassword}
                              onChange={handleRePassword}
                              type="password"
                            ></input>
                            {rePasswordValidationError ? (
                              <label className="text-danger">
                                Password Does not match
                              </label>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          className="submitbtn mt-3"
                          type="button"
                          onClick={userSignup}
                        >
                          {" "}
                          Signin To Continue
                        </button>
                      </div>
                    </form>
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
export default Customers;
