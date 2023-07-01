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
                  <div className="col-lg-6">
                    <div className="Dashboardsec box-shadow helpform">
                         <div className="row">
                             <div className="col-lg-8">
                              <div className="Topl">
                                 <span className="heading-level-2">Total Cards Logged</span>
                              </div>
                             </div>
                             <div className="col-lg-4">
                             <select className="form-control">
                                            <option value="0">Select</option>
                                            <option value="0">This Month</option>
                                            <option value="0">Last Month</option>
                                            <option value="0">Current Qtr</option>
                                          </select>
                             </div>
                         </div>
                       
                        <Table striped bordered hover className="mt-4">
                           <thead>
                               <tr>
                                 <th className="w120">Date Looged#</th>
                                 <th className="w270">Total Cards Logged</th>
                                     
                                </tr>
                                <tr>
                                    <td>14306</td>
                                    <td>Alex Kin</td>
                                    
                                </tr>
                            </thead>
                        </Table>
                    </div>
                  </div>
                   <div className="col-lg-6">
                    <div className="Dashboardsec box-shadow helpform">
                         <div className="row">
                             <div className="Topl">
                                 <span className="heading-level-2">Total Cards Logged/Day</span>
                              </div>
                            
                         </div>
                       
                       
                    </div>
                  </div>
                 </div>
              </div>
            </div>
        </div>
)}
export default index;