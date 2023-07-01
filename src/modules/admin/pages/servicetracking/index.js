import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index=()=>{
    return(
    
          <div className="container-fluid " id="admin">
         
         <ToastContainer  position="top-right"  autoClose={5000} hideProgressBar={false}
          newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        

           <div className="row" id="grade">
              <div className="col-lg-2 noleftrightpadding">
                   <UsidePanel></UsidePanel>
              </div>
              <div className="col-lg-10 noleftrightpadding">
                 <Uheader></Uheader>
                 <div className="row">
                  <div className="col-lg-12">
                    <div className="Dashboardsec box-shadow helpform">
                         <div className="row">
                             <div className="col-lg-12">
                              <div className="Topl">
                                 <span className="heading-level-2">Finding orders that should be marked as received by PSA.</span>
                              </div>
                             </div>
                         </div>
                         <div className="row pt-3">
                         <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="fw-bold mb-2">Service Level</label>
                                    <input type="textbox" className="form-control"></input>
                                </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                      <label className="fw-bold mb-2">Cards Sent to PSA Date</label>
                                      <div className="row">
                                        <div className="col-lg-6">
                                           <input type="textbox" className="form-control"></input>
                                        </div>
                                        <div className="col-lg-6">
                                          <select className="form-control">
                                            <option value="0">Select</option>
                                            <option value="0">Days</option>
                                            <option value="0">Week</option>
                                            <option value="0">Months</option>
                                            <option value="0">Years</option>
                                          </select>
                                        </div>
                                      </div>
                                     
                                     
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-4">
                                   <Link className="submitbtn mt-1 float-start text-ce">Search</Link>
                                </div>
                         </div>
                      
                    </div>
                  </div>
                 </div>
                 <div className="row">
                  <div className="col-lg-12">
                    <div className="Dashboardsec box-shadow helpform">
                         <div className="row">
                             <div className="col-lg-8">
                              <div className="Topl">
                                 <span className="heading-level-2">Orders Outside of 5 Days from Received to Sent to PSA</span>
                              </div>
                             </div>
                             <div className="col-lg-4">
                                <Link className="topbtn">Export To CSV</Link>
                             </div>
                         </div>
                       
                        <Table striped bordered hover className="mt-4">
                           <thead>
                               <tr>
                                 <th className="w80">Order#</th>
                                 <th className="w270">Customer Name</th>
                                 <th className="w220">Card Recived Date</th>
                                 <th className="w80">Service Level</th>     
                                 <th className="w150">Status</th>      
                                 <th className="w150">Card Qty</th> 
                                 <th className="w150">Order Total</th> 
                                 <th className="w150">Order Details </th>      
                                </tr>
                                <tr>
                                    <td>14306</td>
                                    <td>Alex Kin</td>
                                    <td>01/15/2021</td>
                                    <td>Economy</td>
                                    <td>Cards Received by Nashcards</td>
                                    <td>7</td>
                                    <td>63.00</td>
                                    <td><Link className="text-danger">Order Details</Link></td>
                                </tr>
                            </thead>
                        </Table>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
        </div>
)}
export default index;