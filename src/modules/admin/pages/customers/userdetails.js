import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { TbLetterA } from "react-icons/tb";

const Userdetails = () => {
  console.log(localStorage);
  const [userDetails, setUserDetails] = useState([]);
  const [getPaid, setUnpaid] = useState([]);
  const [getOrderCust, setOrderCust] = useState([]);
  const [getOrderReview, setOrderReview] = useState([]);
  const [selectedRb, setSelectedRb] = useState("");
  const [show, setShow] = useState(false);
  const [reviewShow, setreviewShow] = useState(false);
  //review
  const [companyname, setCompanyname] = useState("");
  const [submittedcard, setSubmittedCards] = useState("");
  const [netdv, setNetDv] = useState("");
  const [cardtype, setCardType] = useState("");
  const [comment, setComments] = useState("");
  const [status, setStatus] = useState("");
  const handleCompanyname = (e) => {
    setCompanyname(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleSubmittedCards = (e) => {
    setSubmittedCards(e.target.value);
  };
  const handleComments = (e) => {
    setComments(e.target.value);
  };
  const handleCardType = (e) => {
    setCardType(e.target.value);
  };
  const handleDV = (e) => {
    setNetDv(e.target.value);
  };
  const [isvalid, setIsValid] = useState(true);
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    reviewhandleClose();
    if (isvalid) {
      if (
        companyname !== "" &&
        status !== "" &&
        cardtype !== "" &&
        comment !== "" &&
        submittedcard !== ""
      ) {
        let newreviewid = "";
        const characters = "0123456789";
        const charactersLength = 5;
        let counter = 0;
        while (counter < 5) {
          newreviewid += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
          counter += 1;
        }

        let orderPrefix = companyname;
        orderPrefix = orderPrefix.slice(0, 2);
        newreviewid = orderPrefix + "-" + newreviewid;
        let reviewid = newreviewid;

        const getdataRev = async () => {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/create-review`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                companyname,
                status,
                cardtype,
                comment,
                submittedcard,
                userid,
                reviewid,
                netdv,
              }),
            }
          );
          const data = await res.json();
          if (res.status === 422 || !data) {
            console.log("error ");
          } else {
            if (!data) {
            } else {
              getdataReviews();
              toast.success("Review Added!");
            }
          }
        };
        getdataRev();
      } else {
        alert("Any Field Can Not Be Blank");
      }
    } else {
      alert("Please Check Validation Error Mesage");
    }
  };

  //Add New Order
  const [serviceLevelData, setServiceLevelData] = useState([]);
  const [orderstatus, setOrderStatus] = useState([]);
  const getdataServiceLevel = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-service-level`,
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
        setServiceLevelData(data);
      } else {
        setServiceLevelData([]);
      }
    }
  };

  const getdataOrderStatus = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-status-order`,
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
        setOrderStatus(data);
      } else {
        setOrderStatus([]);
      }
    }
  };

  const [serviceLevel, setServiceLevel] = useState("");
  // const [pricePerCard, setPricePerCard] = useState('');
  const [cardcount, setCardCount] = useState("");
  const [orderStatus, setOrderSta] = useState("");
  const [localpickup, setLocalpickup] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState("");
  const [DropoffLocation, setDropoffLocation] = useState("");
  const handleServiceLevel = (e) => {
    setServiceLevel(e.target.value);
    let prices = e.target.value.split("-");
    setPrice(prices[2]);
  };
  // const handlePriceperCard = (e) => {
  //   setPricePerCard(e.target.value);
  // }
  const handleCardCount = (e) => {
    setCardCount(e.target.value);
  };

  const handleOrderStatus = (e) => {
    setOrderSta(e.target.value);
  };
  const handlelocalpickup = (e) => {
    setLocalpickup(e.target.value);
  };
  const handleContact = (e) => {
    setContact(e.target.value);
  };
  const handleDropOffLocation = (e) => {
    setDropoffLocation(e.target.value);
  };
  const handleSubmitOrderStatus = async (e) => {
    e.preventDefault();
    handleClose();

    if (
      cardcount !== "" &&
      serviceLevel !== "" &&
      localpickup !== "" &&
      contact !== "" &&
      DropoffLocation !== "" &&
      orderStatus !== ""
    ) {
      var abc = serviceLevel.split("-");
      const pricePerCard = abc[2];
      let servicelevel = [abc[0], abc[1]].join("-");
      let neworderid = "";
      const characters = "0123456789";
      const charactersLength = 5;
      let counter = 0;
      while (counter < 5) {
        neworderid += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }

      let orderPrefix = abc[0];
      orderPrefix = orderPrefix.slice(0, 2);
      neworderid = orderPrefix + "-" + neworderid;
      let orderid = neworderid;

      let pricepercard = pricePerCard;
      const getdataOrder = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/create-order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cardcount,
              pricepercard,
              DropoffLocation,
              contact,
              localpickup,
              userid,
              orderid,
              servicelevel,
              orderStatus,
            }),
          }
        );
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
          } else {
            getdataOrders();
            toast.success("Order Added!");
          }
        }
      };
      getdataOrder();
    } else {
      alert("Any Field Can Not Be Blank");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getdataOrderStatus();
  };

  const reviewhandleClose = () => setreviewShow(false);
  const reviewhandleShow = () => setreviewShow(true);

  //local storage varaible
  const userid = localStorage.getItem("userid");
  useEffect(() => {
    getdata();
    getdata1();
    getdataOrders();
    getdataReviews();
    getdataServiceLevel();
  }, []);
  // create-review
  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/user-details-data-with-id`,
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
      if (data.length > 0) {
        setUserDetails(data[0]);
      } else {
        setUserDetails([]);
      }
    }
  };

  const getdata1 = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/customers-unpaid-order`,
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
      if (data.length > 0) {
        setUnpaid(data[0].unpaidOrders);
      } else {
        setUnpaid([]);
      }
    }
  };
  const getdataOrders = async () => {
    const res = await fetch(
      `{process.env.REACT_APP_API_URL}/customers-orders`,
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
      if (data.length > 0) {
        setOrderCust(data);
      } else {
        setOrderCust([]);
      }
    }
  };
  const getdataReviews = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/review-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setOrderReview(data);
      } else {
        setOrderReview([]);
      }
    }
  };

  //Event to hnadle radiobutton on change
  const handleRbOnchange = (ev) => {
    const localpickup = ev.target.value;
    setSelectedRb(localpickup);
  };

  const columns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order #",
      width: 150,
    },
    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 150,
    },
    {
      field: "status",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Status",
      width: 150,
    },
    {
      field: "totalcards",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Total Cards",
      width: 150,
    },
    {
      field: "orderTotal",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Total",
      width: 150,
    },
    {
      field: "Detail",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Details",
      width: 200,
      renderCell: (row) => (
        <td>
          <Link
            to="/admin/order-details/"
            className="btn btn-primary"
            onClick={() =>
              orderDetails(
                row.row.userid,
                row.row.orderid,
                row.row.grcompanyname,
                row.row._id
              )
            }
          >
            Order Details
          </Link>
        </td>
      ),
    },
    {
      field: "markaspickedup",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Mark As Picked Up",
      width: 200,
    },
    {
      field: "paiddate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Paid Date",
      width: 200,
    },
    {
      field: "gradespoppedDate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Grades Pop Date",
      width: 200,
    },
  ];
  const columnsReview = [
    {
      field: "reviewid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Review Order Number",
      width: 200,
    },
    {
      field: "status",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Status",
      width: 200,
    },
    {
      field: "Detail",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Review Order Details",
      width: 254,
      renderCell: (row) => (
        <td>
          <Link
            to="#"
            className="btn btn-primary"
            onClick={() => orderDetailsReview(row.row.reviewid)}
          >
            Review Order Details
          </Link>
        </td>
      ),
    },
  ];

  let d;
  let dd;
  const rows = getOrderCust.map((element, index) => ({
    _id: element._id,
    orderid: element.orderid,
    servicelevel: element.servicelevel,
    userid: element.userid,
    status: element.status,
    totalcards: element.totalcards,
    orderTotal: element.orderTotal,
    paiddateconvrt: (d = formatDate(new Date(element.paiddate))),
    paiddate: d,
    gradesPopDate: (dd = formatDate(new Date(element.gradespoppedDate))),
    gradespoppedDate: dd,
    grcompanyname: element.grcompanyname,
  }));
  const rowsReview = getOrderReview.map((element, index) => ({
    _id: element._id,
    reviewid: element.reviewid,
    status: element.status,
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
  const orderDetails = async (uid, orderid, grname, id) => {
    localStorage.setItem("idperorder", id);
    localStorage.setItem("aUdetailsId", uid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
  };
  const orderDetailsReview = async (uid) => {
    localStorage.setItem("aUdetailsId", uid);
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
                          <span className="heading-level-2">User Details</span>
                        </div>
                      </div>

                      {/* <div className="col-lg-4">
                                   <Link to="/address" className="submitbtn mt-1 float-start text-ce">Search By Address</Link>
                                 
                                </div> */}
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <label className="fw-bold">Name</label>
                          <p>{userDetails.name}</p>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Email Id</label>
                          <p>{userDetails.email}</p>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Unpaid orders</label>
                          <p>{getPaid}</p>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Shopify Customer ID</label>
                          <p>6407714799809</p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <label className="fw-bold">Contact No</label>
                          <p>{userDetails.contact}</p>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Address</label>
                          <p>{userDetails.address}</p>
                        </div>
                        <div className="form-group mt-2">
                          <label className="fw-bold">Total Credits</label>
                          <p>$0.00 </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="Dashboardsec box-shadow helpform">
                    <div className="statebox text-center mb-4 mt-2">
                      <label className="heading-level-4">Total Orders</label>
                      <p className="mb-1">1</p>
                    </div>
                    <div className="statebox text-center mb-4">
                      <label className="heading-level-4">
                        Sum of All Orders
                      </label>
                      <p className="mb-1">1</p>
                    </div>
                    <div className="statebox text-center mb-4">
                      <label className="heading-level-4">
                        Total Graded Cards
                      </label>
                      <p className="mb-1">1</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Dashboardsec box-shadow helpform">
                <div className="row ">
                  <div className="col-lg-9">
                    <div className="Topl">
                      <span className="heading-level-2">Orders</span>
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

                  <div className="col-lg-3">
                    <Link
                      className="submitbtn mt-1 float-start text-center"
                      onClick={handleShow}
                    >
                      Add New Order
                    </Link>
                  </div>
                </div>
                <div className="row">{/* code for order data list */}</div>
              </div>

              <div className="Dashboardsec box-shadow helpform">
                <div className="row ">
                  <div className="col-lg-9">
                    <div className="Topl">
                      <span className="heading-level-2">Review Orders</span>
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
                      rows={rowsReview}
                      columns={columnsReview}
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

                  <div className="col-lg-3">
                    <Link
                      className="submitbtn mt-1 float-start text-center"
                      onClick={reviewhandleShow}
                    >
                      Add New Review Order
                    </Link>
                  </div>
                </div>

                <div className="row">{/* code for review data list */}</div>
              </div>
            </div>
          </div>

          {/* <div className="container-fluid"> */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="form-group">
                  <label>Service Level </label>
                  <select
                    onChange={handleServiceLevel}
                    className="form-control"
                  >
                    <option value="0">Select Service Level</option>
                    {serviceLevelData
                      ? serviceLevelData.map((el) => {
                          return (
                            <option
                              value={el.servicelevel + "-" + el.pricepercard}
                              key={el._id}
                            >
                              {el.servicelevel +
                                "         (Price Per Card " +
                                el.pricepercard +
                                ")"}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price Per Card : </label>

                  <label> {price ? price : null} </label>
                </div>
                <div className="form-group">
                  <label>How Many Cards? </label>
                  <input
                    onChange={handleCardCount}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Status </label>
                  <select onChange={handleOrderStatus} className="form-control">
                    <option value="0">Select Status *</option>
                    {orderstatus
                      ? orderstatus.map((el) => {
                          return (
                            <option value={el.status} key={el._id}>
                              {el.status}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  <p>
                    Intended status. If customer has cards, mark as Cards
                    Received. If customer will be dropping them off later, mark
                    as Awaiting Cards
                  </p>
                </div>
                <div className="form-group">
                  <label>Local Pickup/Drop Off? * </label>
                  <ul className="list-unstyled">
                    <li>
                      <input
                        id="r1"
                        type="radio"
                        name="radio"
                        value="1"
                        onChange={handlelocalpickup}
                      ></input>
                      <label htmlFor="r1">
                        Yes, I'll drop off and pickup my cards
                      </label>
                    </li>
                    <li>
                      <input
                        id="r2"
                        type="radio"
                        name="radio"
                        value="2"
                        onChange={handlelocalpickup}
                      ></input>
                      <label htmlFor="r2">No, I'll mail them</label>
                    </li>
                  </ul>
                </div>
                <div className="form-group">
                  <label>Text Updates </label>
                  <select className="form-control">
                    <option value="0">Select</option>
                    <option>Yes, Please</option>
                    <option>No Thanks</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Cell Phone </label>
                  <input
                    onChange={handleContact}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Local Drop Off and/or Pick Up Location </label>
                  <select
                    onChange={handleDropOffLocation}
                    className="form-control"
                  >
                    <option value="0">Select</option>
                    <option>Lakeland, TN</option>
                    <option>Mt Juliet, TN</option>
                    <option>Trappe, PA</option>
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmitOrderStatus}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={reviewShow} onHide={reviewhandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Review Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="form-group">
                  <label>First Name </label>
                  <input type="text" className="form-control"></input>
                </div>
                <div className="form-group">
                  <label>Last Name </label>
                  <input type="text" className="form-control"></input>
                </div>
                <div className="form-group">
                  <label>Grading Company Select </label>
                  <ul className="list-unstyled">
                    <li>
                      <input
                        id="r1"
                        type="radio"
                        name="radio"
                        value="SGC"
                        onChange={handleCompanyname}
                      ></input>
                      <label htmlFor="r1">SGC</label>
                    </li>
                    <li>
                      <input
                        id="r2"
                        type="radio"
                        name="radio"
                        value="PSA"
                        onChange={handleCompanyname}
                      ></input>
                      <label htmlFor="r2">PSA</label>
                    </li>
                  </ul>
                </div>
                <div className="form-group">
                  <label>Submitted Cards </label>
                  <input
                    onChange={handleSubmittedCards}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Estimated Net DV</label>
                  <input
                    onChange={handleDV}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Log Card Select </label>
                  <select onChange={handleCardType} className="form-control">
                    <option value="0">Select </option>
                    <option>Log Card </option>
                    <option>Do Not Log Card </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Comments</label>
                  <input
                    onChange={handleComments}
                    type="text"
                    className="form-control"
                  ></input>
                </div>

                <div className="form-group">
                  <label>Status </label>
                  <select onChange={handleStatus} className="form-control">
                    <option value="0">Select</option>
                    <option>Created</option>
                    <option>Dropped Off</option>
                    <option>Received by Nashcard Review</option>
                    <option>Reviewed by Nashcard</option>
                    <option>Customer Confirmed</option>
                    <option>Customer Rejected</option>
                    <option>Invoice Created</option>
                    <option>Invoiced</option>
                    <option>Paid</option>
                    <option>Review Orderr Complete</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={reviewhandleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmitReview}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Userdetails;
