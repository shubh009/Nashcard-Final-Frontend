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
import Card from "react-bootstrap/Card";

const index = () => {
  const [searchDatas, setSearchData] = useState([]);
  const [show, setShow] = useState(false);
  const [orderid, setOrderid] = useState("");
  const [orderIdAutoCom1, setOrderIdAutoCom1] = useState([]);
  const [orderIdMatch1, setOrderMatch1] = useState([]);

  const columns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 150,
    },
    {
      field: "sub",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "SUB# (from order)",
      width: 130,
    },
    {
      field: "qty",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "QTY",
      width: 130,
    },
    {
      field: "cardyear",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Card Year",
      width: 130,
    },

    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 140,
    },
    {
      field: "brand",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Brand",
      width: 150,
    },
    {
      field: "cardnumber",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Card Number",
      width: 150,
    },
    {
      field: "playername",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Player Name",
      width: 150,
    },
    {
      field: "attribute",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Attributes/SN",
      width: 150,
    },

    {
      field: "dv",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Declared Value",
      width: 140,
    },
  ];
  let d;
  const rows = searchDatas.map((element, index) => ({
    _id: element._id,
    qty: element.cardQty,
    orderid: element.orderid,
    ordername: element.ordername,
    servicelevel: element.serviceLevel,
    desc: element.desc,
    dv: element.dv,
    attribute: element.attribute,
    playername: element.playername,
    cardnumber: element.cardnumber,
    brand: element.brand,
    cardyear: element.cardyear,
    userid: element.userid,
    grcompanyname: element.gradingcompany,
  }));

  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };

  const orderDetails = async (uid, orderid, grname) => {
    localStorage.setItem("aUdetailsId", uid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getdata = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/card-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderid,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
        } else {
          if (data.length > 0) {
            setSearchData(data);
          } else {
            setSearchData([]);
          }
        }
      }
    };
    getdata();
    setShow(true);
  };

  useEffect(() => {
    const getdata1 = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/order-autocomplete`,
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
        console.log(data);
        if (data.length > 0) {
          setOrderIdAutoCom1(data);
        }
      }
    };
    getdata1();
  }, []);

  const searchOrderId1 = (text) => {
    if (!text) {
      setOrderMatch1([]);
    } else {
      let matches = orderIdAutoCom1.filter((orderid) => {
        const regex = new RegExp(`${text}`, "gi");
        return orderid.orderid.match(regex);
      });
      setOrderMatch1(matches);
    }
  };

  const handleSuggestion1 = (suggestion) => {
    setOrderid(suggestion);
    setOrderMatch1([]);
  };

  return (
    <>
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
                <div className="Dashboardsec box-shadow helpform">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="Topl">
                        <span className="heading-level-2">Cards</span>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label className="fw-bold mb-2">Order#</label>
                          <input
                            type="textbox"
                            value={orderid}
                            name="orderid"
                            onChange={(e) => setOrderid(e.target.value)}
                            onKeyDown={(e) => searchOrderId1(e.target.value)}
                            className="form-control"
                          ></input>
                          {orderIdMatch1
                            ? orderIdMatch1.map((el, index) => {
                                return (
                                  <Card title={el.orderid} key={index}>
                                    <Card.Body
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleSuggestion1(el.orderid)
                                      }
                                    >
                                      {el.orderid}
                                    </Card.Body>
                                  </Card>
                                );
                              })
                            : null}
                        </div>
                      </div>

                      <div className="col-lg-4 mt-4">
                        <Link
                          onClick={handleSubmit}
                          className="submitbtn mt-1 float-start text-ce"
                        >
                          Search
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {show ? (
                  <div className="Dashboardsec box-shadow helpform">
                    <div className=" mt-5">
                      <DataGrid
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
