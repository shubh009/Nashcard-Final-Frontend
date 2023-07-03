import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLeftArrow } from "react-icons/bi";
import { DataGrid, GridToolbar, GridColumns } from "@mui/x-data-grid";

import { IconButton, Typography } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const psasubmissionDetails = () => {
  const [orderDet, setOrderDet] = useState([]);
  const [hasAdditionalColumn, setHasAdditionalColumn] = useState(false);

  console.log(hasAdditionalColumn);
  useEffect(() => {
    getdata();
  }, []);
  const psasub = localStorage.getItem("psaSubShip");

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-orders-shipping`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          psasub,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        console.log(data);
        setOrderDet(data);
        const uniqueOrderIds = new Set(data.map((item) => item.orderid));
        if (uniqueOrderIds.size > 1) {
          setHasAdditionalColumn(true);
        }
      } else {
        setOrderDet([]);
      }
    }
  };

  const columns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 150,
    },
    // {
    //     field: "cert",
    //     headerClassName: " small",
    //     cellClassName: "small font-weight-bold",
    //     headerName: "Cert",
    //     width: 150,
    //   },
    // {
    //     field: "grade",
    //     headerClassName: " small",
    //     cellClassName: "small font-weight-bold",
    //     headerName: "Grade",
    //     width: 150,
    //   },
    // {
    //     field: "desc",
    //     headerClassName: " small",
    //     cellClassName: "small font-weight-bold",
    //     headerName: "Description",
    //     width: 150,
    //   },
    // {
    //     field: "name",
    //     headerClassName: " small",
    //     cellClassName: "small font-weight-bold",
    //     headerName: "Customer Name",
    //     width: 250,
    //   },
    // {
    //     field: "psasub",
    //     headerClassName: " small",
    //     cellClassName: "small font-weight-bold",
    //     headerName: "Submission #",
    //     width: 250,
    //   },
    // {
    //     field: "status",
    //     headerClassName: " small",
    //     cellClassName: "small font-weight-bold",
    //     headerName: "Status",
    //     width: 200,
    //   },
    //   {
    //     field: "shippickup",
    //     headerClassName: " small",
    //     cellClassName: "small font-weight-bold",
    //     headerName: "Ship/Pickup",
    //     width: 150,
    //   },
  ];

  const rows = orderDet.map((element, index) => ({
    _id: element.grade._id,
    id: element.grade._id,
    orderid: element.orderid,
    status: element.status,
    desc: element.grade.description,
    shippickup: element.shippickup,
    location: element.location,
    cert: element.grade.cert,
    name: element.name,
    grade: element.grade.grade,
    psasub: element.psasub,
  }));
  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };

  const handleRowBound = (params) => {
    const { id } = params;
    // Perform actions when a row is bound, using the row ID
    console.log(`Row bound: ${id}`);
    // You can call any custom functions or perform any logic here
  };

  const CustomCellRenderer = ({ value, row }) => {
    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
      setOpen(!open);
    };

    return (
      <div>
        <IconButton onClick={handleToggle}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
        {value}
        {open && (
          <div className="row" style={{ height: "100px" }}>
            <Typography className="col border" style={{ fontSize: "12.5px" }}>
              {`Cert:${row.cert}`}
            </Typography>
            <Typography
              className="col border"
              style={{ fontSize: "12.5px" }}
            >{`Description: ${row.desc}`}</Typography>
            <Typography
              className="col border"
              style={{ fontSize: "12.5px" }}
            >{`Status: ${row.status}`}</Typography>
            <Typography
              className="col border"
              style={{ fontSize: "12.5px" }}
            >{`Name: ${row.name}`}</Typography>
            <Typography
              className="col border"
              style={{ fontSize: "12.5px" }}
            >{`Grade: ${row.grade}`}</Typography>
            <Typography
              className="col border"
              style={{ fontSize: "12.5px" }}
            >{`PsaSub#: ${row.psasub}`}</Typography>
            <Typography
              className="col border"
              style={{ fontSize: "12.5px" }}
            >{`Ship/pickup: ${row.shippickup}`}</Typography>
            {/* Add more collapsible content here */}
          </div>
        )}
      </div>
    );
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
            <div className="row">
              <div className="col-lg-12">
                <div className="Dashboardsec box-shadow helpform">
                  <div className="row mb-3">
                    <div className="col-lg-8">
                      <div className="Topl">
                        <span className="heading-level-2">
                          PSA Submission Details{" "}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="box">
                        <div>
                          <label className="fw-bold">PSA Sub #</label>
                          <br></br>
                          <label>38002060520231</label>
                        </div>
                      </div>
                      <div className="box">
                        <div>
                          <label className="fw-bold">Service Level</label>
                          <br></br>
                          <label>Beckett - Economy</label>
                        </div>
                      </div>
                      <div className="box">
                        <div>
                          <label className="fw-bold">Date Added to PSA</label>
                          <br></br>
                          <label>06/12/2023</label>
                        </div>
                      </div>
                      <div className="box">
                        <div>
                          <label className="fw-bold">
                            Local Drop Off and/or Pick Up Location
                          </label>
                          <br></br>
                          <label>
                            Yes, i will pickup and drop off my cards
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <div className="Topl">
                        <span className="heading-level-2">Grades </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 mt-2">
                    <div className="col-lg-12">
                      {/* <DataGrid className="mt-3 mb-3"
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
                          onRowSelected={handleRowBound}
                          {...other}
             / > */}
                    </div>
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rows}
                        columns={[
                          {
                            field: "orderid",
                            headerName: "Order Id",
                            width: 900,
                            renderCell: (params) => (
                              <CustomCellRenderer
                                value={params.value}
                                row={params.row}
                              />
                            ),
                          },
                          // ...columns,
                        ]}
                        components={{
                          Toolbar: GridToolbar,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default psasubmissionDetails;
