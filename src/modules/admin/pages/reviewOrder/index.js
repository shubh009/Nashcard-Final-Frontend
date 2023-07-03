import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const index = () => {
  const [searchDatas, setSearchData] = useState([]);
  const [datas, setData] = useState("");
  const columns = [
    {
      field: "reviewid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Review Order",
      width: 150,
    },
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer name",
      width: 130,
    },
    {
      field: "email",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Email",
      width: 150,
    },
    {
      field: "companyname",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Grading Company Select",
      width: 130,
    },

    {
      field: "status",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Status",
      width: 140,
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
            to="#"
            onClick={() => orderDetails(row.row.userid)}
            className=""
          >
            Details
          </Link>
        </td>
      ),
    },
    {
      field: "delete",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Delete",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="#"
            onClick={(e) =>
              window.confirm("Are you sure you want to delete?")
                ? reviewDelete(row.row._id)
                : e.preventDefault()
            }
            className=""
          >
            Delete
          </Link>
        </td>
      ),
    },
    {
      field: "mtj",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "MTJ Recieved",
      width: 140,
    },
  ];

  const reviewDelete = async (id) => {
    const getdataDelete = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-review`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        toast.success("Deleted");
        getdata1();
        setData("");
      }
    };
    getdataDelete();
  };
  let d;
  const rows = searchDatas.map((element, index) => ({
    _id: element._id,
    email: element.email,
    reviewid: element.reviewid,
    userid: element.userid,
    name: element.name,
    companyname: element.companyname,
    status: element.status,
  }));

  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };
  const orderDetails = async (userid) => {
    localStorage.setItem("userid", userid);
  };

  const handlestatus = async (e) => {
    setData(e.target.value);
    const status = e.target.value;
    const getdata = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/get-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
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
  };

  useEffect(() => {
    getdata1();
  }, []);
  const getdata1 = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get-review`, {
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
        setSearchData(data);
      }
    }
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
                    <span className="heading-level-2 mb-3">
                      Review Order Data Table
                    </span>
                  </div>
                </div>

                <div className="col-lg-4">
                  <select
                    value={datas}
                    className="form-control"
                    onChange={handlestatus}
                  >
                    <option value="0">Select Status</option>
                    <option>Created</option>
                    <option>Incoming</option>
                    <option>Dropped Off</option>
                    <option>Received by Nashcards Review</option>
                    <option>Reviewed</option>
                    <option>Confirmed</option>
                    <option>Rejected</option>
                    <option>Invoiced Created</option>
                    <option>Customer Invoiced</option>
                    <option>Paid</option>
                    <option>Review Complete</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
