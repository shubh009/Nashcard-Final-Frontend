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

const index = () => {
  const [paidOrders, setPaidOrders] = useState([]);
  const columns = [
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
      field: "status",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Status",
      width: 200,
    },
    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 250,
    },
    {
      field: "poppedDate",
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
      width: 150,
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
      headerName: "Mark as Shipped",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="#"
            onClick={(e) => handleUpdate(row.row.orderid)}
            className=""
          >
            Mark as Shipped
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

  const rows = paidOrders.map((element, index) => ({
    _id: element._id,
    name: element.name,
    orderid: element.orderid,
    status: element.status,
    servicelevel: element.servicelevel,
    paiddate: element.paiddate,
    userid: element.userid,
    email: element.email,
    poppedDate: element.poppedDate,
    grname: element.grname,
  }));

  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };
  useEffect(() => {
    getdataPaid();
  }, []);
  const getdataPaid = async () => {
    const res = await fetch(`{process.env.REACT_APP_API_URL}/get-paid-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setPaidOrders(data);
      } else {
        setPaidOrders([]);
      }
    }
  };

  //   markaspickedup
  const handleUpdate = async (orderid) => {
    const getUpdate = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/mark-as-shipped`,
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
        getdataPaid();
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
                    <span className="heading-level-2 mb-3">Paid Orders</span>
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
      </div>
    </>
  );
};
export default index;
