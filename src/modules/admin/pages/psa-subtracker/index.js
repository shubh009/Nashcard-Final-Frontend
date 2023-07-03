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
  const [show, setShow] = useState(false);
  const [subNum, setPsasubNum] = useState("");
  const [date, setDate] = useState("");
  const [datas, setData] = useState([]);
  const [selectDatas, setSelectData] = useState("");
  const [datasPsaOrder, setDataPsaOrder] = useState([]);
  const [datasOrderRecieved, setDataOrderRecieved] = useState([]);
  const [reqUpdatedatas, setReqUpdateData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubNum = (e) => {
    setPsasubNum(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    const creationdate = date;
    const getdata1 = async () => {
      const subnumber = subNum;
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/create-subnum`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creationdate,
            subnumber,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
        } else {
          getdata();
          toast.success("PSA Number Added!");
        }
      }
    };
    getdata1();
  };
  useEffect(() => {
    getdata();
    getdataPsaOrders();
    getdataOrdersRecieved();
  }, []);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-status-subtracker`,
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
        setSelectData("");
        setData(data);
      } else {
        setData([]);
        setSelectData("");
      }
    }
  };

  const getdataOrdersRecieved = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-orders-recieved`,
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
        setDataOrderRecieved(data);
      } else {
        setDataOrderRecieved([]);
      }
    }
  };
  const getdataPsaOrders = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-psa-orders-for-subtracker`,
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
        setDataPsaOrder(data);
      } else {
        setDataPsaOrder([]);
      }
    }
  };

  const statusUpdate = async (psasubnum) => {
    const getdataWithSubnum = async () => {
      const subnumber = psasubnum;
      const creationdate = date;
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/updatePsa-subtracker`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creationdate,
            subnumber,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else if (res.status === 500) {
        console.log("No Data");
      } else {
        if (!data) {
        } else {
          getdata();
          toast.success("PSA Number Added!");
        }
      }
    };
    getdataWithSubnum();
  };

  const columns = [
    {
      field: "creationdate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Creation Date",
      width: 150,
    },
    {
      field: "subnumber",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Sub Number",
      width: 150,
    },
    {
      field: "psacurrentstatus",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "PSA Current Status",
      width: 150,
    },
    {
      field: "gradespopped",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Grades Popped",
      width: 150,
    },
    {
      field: "updatedAt",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Last Updated",
      width: 250,
    },
    {
      field: "update",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Request Updated Status",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="#"
            onClick={() => statusUpdate(row.row.subnumber)}
            className=""
          >
            Request Updated Status
          </Link>
        </td>
      ),
    },
  ];
  const rows = datas.map((element, index) => ({
    _id: element._id,
    creationdate: formatDate(new Date(element.creationdate)),
    psacurrentstatus: element.psacurrentstatus,
    subnumber: element.subnumber,
    gradespopped: element.gradespopped,
    updatedAt: element.updatedAt,
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

  const columnsPsaOrders = [
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
      field: "psasubnumber",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "PSA Sub #",
      width: 150,
    },
    {
      field: "cardssenttopsadate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Cards Sent To Psa Date",
      width: 150,
    },
    {
      field: "cardrecievedbypsadate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Card Recieved By Psa Date",
      width: 250,
    },
    {
      field: "order",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Details",
      width: 150,
      renderCell: (row) => (
        <td>
          <td>
            <Link
              to="/admin/order-details/"
              className="text-danger"
              onClick={() =>
                orderDetails(
                  row.row.userid,
                  row.row.orderid,
                  row.row.grcompanyname
                )
              }
            >
              {" "}
              Order Details
            </Link>
          </td>
        </td>
      ),
    },
  ];
  const rowsPsaOrders = datasPsaOrder.map((element, index) => ({
    _id: element._id,
    servicelevel: element.servicelevel,
    status: element.status,
    psasubnumber: element.psasubnumber,
    cardssenttopsadate: element.cardssenttopsadate,
    userid: element.userid,
    orderid: element.orderid,
    grcompanyname: element.grname,
    cardrecievedbypsadate: element.cardrecievedbypsadate,
  }));
  const orderDetails = async (uid, orderid, grname) => {
    localStorage.setItem("aUdetailsId", uid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
  };

  const columnsOrderRecieved = [
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
      field: "order",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Details",
      width: 150,
      renderCell: (row) => (
        <td>
          <td>
            <Link
              to="/admin/order-details/"
              className="text-danger"
              onClick={() =>
                orderDetails(
                  row.row.userid,
                  row.row.orderid,
                  row.row.grcompanyname
                )
              }
            >
              {" "}
              Order Details
            </Link>
          </td>
        </td>
      ),
    },
    {
      field: "cardrecieveddate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Card Recieved Date",
      width: 250,
    },
    {
      field: "note",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Note As Problem",
      width: 150,
      renderCell: (row) => (
        <td>
          <td>
            <Link
              to="#"
              className="text-danger"
              onClick={() =>
                orderDetails(
                  row.row.userid,
                  row.row.orderid,
                  row.row.grcompanyname
                )
              }
            >
              {" "}
              Note As Problem
            </Link>
          </td>
        </td>
      ),
    },
  ];
  const rowsOrdersRecieved = datasOrderRecieved.map((element, index) => ({
    _id: element._id,
    servicelevel: element.servicelevel,
    status: element.status,
    psasubnumber: element.psasubnumber,
    name: element.name,
    userid: element.userid,
    orderid: element.ordernumber,
    grcompanyname: element.grname,
    cardrecieveddate: element.cardrecieveddate,
  }));

  const handleSelect = async (e) => {
    setSelectData(e.target.value);
    const status = e.target.value;
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/get-status-subtracker`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
        } else {
          if (data.length > 0) {
            setData(data);
          } else {
            setData([]);
          }
        }
      }
    };
    getdata();
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
              <div className="row">
                <div className="col-lg-12">
                  <h4 className="mb-3">Instructions for use:</h4>
                  <p>
                    Click the <b>Update Non-Complete All Subs</b> to pull
                    updates on every sub.
                  </p>
                  <p>
                    Or, use the table to below to search for an existing sub and
                    pull information manually via the{" "}
                    <b>Request Updated Status</b> button
                  </p>
                  <p>
                    Use the filters to filter a specific category of status OR
                    to remove complete subs
                  </p>
                  <p>
                    If you DO NOT FIND the sub your are looking for click the{" "}
                    <b> + Add New Submission</b>
                  </p>
                  <p className="text-justify">
                    <b>
                      Not all subs are available and the table below works every
                      time we receive a new confirmation email that the
                      submission number has been created. Subs forms prior to
                      Feb. 2022 will NOT show in the table unless manually
                      entered.{" "}
                    </b>
                  </p>
                </div>

                <div className="col-lg-4"></div>
                {/* <div className="col-lg-4">
                         <button className="submitbtn text-center" > Update Non Complete All PSA SUB</button>
                       </div> */}
                <div className="col-lg-4"></div>
              </div>
            </div>

            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-4">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      PSA Sub Tracker
                    </span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <button
                    className="submitbtn text-center"
                    onClick={handleShow}
                  >
                    {" "}
                    Add New Submission
                  </button>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-group">
                      <label>Creation Date</label>
                      <input
                        value={date}
                        onChange={handleDate}
                        type="date"
                        className="form-control"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Sub Number</label>
                      <input
                        placeholder="Sub Number"
                        value={subNum}
                        onChange={handleSubNum}
                        type="number"
                        className="form-control"
                      ></input>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div className="col-lg-1"></div>
                <div className="col-lg-4">
                  <select
                    value={selectDatas}
                    onChange={handleSelect}
                    className="form-control"
                  >
                    <option value="0">Select PSA Current Status</option>
                    <option>Hide Completed</option>
                    <option>Arrived</option>
                    <option>Order Prep</option>
                    <option>Research & Id</option>
                    <option>Grading</option>
                    <option>Assembly</option>
                    <option>QA Check 1</option>
                    <option>QA Check 2</option>
                    <option>Grades Avilable For Pooping</option>
                  </select>
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

            <div className="Dashboardsec box-shadow helpform">
              <div className="row ">
                <div className="col-lg-4">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">Our PSA Order</span>
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
                    rows={rowsPsaOrders}
                    columns={columnsPsaOrders}
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
                <div className="col-lg-5s">
                  <div className="Topl">
                    <span className="heading-level-2 mb-3">
                      Orders Received by Nashcards
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
                    rows={rowsOrdersRecieved}
                    columns={columnsOrderRecieved}
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
