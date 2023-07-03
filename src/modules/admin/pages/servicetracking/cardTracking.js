import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const cardTracking = () => {
  const [searchDatas, setSearchData] = useState([]);
  const columns = [
    {
      field: "qty",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "QTY",
      width: 130,
    },
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Id",
      width: 150,
    },
    {
      field: "ordername",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Name",
      width: 150,
    },
    {
      field: "servicelevel",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Service Level",
      width: 140,
    },
    {
      field: "desc",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "DESC",
      width: 150,
    },
    {
      field: "dv",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "DV",
      width: 140,
    },
    {
      field: "psasub",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "PSA Sub#",
      width: 140,
    },

    {
      field: "datecreated",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Date Added",
      width: 150,
    },
    {
      field: "enteredby",
      headerName: "Entered By",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
  ];
  let d;
  const rows = searchDatas.map((element, index) => ({
    _id: element._id,
    dateeee: (d = formatDate(new Date(element.dateCreated))),
    qty: element.cardQty,
    orderid: element.orderid,
    ordername: element.ordername,
    servicelevel: element.serviceLevel,
    desc: element.desc,
    dv: element.dv,
    psasub: element.psasub,
    datecreated: d,
    enteredby: element.enteredby,
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

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/card-tracking-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
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
  }, []);
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
                        <span className="heading-level-2">
                          PSA Submission Table
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
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
      </div>
    </>
  );
};
export default cardTracking;
