import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLeftArrow } from "react-icons/bi";
import Card from "react-bootstrap/Card";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const shipping = () => {
  const [shippingData, setShippingData] = useState([]);
  // const [getInput, setInput] = useState('');
  const [orderid, setorderid] = useState("");
  const [orderIdAutoCom, setOrderIdAutoCom] = useState([]);
  const [orderIdMatch, setOrderMatch] = useState([]);
  const handleInput = (e) => {
    setorderid(e.target.value);
  };
  const columns = [
    {
      field: "psasub",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "PSA Sub #",
      width: 150,
    },
    {
      field: "orderid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Orders Within PSA Sub",
      width: 150,
    },

    {
      field: "totalcard",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Calculated Total Cards",
      width: 150,
    },
    {
      field: "print",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Print Packing List",
      width: 200,
      renderCell: (row) => (
        <td>
          <Link
            to="/admin/shipping/psa-submission-details/"
            onClick={() =>
              orderDetails(row.row._id, row.row.orderid, row.row.psasub)
            }
            className=""
          >
            Print Packing List
          </Link>
        </td>
      ),
    },
    {
      field: "specificorder",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "View Specific Order",
      width: 200,
      renderCell: (row) => (
        <td>
          <Link to="#" className="">
            View Specific Order
          </Link>
        </td>
      ),
    },
  ];

  const orderDetails = async (id, orderid, psaSub) => {
    localStorage.setItem("ShipId", id);
    localStorage.setItem("OrderidShip", orderid);
    localStorage.setItem("psaSubShip", psaSub);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const psasub = orderid;
    const getData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/get-shipping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          psasub,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        console.log(data);
        setShippingData(data);
      }
    };
    getData();
  };
  const rows = shippingData.map((element, index) => ({
    _id: element._id,
    psasub: element.psasub,
    orderid: element.orderid,
    totalcard: element.totalcard,
    userid: element.userid,
    grname: element.grname,
  }));
  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };
  // tes
  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/psasub-autocomplete`,
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
          setOrderIdAutoCom(data);
          console.log(data);
        }
      }
    };
    getdata();
  }, []);

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
    setorderid(suggestion);
    setOrderMatch([]);
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
                          Enter PSA/SGC Sub for Order Breakdown{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-5">
                      <input
                        onChange={handleInput}
                        value={orderid}
                        onKeyDown={(e) => searchOrderId(e.target.value)}
                        type="text"
                        className="form-control"
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
                    <div className="col-lg-3">
                      <button onClick={handleSearch} className="submitbtn">
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="row mb-3">
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
        </div>
      </div>
    </>
  );
};
export default shipping;
