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

const Address = () => {
  const [getCustomerData, setCustomerData] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const setdata = (e) => {
    const { name, value } = e.target;
    setInpVal((inpVal) => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };
  const columns = [
    {
      field: "name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Customer Name",
      width: 150,
    },
    {
      field: "email",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Email",
      width: 180,
    },
    {
      field: "address",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Address",
      width: 280,
    },
    {
      field: "contact",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Phone",
      width: 170,
    },
    {
      field: "userdetails",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "User Details",
      width: 200,
      renderCell: (row) => (
        <td>
          <Link className="">User Details</Link>
        </td>
      ),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addressSearch } = inpVal;
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/search-customers-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressSearch,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (data.length > 0) {
          setCustomerData(data);
        }
      }
    };
    getdata();
  };

  const rows = getCustomerData.map((element, index) => ({
    _id: element._id,
    name: element.name,
    email: element.email,
    address: element.address,
    contact: element.contact,
  }));

  const other = {
    autoHeight: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
  };

  return (
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
                <div className="Topl">
                  <span className="heading-level-2">
                    Customer Address Search
                  </span>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="addressSearch"
                      onChange={setdata}
                      placeholder="Enter Customer Address"
                      className="form-control"
                    ></input>
                  </div>
                  <div className="col-lg-4">
                    <button onClick={handleSubmit} className=" submitbtn">
                      Search
                    </button>
                  </div>
                </div>

                <div className="row mt-3">
                  {/* Grid code will here ... */}
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

          {/* <div className="container-fluid"> */}
        </div>
      </div>
    </div>
  );
};
export default Address;
