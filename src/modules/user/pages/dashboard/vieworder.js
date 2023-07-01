import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import ProfileIcon from "../../../../assets/images/rectangle-user-icon.png";
import './dashboard.css';
import { RxPlusCircled } from "react-icons/rx";
import Table from 'react-bootstrap/Table';

const vieworder=()=>{
    return(
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2 noleftrightpadding">
                        <UsidePanel></UsidePanel>
                     </div>
                    <div className="col-lg-10 noleftrightpadding">
                        <Uheader></Uheader>
                        <div className="right-panel box-shadow">
                            <div className="row">
                               <div className="Topl">
                                 <span className="heading-level-2">Shipping Details</span>
                                </div>
                                <div className="col-lg-7">
                                 <p className="pt-4">
                                  Please note that all shipments to Nashcards 
                                    <b className="text-decoration-underline px-1">
                                        MUST include this print out.
                                    </b>
                                  </p>
                                   <p>
                                     Don't have a printer?  Make sure to include a note in the package with the following information:
                                   </p>
                                   <ul>
                                     <li>Order Number</li>
                                     <li>Service (i.e. SGC, PSA Express)</li>
                                     <li>Total Number of Cards Included in Pacakge</li>
                                     <li>Total Number of Orders in Package </li>
                                   </ul>

                                </div>
                                
                                <div className="col-lg-5">
                                    <div className="statbox">
                                    <Table className="table-bordered mt-1 mb-1 t01">
                                      <tbody>
                                         <tr>
                                           <th>SubTotal</th>
                                            <th>Optional Return Insurance:</th>
                                            <th>Return Shipping:	</th>
                                           <th>Order Total</th>
                                         </tr>
                                         <tr>
                                           <td>$10</td>
                                           <td>$20</td>
                                           <td>$20</td>
                                           <td>$400</td>
                                          </tr>
                                       </tbody>
                                     </Table>
                                 </div>

                                    <Link to="#" className="submitbtn btnsetup text-center">Click To Print Shipping PrintOut</Link>
                                </div>
                            </div>
                            <div className="row">
                              <div className="highlightdiv">
                                 <h5 className="fw-bold mb-0">Packing Slip Details</h5>
                              </div>
                             
                            </div>
                            <div className="row">
                              <div className="col-lg-3 py-3">
                                <div className="statbox">
                                  <label className="fw-bold">Customer Name</label>
                                  <p className="pb-0 mb-1">Shubhanshu Gupta</p>
                                </div>
                              </div>
                              <div className="col-lg-3 py-3">
                                <div className="statbox">
                                  <label className="fw-bold">Ship To:</label>
                                  <p className="pb-0 mb-0">Nashcards</p>
                                  <p className="pb-0 mb-0">2491 N Mt. Juliet Rd</p>
                                  <p className="pb-0 mb-0">PO Box 439</p>
                                  <p className="pb-0 mb-0">Mt. Juliet, TN 37121</p>
                                </div>
                              </div>
                              <div className="col-lg-3 py-3">
                                <div className="statbox">
                                  <label className="fw-bold">Order Details:</label>
                                  <p className="pb-0 mb-0"><b>Order No: </b> SP-1234</p>
                                  <p className="pb-0 mb-0"><b>Order Date: </b> 03/31/2023</p>
                                  <p className="pb-0 mb-0"><b>Ship Date: </b> ________________</p>
                                  <p className="pb-0 mb-0"><b className="text-white">Ship Date: </b>( Intended Date )</p>
                                </div>
                              </div>
                              <div className="col-lg-3 py-3">
                                <div className="statbox">
                                  {/* <label className="fw-bold">Box Inside Details:</label> */}
                                  <Table className="table-bordered mt-1 mb-1 t01">
                                   <tbody>
                                   <tr>
                                      <th>No. of order in box</th>
                                      <th>No. of cards in box</th>
                                    </tr>
                                    <tr>
                                      <td>10</td>
                                      <td>200</td>
                                    </tr>
                                   </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 py-3">
                                <div>
                                  {/* <label className="fw-bold">Box Inside Details:</label> */}
                                  <Table className="table-bordered mt-1 mb-1 t01">
                                   <tbody>
                                    <tr>
                                       <th>Service Level</th>
                                       <th>Total Cards Logged*</th>
                                       <th>Price/card</th>
                                       <th>Total Price of Cards</th>
                                     </tr>
                                     <tr>
                                       <td>10</td>
                                       <td>20</td>
                                       <td>20</td>
                                       <td>400</td>
                                     </tr>
                                   </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <p>Each order needs a packing list. If shipping multiple orders in same package, please provide multiple packing lists. Failure to do so could increase processing time. </p>

                              <p>
                              *If total cards of order and total cards logged are not equal, you may have logged more/less from your original input. Please note that cards not logged will incur a servicing charge. Additionally, please note that your cards logged list are the cards we are expected. Nashcards is NOT responsible for cards not listed on the original card list. s
                              </p>
                            </div>

                        </div>
                    </div>
                </div>
             </div>
         </>
    )
    }
     export default vieworder;