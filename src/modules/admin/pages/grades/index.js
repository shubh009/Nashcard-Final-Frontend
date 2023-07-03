import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import "./grade.css";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { BiPlusCircle } from "react-icons/bi";
import FormData from "form-data";
import Axios from "axios";
import sampleCsv from "../../../../../src/GradeList.csv";
import Card from "react-bootstrap/Card";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const index = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [orderIdAutoCom, setOrderIdAutoCom] = useState([]);
  const [orderIdMatch, setOrderMatch] = useState([]);
  const [getUpdated, setUpdatedData] = useState([]);
  const [getUploadedData, setUplodeddData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  //state to manage the grade popuop textboxes
  const [cert, setCert] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [orderid, setorderid] = useState("");
  const [PSAsub, setPSAsub] = useState("");
  const [newpoopedDate, setpoopedDate] = useState("");
  const [PSAUpchargeAmmount, setPSAUpchargeAmmount] = useState("");

  //State to get the gradeList data
  const [gradeList, setgradeList] = useState([]);
  const [OrderStatus, setOrderStatus] = useState("");

  const notify = () => toast.success("New grades has been updated");
  const notifyupdate = () => toast.success("Order status has been updated");
  const notifyalert = (e) => toast.error(e);
  const sucessMessage = (e) => toast.success(e);
  let selectindex = 0;

  const [file, setFile] = useState(null);

  //call all the function which we want to run on page Load

  useEffect(() => {
    getGradeList();
  }, []);

  const getGradeList = async (e) => {
    let fbody;

    if (selectindex > 0) {
      selectindex = e.target.selectedIndex;
      fbody = JSON.stringify({
        datefilter: true,
      });
    } else {
      fbody = JSON.stringify({
        datefilter: false,
      });
    }

    let result = await fetch(`${process.env.REACT_APP_API_URL}/order-status`, {
      method: "POST",
      body: fbody,
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      setOrderStatus(result);
      // setgradeList(result);
    }
  };

  const handleOrderUpdate = async (oid) => {
    if (oid) {
      let result = await fetch(
        `${process.env.REACT_APP_API_URL}/updateOrderStaus`,
        {
          method: "PATCH",
          body: JSON.stringify({
            orderid: oid,
            orderStatus: "Quality And Assurance",
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      result = await result.json();
      if (result) {
        notifyupdate();
        getGradeList();
        getdataUpdate();
      }
    } else {
      notifyalert("order Id Not Found");
    }
  };

  const handleGrade = async () => {
    alert(newpoopedDate);
    if (cert != "" && grade != "" && description != "" && orderid != "") {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/addgrade`, {
        method: "POST",
        body: JSON.stringify({
          orderid: orderid,
          cert: cert,
          grade: grade,
          description: description,
          PSAsub: PSAsub,
          poppedDate: newpoopedDate,
          PSAUpchargeAmmount: PSAUpchargeAmmount,
          frontImage: null,
          backimage: null,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();
      if (result) {
        getGradeList();
        notify();
        setCert("");
        setGrade("");
        setDescription("");
        setorderid("");
        handleClose();
      }
    } else {
      notifyalert("Please fill all the details");
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (file !== null) {
      let formValue = new FormData();
      formValue.append("file", file);
      // formValue.append("userid",5549);
      // formValue.append("orderid","SG-00132");

      Axios.post(`${process.env.REACT_APP_API_URL}/upload-grades`, formValue, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        // console.log(res);
        setShow1(true);
        handleShow1();
        // setFile(null)
        // sucessMessage("File Uploaded Sucessfully");
      });
    } else {
      alert("Select a valid file.");
    }
  };
  const handleMailSend = (e) => {
    // e.preventDefault();
    handleClose1();
    const getMail = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/get-uploaded-grades-for-mail`,
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
        sucessMessage("Mail Sent Sucessfully");
        // setOrderIdAutoCom(data);
      }
    };
    getMail();
  };

  // const handleDownload = () => {

  //   var FileSaver = require('file-saver');
  //   var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
  //   FileSaver.saveAs(file);

  // }
  useEffect(() => {
    getdataUpdate();
    getdata();
  }, []);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/order-autocomplete`,
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
      setOrderIdAutoCom(data);
    }
  };

  const getdataUpdate = async () => {
    const res1 = await fetch(
      `${process.env.REACT_APP_API_URL}/get-uploaded-grades`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data1 = await res1.json();
    if (res1.status === 422 || !data1) {
      console.log("error ");
    } else {
      setUpdatedData(data1);
    }
  };

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

  const columns = [
    {
      field: "ordernumber",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Number",
      width: 150,
    },
    {
      field: "qty",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Qty",
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
      field: "psasub",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Sub #",
      width: 200,
    },
    {
      field: "sgcphoto",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Sgc Photo",
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
                  row.row.ordernumber,
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
      field: "alert",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Alert V2",
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
                  row.row.ordernumber,
                  row.row.grcompanyname
                )
              }
            >
              Alert V2
            </Link>
          </td>
        </td>
      ),
    },
    {
      field: "ordertotal",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Order Total",
      width: 150,
    },
  ];
  const rows = getUpdated.map((element, index) => ({
    _id: element._id,
    name: element.name,
    sgcphoto: element.sgcphoto,
    psasub: element.psasub,
    servicelevel: element.servicelevel,
    status: element.status,
    qty: element.qty,
    userid: element.userid,
    ordernumber: element.orderid,
    grcompanyname: element.grname,
    ordertotal: element.ordertotal,
  }));
  const orderDetails = async (uid, orderid, grname) => {
    localStorage.setItem("aUdetailsId", uid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
  };
  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Grades</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 py-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>Order Number</label>
                  <input
                    className="form-control"
                    type="text"
                    value={orderid}
                    onChange={(e) => setorderid(e.target.value)}
                    onKeyDown={(e) => searchOrderId(e.target.value)}
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
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>Cert</label>
                  <input
                    className="form-control"
                    type="text"
                    value={cert}
                    onChange={(e) => setCert(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>Grade</label>
                  <input
                    className="form-control"
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>PSA Sub</label>
                  <input
                    className="form-control"
                    type="text"
                    value={PSAsub}
                    onChange={(e) => setPSAsub(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>PSA Upcharge Ammount</label>
                  <input
                    className="form-control"
                    type="text"
                    value={PSAUpchargeAmmount}
                    onChange={(e) => setPSAUpchargeAmmount(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>Date Popped</label>
                  <input
                    className="form-control"
                    type="date"
                    value={newpoopedDate}
                    onChange={(e) => setpoopedDate(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group mb-3 mt-2">
              <label>Description</label>
              <input
                className="form-control"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleGrade}>
              Add New Grade
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            WoW! All records from the CSV file has uploaded. <br></br>
            Now Do you want to send mail to each user for grade popped? If yes
            please click the "SEND NOW" button or click the "Close" button to
            dismiss the popup
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => handleMailSend()}>
              SEND NOW
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="row" id="grade">
          <div className="col-lg-2 noleftrightpadding">
            <UsidePanel></UsidePanel>
          </div>
          <div className="col-lg-10 noleftrightpadding">
            <Uheader></Uheader>
            <div className="row">
              <div className="col-lg-6">
                <div className="Dashboardsec box-shadow helpform">
                  <div className="Topl">
                    <span className="heading-level-2">Grades</span>
                  </div>
                  <div className="form-group">
                    <p>
                      Please make sure to use the CSV template. The sheet{" "}
                      <b className="fw-bold text-black">MUST</b> have the{" "}
                      <b className="fw-bold text-black">
                        PSA Submission # AND the Order Number
                      </b>{" "}
                      for it to be tied to the customer account.
                    </p>
                    <p>
                      The CSV can be accessed via{" "}
                      <Link
                        to="https://docs.google.com/spreadsheets/d/1N2KLkHHfXebAhnOWqLID2LFy69g2qJ-CaXO8-5qTYhU/edit?usp=sharing"
                        target={"_blank"}
                      >
                        Google Drive{" "}
                      </Link>{" "}
                      or downloaded below
                    </p>
                    <p className="mt-4 mb-4">
                      <Link
                        to={sampleCsv}
                        download="GradeList.csv"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button className="submitbtn">Download Now</button>
                      </Link>
                    </p>
                    <p>
                      Click{" "}
                      <Link
                        to="https://docs.google.com/spreadsheets/d/1N2KLkHHfXebAhnOWqLID2LFy69g2qJ-CaXO8-5qTYhU/edit?usp=sharing"
                        target={"_blank"}
                      >
                        {" "}
                        here
                      </Link>{" "}
                      to access SGC Photos
                    </p>
                    <p>
                      Retrieve the numbers after the last / and copy and paste
                      into the SGC Photo field below for each order in the same
                      sub.
                    </p>
                    <p>
                      <b className="fw-bold text-black">NOTE</b>: Orders
                      highlighted red include Beckett autos which requires an
                      upcharge to be entered
                    </p>
                    <div className="form-group">
                      <img
                        src="https://res.cloudinary.com/tadabase/image/upload/v1643386063/client/nashcards/sgcpictureID_pfd9o0.jpg"
                        width="100%"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="Dashboardsec box-shadow helpform">
                  <div className="Topl">
                    <span className="heading-level-2">
                      Mass Log Grades Upload
                    </span>
                  </div>
                  <div className="form-group">
                    <p className="mt-4 mb-4">
                      <form onSubmit={handleFileSubmit}>
                        <input
                          type="file"
                          name="file"
                          required
                          className="mb-4"
                          onChange={(e) => setFile(e.target.files[0])}
                        ></input>
                        <button type="submit" className="submitbtn">
                          Import Records
                        </button>
                      </form>
                    </p>
                  </div>
                  <div className="Topl">
                    <span className="heading-level-2">Update Order Status</span>
                  </div>
                  <div className="form-group">
                    <p>
                      Note: This takes FOREVER. Don't do it, use the table below
                      and find. the order number and click the "Set as Grades
                      Pending
                    </p>
                    <p className="mt-4 mb-4">
                      <Link to="#" className="submitbtn">
                        Change Status
                      </Link>
                      <Link to="#" className="btn btn-primary mx-3">
                        Add Upcharges
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="Dashboardsec box-shadow helpform">
                  <div className="Topl">
                    <span className="heading-level-2">Customer Orders</span>
                  </div>
                  <div className="mt-2">
                    {/* <Table striped bordered hover>
                           <thead>
                               <tr>
                                 <th className="w80">Order#</th>
                                 <th className="w80">Qty</th>
                                 <th className="w270">Customer Name</th>
                                 <th className="w220">Service Level</th>
                                 <th className="w80">PSA Sub#</th>     
                                 <th className="w150">Order Total</th>      
                                 <th className="w220">Order Details </th>      
                                
                                </tr>
                              
                                
                           </thead>
                        </Table> */}
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
            <div className="row">
              <div className="col-lg-12">
                <div className="Dashboardsec box-shadow helpform">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="Topl">
                        <span className="heading-level-2">
                          Grades Data Table
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-8 float-end mb-3">
                      <div className="col-lg-3 float-end">
                        <button className="submitbtn" onClick={handleShow}>
                          {" "}
                          <BiPlusCircle className="mx-1"></BiPlusCircle> Add New
                          Grade
                        </button>
                      </div>
                      <div className="col-lg-4 float-end mx-3">
                        <select
                          className="form-control"
                          onChange={getGradeList}
                        >
                          <option value="0" name="select">
                            Gade Data Filter By
                          </option>
                          <option value="1" name="select">
                            Popped Date is Today
                          </option>
                          <option value="2" name="select">
                            Recently Popped
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="w120">Order#</th>
                          <th className="w120">PSA Sub#</th>
                          <th className="w80">Cert</th>
                          <th className="w80">Grade</th>
                          <th className="w180">Description</th>
                          <th className="w150">Status</th>
                          <th className="w220 text-center">Action</th>
                        </tr>
                        {gradeList.map((glist) => (
                          <tr className={glist._id}>
                            <td>{glist.orderid}</td>
                            <td>{glist.PSASub}</td>
                            <td>{glist.cert}</td>
                            <td>{glist.grade}</td>
                            <td>{glist.description}</td>
                            <td>{glist.orderStatus}</td>
                            <td className="text-center">
                              <Link
                                to="#"
                                onClick={() => handleOrderUpdate(glist.orderid)}
                              >
                                Set Order as Quality and Assurance
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </thead>
                    </Table>
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

export default index;
