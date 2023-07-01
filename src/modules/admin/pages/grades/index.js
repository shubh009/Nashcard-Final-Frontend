import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import "./grade.css";
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import { BiPlusCircle } from "react-icons/bi";
import FormData from "form-data";
import Axios from "axios";
import {saveAs} from "file-saver";
import sampleCsv from "../../../../../src/GradeList.csv";


const index=()=>{

     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     //state to manage the grade popuop textboxes
     const [cert, setCert]=useState("");
     const [grade, setGrade]=useState("");
     const [description, setDescription]=useState("");
     const [orderid, setorderid]=useState("");
     const [PSAsub, setPSAsub]=useState("");
     const [newpoopedDate,setpoopedDate]=useState("");
     const [PSAUpchargeAmmount, setPSAUpchargeAmmount]=useState("");

     //State to get the gradeList data
     const [gradeList, setgradeList]=useState([]);
     const [OrderStatus, setOrderStatus]=useState("");

     const notify = () => toast.success("New grades has been updated");
     const notifyupdate = () => toast.success("Order status has been updated");
     const notifyalert = (e) => toast.error(e);
     const sucessMessage=(e)=>toast.success(e);
     let selectindex=0

     const [file,setFile] = useState(null);

     //call all the function which we want to run on page Load

     useEffect(()=>{
      getGradeList();     
    }, [])


     const getGradeList=async(e)=>{
      let fbody;
     
      if(selectindex>0)
      {
        selectindex = e.target.selectedIndex;
        fbody= JSON.stringify({
          datefilter:true
        })
      }
      else
      {
        fbody= JSON.stringify({
          datefilter:false
        })
      }
      
      let result = await fetch('http://localhost:5000/allgradelist',{
          method:"POST",
          body: fbody,
          headers: {
            'content-type': 'application/json'
          }
        });
        result=await result.json();
        if(result)
        {
          setOrderStatus(result.status);
          setgradeList(result.Grades);
        }

     }

     const handleOrderUpdate= async(oid)=>{
      
      if(oid)
      {
        let result = await fetch('http://localhost:5000/updateOrderStaus',{
          method:"PATCH",
          body: JSON.stringify({
            "orderid":oid,
            "orderStatus": "Quality And Assurance"
          }),
          headers: {
            'content-type': 'application/json'
          }
        });
        result=await result.json();
        if(result)
        {
          notifyupdate();
          getGradeList();
        }
      }
      else
      {
        notifyalert("order Id Not Found");
      }
     }

     
     
     const handleGrade= async()=>{
      alert(newpoopedDate);
      if(cert!="" && grade!="" && description!="" && orderid!="")
      {     
        let result = await fetch('http://localhost:5000/addgrade',{
          method:"POST",
          body: JSON.stringify({
            "orderid":orderid,
            "cert": cert,
            "grade":grade,
            "description": description, 
            "PSAsub": PSAsub,
            "poppedDate": newpoopedDate,
            "PSAUpchargeAmmount": PSAUpchargeAmmount,
            "frontImage": null,
            "backimage": null

          }),
          headers: {
            'content-type': 'application/json'
          }
        });
        result=await result.json();
        if(result)
        {
          getGradeList();
          notify();
          setCert("");
          setGrade("");
          setDescription("");
          setorderid("");
          handleClose();
        }
      }
      else
      {
        notifyalert("Please fill all the details")       
      }
     }

     const handleFileSubmit = (e)=>{
      e.preventDefault();  
      if (file !== null) {			
        console.log(file);
        let formValue = new FormData();
        formValue.append("file", file);
        formValue.append("userid",5549);
        formValue.append("orderid","SG-00132");
        
        Axios.post("http://localhost:5000/upload", formValue, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          sucessMessage("File Uploaded Sucessfully"); 
        });
      } else {
        alert("Select a valid file.")
      }
    };

    // const handleDownload = () => {

    //   var FileSaver = require('file-saver');
    //   var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
    //   FileSaver.saveAs(file);


    // }
  
    return(
        <>
           <div className="container-fluid " id="admin">
         
           <ToastContainer  position="top-right"  autoClose={5000} hideProgressBar={false}
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Add New Grades</Modal.Title>
               </Modal.Header>
           <Modal.Body className="px-4 py-4">
               <div className="row">
                 <div className="col-lg-6">
                  <div className="form-group mb-3 mt-2">
                    <label>Order Number</label>
                    <input className="form-control" type="text"  value={orderid} 
                  onChange={(e)=>setorderid(e.target.value)}></input>
                   </div>
                 </div>
                 <div className="col-lg-6">
                 <div className="form-group mb-3 mt-2">
                  <label>Cert</label>
                  <input className="form-control" type="text"
                   value={cert} 
                  onChange={(e)=>setCert(e.target.value)}></input>
                </div>
                 </div>
               </div>
               
               <div className="row">
                <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>Grade</label>
                  <input className="form-control" type="text"
                  value={grade} 
                  onChange={(e)=>setGrade(e.target.value)}
                  ></input>
                </div>
                </div>
                <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>PSA Sub</label>
                  <input className="form-control" type="text"
                  value={PSAsub} 
                  onChange={(e)=>setPSAsub(e.target.value)}
                  ></input>
                   
               
                </div>
                </div>
               </div>
              
              <div className="row">
                <div className="col-lg-6">
                 <div className="form-group mb-3 mt-2">
                  <label>PSA Upcharge Ammount</label>
                  <input className="form-control" type="text"
                  value={PSAUpchargeAmmount} 
                  onChange={(e)=>setPSAUpchargeAmmount(e.target.value)}
                  ></input>
                </div>
                </div>
                <div className="col-lg-6">
                <div className="form-group mb-3 mt-2">
                  <label>Date Popped</label>
                  <input className="form-control" type="date"
                  value={newpoopedDate} 
                  onChange={(e)=>setpoopedDate(e.target.value)}
                  ></input>
                </div>

                </div>
              </div>

                <div className="form-group mb-3 mt-2">
                   <label>Description</label>
                  <input className="form-control" type="text" value={description} 
                  onChange={(e)=>setDescription(e.target.value)}>

                  </input>
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
                            Please make sure to use the CSV template. The sheet <b className="fw-bold text-black">MUST</b> have the <b className="fw-bold text-black">PSA Submission # AND the Order Number</b>  for it to be tied to the customer account. 
                          </p>
                          <p>
                            The CSV can be accessed via <Link to="https://docs.google.com/spreadsheets/d/1N2KLkHHfXebAhnOWqLID2LFy69g2qJ-CaXO8-5qTYhU/edit?usp=sharing" target={"_blank"}>Google Drive </Link> or downloaded below

                          </p>
                          <p className="mt-4 mb-4">
                          <Link to= {sampleCsv }    download="GradeList.csv" 
                              target="_blank" rel="noreferrer">
                            <button className="submitbtn">Download Now</button>
                            </Link>
                          </p>
                          <p>
                             Click   <Link to="https://docs.google.com/spreadsheets/d/1N2KLkHHfXebAhnOWqLID2LFy69g2qJ-CaXO8-5qTYhU/edit?usp=sharing" target={"_blank"}> here</Link> to access SGC Photos
                          </p>
                          <p>
                            Retrieve the numbers after the last / and copy and paste into the SGC Photo field below for each order in the same sub.
                          </p>
                          <p>
                            <b className="fw-bold text-black">NOTE</b>: Orders highlighted red include Beckett autos which requires an upcharge to be entered
                          </p>
                          <div className="form-group">
                          <img src="https://res.cloudinary.com/tadabase/image/upload/v1643386063/client/nashcards/sgcpictureID_pfd9o0.jpg" width="100%"></img>
                          </div>

                        </div>
                     </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="Dashboardsec box-shadow helpform">
                        <div className="Topl">
                          <span className="heading-level-2">Mass Log Grades Upload</span>
                        </div>
                        <div className="form-group">
                          <p className="mt-4 mb-4">
                           <form onSubmit={handleFileSubmit}>
                              <input type="file" name="file" required className="mb-4" 
                                 onChange={(e)=>setFile(e.target.files[0])} ></input>
                              <button type="submit" className="submitbtn">Import Records</button>
                            </form>
                          </p>
                        </div>
                        <div className="Topl">
                          <span className="heading-level-2">Update Order Status</span>
                        </div>
                        <div className="form-group">
                            <p>Note: This takes FOREVER. Don't do it, use the table below and find. 
                              the order number and click the "Set as Grades Pending</p>
                          <p className="mt-4 mb-4">
                            <Link to="#" className="submitbtn" >Change Status</Link>
                            <Link to="#" className="btn btn-primary mx-3">Add Upcharges</Link>
                          </p>
                        </div>
                     </div>
                    </div>
                   </div>
                   <div className="row">
                     <div className="col-lg-12">
                      <div className="Dashboardsec box-shadow helpform">
                        <div className="Topl">
                          <span className="heading-level-2">Customer Orders that Need Alertin' 
                          (Adjust prior to 11479)</span>
                        </div>
                        <div className="mt-2">
                        <Table striped bordered hover>
                           <thead>
                               <tr>
                                 <th className="w80">Order#</th>
                                 <th className="w80">Qty</th>
                                 <th className="w270">Customer Name</th>
                                 <th className="w220">Service Level</th>
                                 <th className="w80">PSA Sub#</th>     
                                 <th className="w150">Order Total</th>      
                                 <th className="w220">Order Details </th>      
                                 <th className="w150">Alert V2</th>      
                                
                                </tr>
                                <tr>
                                  <td>49372</td>
                                  <td>1</td>
                                  <td>Steve Roth</td>
                                  <td>SGC Regular</td>
                                  <td>205317056181</td>
                                  <td>35.0</td>
                                  <td><Link to="#" className="btn btn-primary" >Order Details</Link>
                                  </td>
                                  <td><Link to="#" className="btn btn-danger">Alert V2</Link></td>
                                  
                                </tr>
                           </thead>
                        </Table>
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
                               <span className="heading-level-2">Grades Data Table</span>
                              </div>
                          </div>
                          <div className="col-lg-8 float-end mb-3">
                               <div className="col-lg-3 float-end">
                               <button className="submitbtn" onClick={handleShow}> <BiPlusCircle className="mx-1"></BiPlusCircle> Add New Grade</button>
                               </div>
                               <div className="col-lg-4 float-end mx-3">
                                 <select className="form-control" 
                                 onChange={getGradeList}>
                                 <option value="0" name="select">Gade Data Filter By</option>
                                  <option value="1" name="select">Popped Date is Today</option>
                                  <option value="2" name="select">Recently Popped</option>
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
                                {
                                   gradeList.map(glist=>(

                                    <tr className={glist._id}>
                                      <td>{glist.orderid}</td>
                                      <td></td>
                                      <td>{glist.cert}</td>
                                      <td>{glist.grade}</td>
                                      <td>{glist.description}</td>
                                      <td>{glist.OrderStatus}</td>
                                      <td className="text-center"><Link to="#" onClick={()=>handleOrderUpdate(glist.orderid)}>Set Order as Quality and Assurance</Link></td>
                                    </tr>

                                   ))
                                }
                                
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
    )
}

export default index