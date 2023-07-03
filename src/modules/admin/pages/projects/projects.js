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

const Projects = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [assignedMemberData, setAssignedMemberData] = useState([]);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [assignedMember, setAssignedMember] = useState("");
  const [description, setDescription] = useState("");
  const [projectData, setProjectData] = useState([]);
  const handleProjectTitle = (e) => {
    setProjectTitle(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleAssignedMember = (e) => {
    setAssignedMember(e.target.value);
  };
  const handleDesc = (e) => {
    setDescription(e.target.value);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isvalid, setIsValid] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    if (isvalid) {
      if (
        projectTitle !== "" &&
        status !== "" &&
        assignedMember !== "" &&
        description !== "" &&
        date !== ""
      ) {
        const dueDate = date;
        const getdata1 = async () => {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/create-project`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                projectTitle,
                status,
                description,
                dueDate,
                assignedMember,
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
              toast.success("Project Added!");
            }
          }
        };
        getdata1();
      } else {
        alert("Any Field Can Not Be Blank");
      }
    } else {
      alert("Please Check Validation Error Mesage");
    }
  };

  useEffect(() => {
    getdata();
    getdataAssignedMember();
  }, []);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-details-project`,
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
        setProjectData(data);
      } else {
        setProjectData([]);
      }
    }
  };
  const getdataAssignedMember = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/find-member`, {
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
        setAssignedMemberData(data);
      } else {
        setAssignedMemberData([]);
      }
    }
  };
  const columns = [
    {
      field: "projectTitle",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Project Title",
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
      field: "createdAt",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Creation Date",
      width: 150,
    },
    {
      field: "dueDate",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Due Date",
      width: 150,
    },
    {
      field: "desc",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Description",
      width: 250,
    },
    {
      field: "assigned",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Assigned Member",
      width: 250,
    },
    {
      field: "createdBy",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Created By",
      width: 250,
    },
    {
      field: "edit",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Edit",
      width: 150,
      renderCell: (row) => (
        <td>
          <Link
            to="/admin/edit-project/"
            onClick={() => orderDetails(row.row._id)}
            className=""
          >
            Edit
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
                ? projectDelete(row.row._id)
                : e.preventDefault()
            }
            className=""
          >
            Delete
          </Link>
        </td>
      ),
    },
  ];

  const orderDetails = async (id) => {
    localStorage.setItem("projId", id);
  };
  const projectDelete = async (id) => {
    const getdataDelete = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-project`,
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
        getdata();
        toast.success("Deleted");
      }
    };
    getdataDelete();
  };
  const rows = projectData.map((element, index) => ({
    _id: element._id,
    projectTitle: element.projectTitle,
    status: element.status,
    desc: element.description,
    createdBy: element.createdBy,
    createdAt: formatDate(new Date(element.createdAt)),
    assigned: element.assignedMember,
    dueDate: formatDate(new Date(element.dueDate)),
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
                      Projects Data Table
                    </span>
                  </div>
                </div>
                <div className="col-lg-4">
                  <button
                    className="submitbtn text-center"
                    onClick={handleShow}
                  >
                    {" "}
                    Add New Projects
                  </button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Project Title</label>
            <input
              placeholder="Project Title"
              value={projectTitle}
              onChange={handleProjectTitle}
              type="text"
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label>Set Status</label>
            <select
              value={status}
              onChange={handleStatus}
              className="form-control"
            >
              <option value="0" selected>
                {" "}
                Select Status
              </option>
              <option value="1" selected>
                {" "}
                In Progress
              </option>
              <option value="2" selected>
                {" "}
                On Hold
              </option>
              <option value="2" selected>
                {" "}
                Complete
              </option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              value={date}
              onChange={handleDate}
              type="date"
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label>Assign To Team Member</label>
            <select
              value={assignedMember}
              onChange={handleAssignedMember}
              className="form-control"
            >
              <option value="0" selected>
                {" "}
                Select Team Member
              </option>
              {assignedMemberData.map((el) => {
                return <option key={el._id}> {el.name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              placeholder="Description"
              value={description}
              onChange={handleDesc}
              type="text"
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
    </>
  );
};
export default Projects;
