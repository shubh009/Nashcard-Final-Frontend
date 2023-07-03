import React, { useEffect, useState } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const EditGrade = () => {
  const navigate = useNavigate();
  const [cert, setCert] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [datePooped, setDatePooped] = useState("");
  const [pSASub, setPSASub] = useState("");
  const [pSASubAmt, setPSASubAmt] = useState("");

  const orderid = localStorage.getItem("gradeOrder");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      cert !== "" &&
      grade !== "" &&
      orderNo !== "" &&
      description !== "" &&
      pSASub !== ""
    ) {
      const getdata1 = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/update-grades`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cert,
              grade,
              pSASub,
              description,
              pSASubAmt,
              datePooped,
              orderNo,
            }),
          }
        );
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
          } else {
            navigate("/admin/order-details/");
          }
        }
      };
      getdata1();
    } else {
      alert("Any Field Can Not Be Blank");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-grades-for-edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderid,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        console.log(data);
        setCert(data[0].cert);
        setGrade(data[0].grade);
        setDescription(data[0].desc);
        setOrderNo(data[0].ordernumber);
        setPSASub(data[0].psasub);
        setDatePooped(formatDate(new Date(data[0].datepopped)));
        setPSASubAmt(data[0].psaupcharge);
        // setProjectData(data);
      } else {
        // setProjectData([])
      }
    }
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container-fluid " id="admin">
        <div className="row">
          <div className="col-lg-2 noleftrightpadding">
            <UsidePanel></UsidePanel>
          </div>
          <div className="col-lg-10 noleftrightpadding">
            <Uheader></Uheader>

            <div className="row ">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <div className="Dashboardsec box-shadow helpform">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      Edit Grades Info
                    </span>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Cert</label>
                        <input
                          type="text"
                          className="form-control"
                          value={cert}
                          onChange={(e) => setCert(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Grade</label>
                        <input
                          type="text"
                          className="form-control"
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Order No</label>
                        <input
                          type="text"
                          className="form-control"
                          value={orderNo}
                          onChange={(e) => setOrderNo(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>PSA Sub</label>
                        <input
                          type="text"
                          className="form-control"
                          value={pSASub}
                          onChange={(e) => setPSASub(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Date Poped</label>
                        <input
                          type="date"
                          className="form-control"
                          value={datePooped}
                          onChange={(e) => setDatePooped(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>PSA Upcharges Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          value={pSASubAmt}
                          onChange={(e) => setPSASubAmt(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 mb-3">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                      <Link
                        to="/admin/order-details/"
                        className="btn btn-primary"
                      >
                        {" "}
                        Go To Order Details
                      </Link>
                      <Link
                        className="btn btn-danger lft-15"
                        onClick={handleSubmit}
                      >
                        {" "}
                        Update Grade Details
                      </Link>
                    </div>
                    <div className="col-lg-2"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditGrade;
