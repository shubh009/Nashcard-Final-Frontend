import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "../servicetracking/serviceLevel.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const index = () => {
  const navigate = useNavigate();
  const [searchDatas, setSearchData] = useState([]);
  const [orderIdAutoCom, setOrderIdAutoCom] = useState([]);
  const [getServiceLevel, setServiceLevel] = useState("");
  const [orderIdMatch, setOrderMatch] = useState([]);
  const [getDataServiceTracking, setDataServiceTracking] = useState([]);

  const columns = [
    {
      field: "orderid",

      cellClassName: "small font-weight-bold",
      headerName: "Order No",
      width: 120,
    },
    {
      field: "customername",

      cellClassName: "small font-weight-bold",
      headerName: "Customer Name",
      width: 180,
    },
    {
      field: "cardrecieveddata",

      cellClassName: "small font-weight-bold",
      headerName: "Card Recieved Date",
      width: 130,
    },
    {
      field: "servicelevel",

      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 200,
    },
    {
      field: "status",

      cellClassName: "small font-weight-bold",
      headerName: "Status",
      width: 200,
    },
    {
      field: "calculatedcard",

      cellClassName: "small font-weight-bold",
      headerName: "Calculated Total Card Qty",
      width: 150,
    },
    {
      field: "ordertotal",

      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 100,
    },
    {
      field: "orderdetails",
      headerName: "Order Details",

      cellClassName: "small font-weight-bold",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="/admin/order-details/"
            className="btn btn-primary"
            onClick={() =>
              orderDetails(
                row.row.userid,
                row.row.orderid,
                row.row.grcompanyname
              )
            }
          >
            Order Details
          </Link>
        </td>
      ),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const servicelevel = getServiceLevel;
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/order-search-service-tracking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            servicelevel,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
        } else {
          setSearchData(data);
        }
      }
    };
    getdata();
  };

  useEffect(() => {
    getdata();
    getdata1();
  }, []);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/service-level-tracking-order-autocomplete`,
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
      setOrderIdAutoCom(data);
    }
  };
  const getdata1 = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-data-service-tracking`,
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
      setDataServiceTracking(data);
    }
  };

  const searchOrderId = (text) => {
    if (!text) {
      setOrderMatch([]);
    } else {
      let matches = orderIdAutoCom.filter((orderid) => {
        const regex = new RegExp(`${text}`, "gi");
        return orderid.orderid.match(regex);
      });
      setOrderMatch(matches);
    }
  };

  const handleSuggestion = (suggestion) => {
    setServiceLevel(suggestion);
    setOrderMatch([]);
  };

  let d;
  const rows = getDataServiceTracking.map((element, index) => ({
    _id: element._id,
    ddd: (d = formatDate(new Date(element.cardRecievedDate))),
    customername: element.name,
    orderid: element.orderid,
    status: element.status,
    servicelevel: element.serviceLevel,
    calculatedcard: element.totalcardQty,
    totalcardQty: element.totalcardQty,
    cardrecieveddate: d,
    ordertotal: element.orderTotal,
    userid: element.userid,
    grcompanyname: element.gradingcompany,
  }));

  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  }

  const orderDetails = async (uid, orderid, grname) => {
    localStorage.setItem("aUdetailsId", uid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
  };
  const orderDetailsSearch = async (uid, orderid, grname) => {
    localStorage.setItem("aUdetailsId", uid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
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
              <div className="Dashboardsec box-shadow helpform">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="Topl">
                      <span className="heading-level-2">
                        Orders Outside of 5 Days from Received to Sent to PSA
                      </span>
                    </div>
                  </div>
                  <div>
                    <DataGrid
                      style={{
                        fontWeight: "400",
                        marginTop: "25px",
                        marginBottom: "15px",
                      }}
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
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dashboardsec box-shadow helpform">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="Topl">
                      <span className="heading-level-2">
                        Finding orders that should be marked as received by PSA.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-lg-8">
                    <div className="form-group">
                      <label className="fw-bold mb-2">Service Level</label>
                      <input
                        type="textbox"
                        onChange={(e) => setServiceLevel(e.target.value)}
                        name="servicelevel"
                        value={getServiceLevel}
                        onKeyDown={(e) => searchOrderId(e.target.value)}
                        className="form-control"
                        placeholder="Enter 2 or more characters"
                      ></input>
                      {orderIdMatch
                        ? orderIdMatch.map((el, index) => {
                            return (
                              <Card title={el.orderid} key={index}>
                                <Card.Body
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleSuggestion(el.orderid)}
                                >
                                  {el.orderid}
                                </Card.Body>
                              </Card>
                            );
                          })
                        : null}
                    </div>
                  </div>
                  {/* <div className="col-lg-4">
                                    <div className="form-group">
                                      <label className="fw-bold mb-2">Cards Sent to PSA Date</label>
                                      <div className="row">
                                        <div className="col-lg-6">
                                           <input type="textbox" className="form-control"></input>
                                        </div>
                                        <div className="col-lg-6">
                                          <select className="form-control">
                                            <option value="0">Select</option>
                                            <option value="0">Days</option>
                                            <option value="0">Week</option>
                                            <option value="0">Months</option>
                                            <option value="0">Years</option>
                                          </select>
                                        </div>
                                      </div>
                                     
                                     
                                    </div>
                                </div> */}
                  <div className="col-lg-4 mt-4">
                    <Link
                      onClick={handleSubmit}
                      className="submitbtn mt-1 float-start text-center"
                    >
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dashboardsec box-shadow helpform">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="Topl">
                      <span className="heading-level-2">
                        Orders Late to PSA
                      </span>
                    </div>
                  </div>
                </div>

                <Table striped bordered hover className="mt-4">
                  <thead>
                    <tr>
                      <th className="w80">Order#</th>
                      <th className="w270">Customer Name</th>
                      <th className="w220">Card Recived Date</th>
                      <th className="w80">Service Level</th>
                      <th className="w150">Status</th>
                      <th className="w150">Card Qty</th>
                      <th className="w150">Order Total</th>
                      <th className="w150">Order Details </th>
                    </tr>
                    {searchDatas
                      ? searchDatas.map((el) => {
                          return (
                            <tr key={el._id}>
                              <td>{el.orderid}</td>
                              <td>{el.name}</td>
                              <td>{el.cardRecievedDate}</td>
                              <td>{el.serviceLevel}</td>
                              <td>{el.status}</td>
                              <td>{el.cardQty}</td>
                              <td>{el.orderTotal}</td>
                              <td>
                                <Link
                                  to="/admin/order-details/"
                                  className="text-danger"
                                  onClick={() =>
                                    orderDetailsSearch(
                                      el.userid,
                                      el.orderid,
                                      el.grcompanyname
                                    )
                                  }
                                >
                                  Order Details
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </thead>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
