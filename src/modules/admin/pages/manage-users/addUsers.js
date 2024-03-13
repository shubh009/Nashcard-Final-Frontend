import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addUsers = () =>
{
    const [ name, setName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ conatctNo, setContactno ] = useState( "" );
    const [ userType, setuserType ] = useState( "" );
    const [ empdata, setempdata ] = useState( [] );
    const notify = () => toast.success("New user has been registered sucessfully!!!");

    const onServiceLevelDDL = (e) => {
      var index = e.target.selectedIndex;
      if (index > 0) {
        const dname = e.target[ index ].text;
        const dvalue = e.target[ index ].value;
        setuserType( dvalue );
    } else {
      alert("Please select User Type");
    }
    };

    const getdata = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/getEmpList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.length > 0) {
        console.log( data );
        setempdata( data );
        
      } else {
        setempdata([]);
    }
  };
    
    useEffect(() => {
    getdata();
  }, []);
     

    const RegisterNewUser = async () =>
    {
        let password = "";
        const characters = "0123456789";
        const charactersLength = 5;
        let counter = 0;
        while (counter < 5) {
          password += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
        }
        
        let result = await fetch(
            `${process.env.REACT_APP_API_URL}/registerNewUser`,
            {
                method: "post",
                body: JSON.stringify( {
                    "adminid": password,
                    "name": name,
                    "email": email,
                    "password": password,
                    "contact": "conatctNo",
                    "isactive": 1,
                    "adminlevel": userType
                } ),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        const userinfo = await result.json();
        if ( userinfo )
        {
            getdata();
            notify(); 
        }

        setName( "" );
        setEmail( "" );
        setContactno( "" );
        setuserType( "" );
        
        
    }

    return (
        <>
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
              <div className="container-fluid " id="admin">
                  <div className="row" id="grade">
                       <div className="col-lg-2 noleftrightpadding">
                            <UsidePanel></UsidePanel>
                       </div>
                         <div className="col-lg-10 noleftrightpadding">
                              <Uheader></Uheader>
                             <div className="row">
                                 <div className="col-lg-5">
                                    <div className="Dashboardsec box-shadow helpform">
                                      <div className="row">
                                         <div className="col-lg-8">
                                            <div className="Topl">
                                                 <span className="heading-level-2 mb-3">Add New User</span>
                                             </div>
                                         </div>
                                      </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                           <div className="form-group">
                                             <label>Name</label>
                                             <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}></input>
                                           </div>
                                        </div>
                                         <div className="col-lg-12">
                                           <div className="form-group">
                                             <label>Email</label>
                                             <input type="text" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                                           </div>
                                         </div>
                                         <div className="col-lg-12">
                                           <div className="form-group">
                                             <label>Contact No</label>
                                             <input type="text" className="form-control" value={conatctNo} onChange={(e)=>setContactno(e.target.value)}></input>
                                           </div>
                                        </div>
                                         <div className="col-lg-12">
                                           <div className="form-group">
                                             <label>Login Type</label>
                                                <select className="form-control" onChange={ onServiceLevelDDL }>
                                                <option value="0" name="select">
                                                    Select User Type
                                                </option>
                                                <option value="1" name="select">
                                                    Admin
                                                </option>
                                                <option value="2" name="select">
                                                    Employee
                                                </option>
                                              </select>
                                           </div>
                                        </div>
                                         <div className="col-lg-12 mt-3 ">
                                            <div className="form-group">
                                              <button type="submit" className="submitbtn" onClick={RegisterNewUser}>Register New User</button> 
                                            </div>
                                        </div>
                                    </div>
                                   </div>
                                  </div>
                                <div className="col-lg-7">
                                    <div className="Dashboardsec box-shadow helpform">
                                      <div className="row">
                                         <div className="col-lg-8">
                                            <div className="Topl">
                                                 <span className="heading-level-2 mb-3">User List</span>
                                             </div>
                                         </div>
                                      </div>
                                      <div className="row">
                                         <div className="col-lg-12">
                                             <Table striped bordered hover className="mt-3">
                                             <thead>
                                                <tr>
                                                    <th>Empid</th>
                                                    <th>Name</th>
                                                    <th>Email Id</th>
                                                    <th>Contact</th>
                                                    <th>User Type</th>
                                                    {/* <th>Edit</th> */}
                                                    {/* <th>DLT</th> */}
                                                </tr>

                                                {empdata.map((emp) => (
                                                     <tr key={emp._id}>
                                                          <td>{emp.adminid}</td>
                                                          <td>{emp.name}</td>
                                                          <td>{emp.email}</td>
                                                          <td>{emp.contact}</td>
                                                        <td>
                                                            {
                                                                emp.adminlevel  == 1 ? "Admin"
                                                                : "Employee"
                                                            } 
                                                                
                                                          
                                                            
                                                        </td>
                                                          {/* <td className="bg-primary text-white text-center font-30">
                                                          <button type="submit" onClick={() =>    getcarddetails(emp._id)} >
                                                            {" "}
                                                            <BiMessageEdit></BiMessageEdit>
                                                         </button>
                                                         </td> */}
                                                        {/* <td className="bg-danger text-white text-center heading-level-3 font-30">
                                                           <button type="submit" onClick={() =>  deletecard(emp._id)} >
                                                             {" "}
                                                             <AiOutlineDelete></AiOutlineDelete>
                                                           </button>
                                                        </td> */}
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
                </div>
        </>
    )
}

export default addUsers;