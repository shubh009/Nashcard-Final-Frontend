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
  const [searchDatas, setSearchData] = useState([]);
  const columns = [
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
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
      field: "psasub",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "PSASUB#",
      width: 130,
    },
    {
      field: "sgcphoto",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "SGC Photo",
      width: 130,
    },
  ];
  let d;
  const rows = searchDatas.map((element, index) => ({
    _id: element._id,
    orderid: element.orderid,
    servicelevel: element.servicelevel,
    userid: element.userid,
    sgcphoto: element.SGCphotoid,
    psasub: element.psasub,
  }));
  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };

  useEffect(() => {
    const getdata1 = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/get-sgc-photos`,
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
          setSearchData(data);
        }
      }
    };
    getdata1();
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

            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-10">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      <Link to="https://gosgc.app.box.com/s/9270yvv3r4rwply0j6fbi32t9qauxdry/">
                        Link for SGC Photos Folder
                      </Link>
                    </span>
                    <p>(see directions on Grades table for adding)</p>
                    <p>(see video for using this tool)</p>
                    <p>
                      <b>WARNING: </b> Always verify it is the number you expect
                      it to update (in the video I show 4 results, I update 4)
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">{/* Data grid code.. */}</div>
              </div>
            </div>

            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-8">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">SGC Orders</span>
                  </div>
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
