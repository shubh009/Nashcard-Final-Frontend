import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";

const EditProject = () => {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [assignedMemberData, setAssignedMemberData] = useState([]);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [assignedMember, setAssignedMember] = useState("");
  const [description, setDescription] = useState("");
  const [projectData, setProjectData] = useState([]);
  const id = localStorage.getItem("projId");
  console.log(date);
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

  const [isvalid, setIsValid] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
            `${process.env.REACT_APP_API_URL}/updateproject`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                projectTitle,
                status,
                description,
                dueDate,
                assignedMember,
                id,
              }),
            }
          );
          const data = await res.json();
          if (res.status === 422 || !data) {
            console.log("error ");
          } else {
            if (!data) {
            } else {
              if (res.status === 200) {
                navigate("/admin/projects");
              }
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

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }

  useEffect(() => {
    getdata();
    getdataAssignedMember();
  }, []);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/get-project-with-id`,
      {
        method: "POST",
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
      setProjectData(data);
      setProjectTitle(data.projectTitle);
      setDescription(data.description);
      setStatus(data.status);
      setDate(formatDate(new Date(data.dueDate)));
      setAssignedMember(data.assignedMember);
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
                <Button variant="primary" onClick={handleSubmit}>
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProject;
