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

const LocalPicks = () => {
  const [orederAwait, setOrderAwait] = useState([]);
  const [orderPickUp, setOrderPickUp] = useState([]);
  const [reqReturn, setReqReturn] = useState([]);
  const [newlyPaid, setNewlyPaid] = useState([]);

  const orderAwaitColumns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 150,
    },
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Name",
      width: 180,
    },
    {
      field: "paystatus",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Pay Status",
      width: 150,
    },
    {
      field: "status",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Status",
      width: 200,
    },
    {
      field: "totalcards",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Total Cards",
      width: 150,
    },
    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 250,
    },
    {
      field: "customerdetails",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Details",
      width: 150,
    },
    {
      field: "alertCustomer",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Alert Customer Package is here",
      width: 150,
    },
    {
      field: "details",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Details",
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
    {
      field: "mark",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Mark as Picked Up",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="#"
            onClick={(e) => handleUpdate(row.row.orderid)}
            className=""
          >
            Mark as Picked Up
          </Link>
        </td>
      ),
    },
    {
      field: "remind",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Remind Customer",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="#"
            onClick={() => orderDetails(row.row.userid)}
            className=""
          >
            Remind Customer
          </Link>
        </td>
      ),
    },
  ];
  const orderPickupColumns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 150,
    },
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Name",
      width: 180,
    },
    {
      field: "status",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Status",
      width: 200,
    },
    {
      field: "totalcards",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Total Cards",
      width: 150,
    },
    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 250,
    },
    {
      field: "customerdetails",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Details",
      width: 150,
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
      field: "details",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Details",
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
  const orderReturnColumns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 150,
    },
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Name",
      width: 180,
    },

    {
      field: "email",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Email",
      width: 150,
    },
    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 250,
    },
    {
      field: "totalcards",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Calculated Total Card Qty",
      width: 250,
    },
    {
      field: "details",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Details",
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
    {
      field: "mark",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Mark as Picked Up",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="#"
            onClick={(e) => handleUpdate(row.row.orderid)}
            className=""
          >
            Mark as Picked Up
          </Link>
        </td>
      ),
    },
  ];

  const orderNewlyPaidColumns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 150,
    },
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Name",
      width: 180,
    },

    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 250,
    },

    {
      field: "gradespopdate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Grades Popped Date",
      width: 150,
    },
    {
      field: "paiddate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Paid Date",
      width: 250,
    },
    {
      field: "details",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Details",
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
  const orderDetails = async (userid, orderid, grname) => {
    localStorage.setItem("userid", userid);
    localStorage.setItem("aUdetailsId", userid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
  };

  const orderAwaitRows = orederAwait.map((element, index) => ({
    _id: element._id,
    name: element.name,
    orderid: element.orderid,
    status: element.status,
    servicelevel: element.servicelevel,
    orderCreationDate: element.orderCreationDate,
    userid: element.userid,
    paystatus: element.paystatus,
    totalcards: element.totalcards,
    grname: element.grname,
  }));
  const orderPickUpRows = orderPickUp.map((element, index) => ({
    _id: element._id,
    name: element.name,
    orderid: element.orderid,
    status: element.status,
    servicelevel: element.servicelevel,
    orderCreationDate: element.orderCreationDate,
    userid: element.userid,
    paystatus: element.paystatus,
    totalcards: element.totalcards,
    grname: element.grname,
  }));
  const reqReturnRows = reqReturn.map((element, index) => ({
    _id: element._id,
    name: element.name,
    orderid: element.orderid,
    status: element.status,
    servicelevel: element.servicelevel,
    orderCreationDate: element.orderCreationDate,
    userid: element.userid,
    paystatus: element.paystatus,
    totalcards: element.totalcards,
    email: element.email,
    grname: element.grname,
  }));
  const newlyPaidRows = newlyPaid.map((element, index) => ({
    _id: element._id,
    name: element.name,
    orderid: element.orderid,
    status: element.status,
    servicelevel: element.servicelevel,
    orderCreationDate: element.orderCreationDate,
    userid: element.userid,
    paystatus: element.paystatus,
    totalcards: element.totalcards,
    gradespopdate: element.poppedDate,
    paiddate: element.paiddate,
    grname: element.grname,
  }));
  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };
  useEffect(() => {
    getdataOrderPickup();
    getdataOrderAwait();
    getdataOrderReturn();
    getdataOrderNewlyPaid();
  }, []);
  const getdataOrderAwait = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-order-await`,
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
        setOrderAwait(data);
      } else {
        setOrderAwait([]);
      }
    }
  };
  const getdataOrderPickup = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-order-pickup`,
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
        setOrderPickUp(data);
      } else {
        setOrderPickUp([]);
      }
    }
  };
  const getdataOrderReturn = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-order-request-return`,
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
        setReqReturn(data);
      } else {
        setReqReturn([]);
      }
    }
  };
  const getdataOrderNewlyPaid = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-order-newly-paid`,
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
        setNewlyPaid(data);
      } else {
        setNewlyPaid([]);
      }
    }
  };

  //   markaspickedup
  const handleUpdate = async (orderid) => {
    const getUpdate = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/markaspickedup`,
        {
          method: "PATCH",
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
        toast.success("Updated!");
        getdataOrderPickup();
        getdataOrderAwait();
        getdataOrderReturn();
        getdataOrderNewlyPaid();
      }
    };
    getUpdate();
  };
  return (
    <>
      <div className="container-fluid " id="admin">
        <div className="row" id="grade">
          <div className="col-lg-2 noleftrightpadding">
            <UsidePanel></UsidePanel>
          </div>
          <div className="col-lg-10 noleftrightpadding">
            <Uheader></Uheader>

            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-8">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">Notes</span>
                    <p>1. Alert Customer Pacakge is Here does two things</p>
                    <ul>
                      <li>
                        Sends email to customer that their package is ready for
                        pickup
                      </li>
                      <li>Sets status as Awaiting Pickup </li>
                    </ul>

                    <p>2. Mark As Picked Up</p>
                    <ul>
                      <li>
                        Sends email to customer that their package has been
                        picked up
                      </li>
                      <li>Sets status as Picked up </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-8">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      Orders Awaiting Pickup
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <DataGrid
                    className="mt-3 mb-3"
                    style={{ fontWeight: "400" }}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    density="compact"
                    autoHeight
                    getRowId={(element) => element._id}
                    rows={orderAwaitRows}
                    columns={orderAwaitColumns}
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

            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-8">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      Orders Picked Up
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <DataGrid
                    className="mt-3 mb-3"
                    style={{ fontWeight: "400" }}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    density="compact"
                    autoHeight
                    getRowId={(element) => element._id}
                    rows={orderPickUpRows}
                    columns={orderPickupColumns}
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
            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-8">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      Requested Returns - Awaiting Pickup
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <DataGrid
                    className="mt-3 mb-3"
                    style={{ fontWeight: "400" }}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    density="compact"
                    autoHeight
                    getRowId={(element) => element._id}
                    rows={reqReturnRows}
                    columns={orderReturnColumns}
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
            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-8">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      Newly Paid Orders
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <DataGrid
                    className="mt-3 mb-3"
                    style={{ fontWeight: "400" }}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    density="compact"
                    autoHeight
                    getRowId={(element) => element._id}
                    rows={newlyPaidRows}
                    columns={orderNewlyPaidColumns}
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
      </div>
    </>
  );
};
export default LocalPicks;
