import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLeftArrow } from "react-icons/bi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Card from "react-bootstrap/Card";

const CardDetails = () => {
  const [qty, setqty] = useState("");
  const [cardyear, setCardyear] = useState("");
  const [serviceLevel, setserviceLevel] = useState("");
  const [brand, setbrand] = useState("");
  const [cardno, setcardno] = useState("");
  const [playername, setplayername] = useState("");
  const [attribute, setattribute] = useState("");
  const [dv, setdv] = useState("");
  const [orderid, setorderid] = useState("");
  const [price, setprice] = useState("");
  const [rowprice, setrowprice] = useState("");
  const [psasub, setpsasub] = useState("");

  const [cardDetails, setCardDetails] = useState([]);

  const cid = localStorage.getItem("cidd");
  const getcarddetails = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/carddetails/`, {
      method: "POST",
      body: JSON.stringify({ id: cid }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await result.json();
    if (result.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        console.log(data);
        setCardDetails(data);
      }
    }
  };

  useEffect(() => {
    getcarddetails();
  }, []);

  return (
    <>
      <div className="container-fluid " id="admin">
        <div className="row" id="grade">
          <div className="col-lg-2 noleftrightpadding">
            <UsidePanel></UsidePanel>
          </div>
          <div className="col-lg-10 noleftrightpadding">
            <Uheader></Uheader>
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <div className="Dashboardsec box-shadow helpform">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="Topl">
                        <span className="heading-level-2">Card Details</span>
                      </div>
                    </div>
                  </div>

                  {cardDetails.map((clist) => (
                    <div className="row mt-3" key={clist._id}>
                      <div className="col-lg-12 mb-3">
                        <div className="box">
                          <label className="fw-bold">Qty</label> <br></br>
                          <label>{clist.qty}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Card Year</label> <br></br>
                          <label>{clist.cardyear}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Service Level</label>{" "}
                          <br></br>
                          <label>{clist.servcelevel}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Brand</label> <br></br>
                          <label>{clist.brand}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Card Number</label>{" "}
                          <br></br>
                          <label>{clist.cardnumber}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Player Name</label>{" "}
                          <br></br>
                          <label>{clist.playername}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Attributes/SN</label>{" "}
                          <br></br>
                          <label>{clist.attribute}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Declared Value</label>{" "}
                          <br></br>
                          <label>{clist.totaldv}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Order Number</label>{" "}
                          <br></br>
                          <label>{clist.orderid}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Price</label> <br></br>
                          <label>{clist.pricepercard}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">Row Price</label> <br></br>
                          <label>{clist.pricepercard * clist.qty}</label>
                        </div>
                        <div className="box">
                          <label className="fw-bold">PSA Sub #</label> <br></br>
                          <label>{clist.PSASub}</label>
                        </div>
                      </div>
                      <div className="row mb-3 mt-2">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                          <Link className="submitbtn" to="/admin/cards/">
                            {" "}
                            <BiLeftArrow></BiLeftArrow> Back To Cards
                          </Link>
                        </div>
                        <div className="col-lg-4"></div>
                      </div>
                    </div>
                  ))}
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

export default CardDetails;
