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

const OrederNotes = () => {
  const [ordernotes, setOrderNotes] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/order-notes`, {
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
        setOrderNotes(data);
      }
    }
  };

  const columns = [
    {
      field: "ordernumber",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 200,
    },
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Username",
      width: 200,
    },
    {
      field: "noteDate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Date & Time",
      width: 200,
    },
    {
      field: "ordernotes",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Notes",
      width: 280,
    },
  ];

  const rows = ordernotes.map((element, index) => ({
    _id: element._id,
    name: element.name,
    ordernumber: element.ordernumber,
    noteDate: element.noteDate,
    ordernotes: element.ordernotes,
  }));

  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
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
                      Order Notes Data Table
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
export default OrederNotes;
