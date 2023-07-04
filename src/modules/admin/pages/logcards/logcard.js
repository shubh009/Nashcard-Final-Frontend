import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const LogCard = () => {
  const [dataLogCard, setDataLogCard] = useState([]);

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
      field: "join",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Join",
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
      field: "sub",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Sub #",
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
      field: "orderCreationDate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Creation Date/Time",
      width: 250,
    },
    // {
    //   field: "details",
    //   headerClassName: " small",
    //   cellClassName: "small font-weight-bold",
    //   headerName: "Details",
    //   width: 150,
    //   renderCell: (row) => (
    //     <td>
    //       <Link
    //         to="#"
    //         onClick={() => orderDetails(row.row.userid)}
    //         className=""
    //       >
    //         Details
    //       </Link>
    //     </td>
    //   ),
    // },
  ];
  const orderDetails = async (userid) => {
    localStorage.setItem("userid", userid);
  };

  const rows = dataLogCard.map((element, index) => ({
    _id: element._id,
    name: element.name,
    orderid: element.orderid,
    status: element.status,
    servicelevel: element.servicelevel,
    orderCreationDate: element.orderCreationDate,
    userid: element.userid,
  }));
  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get-card-log`, {
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
        setDataLogCard(data);
      } else {
        setDataLogCard([]);
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
                    <span className="heading-level-2 mb-3">Log Cards</span>
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
export default LogCard;
