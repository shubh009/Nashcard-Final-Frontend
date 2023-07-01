import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import {  BiMessageEdit } from "react-icons/bi";
import "./adash.css";

const index=()=>{

    const [userinfo, setUserinfo]=useState([]);
    const navigate = useNavigate();
    const [editStatus, seteditStatus]=useState([]); 
    const [selectedStatus, setselectedStatus]=useState("");

    const orderDetails = async (uid, orderid, grname)=>{
      const upid=uid;
      const odid=orderid;
      const Grname=grname;

      localStorage.setItem('aUdetailsId', uid);
      localStorage.setItem('aUorderid', odid);
      localStorage.setItem('aGradingCompanyName', Grname)

      navigate("/admin/order-details");
       

    }

    const bindorderStatus= async()=>{
      let response = await fetch('http://localhost:5000/getorderStatus/', {
          method: 'get',
          headers: {
                    'content-type': 'application/json'
                  },
          });
          response = await response.json();
          
          if (response) {
            console.log(response);
            seteditStatus(response);
            }
            else
            {
               alert("Order Status not found"); 
            }
    }

    const handelChange = async(e)=>{
      const index = e.target.selectedIndex;
      const dname=e.target[index].text;
      setselectedStatus(dname);

      let result;
         result = await fetch("http://localhost:5000/getadminfilterorderlist/", {
                method: "POST",
                body: JSON.stringify({
                  orderStatus:dname
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json();
            console.log(result);
            if(result)
            {
              setUserinfo(result);
            }
            else
            {
              alert("No Record Found")
            }


    }

    const getorderlist=async ()=>{
      let result;
         result = await fetch("http://localhost:5000/getadminorderlist/", {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json();
            console.log(result);
            if(result)
            {
                setUserinfo(result);
            }
            

    }

    useEffect(()=>{
        getorderlist();
        bindorderStatus();
    }, [])


    return(
        <div className="container-fluid " id="admin">
        <div className="row">
           <div className="col-lg-2 noleftrightpadding">
               <UsidePanel></UsidePanel>
            </div>
           <div className="col-lg-10 noleftrightpadding">
               <Uheader></Uheader>
               <div className="col-lg-12 my-4 px-4">
                 <ul className="list-inline">
                  <li className="list-inline-item">
                     <div className="admintopmenu">
                        <Link to="#">Card Logged</Link>
                      </div>
                  </li>
                  <li className="list-inline-item">
                     <div className="admintopmenu">
                        <Link to="#">Please Review</Link>
                      </div>
                  </li>
                  <li className="list-inline-item">
                     <div className="admintopmenu">
                        <Link to="#">Cards Received Investigate</Link>
                      </div>
                  </li>
                
                  
                  <li className="list-inline-item">
                     <div className="admintopmenu">
                        <Link to="#">MTJ Paid Locals Waiting Pickup</Link>
                      </div>
                  </li>
                 
                 
                

                 </ul>
               </div>
               <div className="Dashboardsec box-shadow helpform">
                    <div className="row">
                       <div className="col-lg-4">
                       <div className="Topl">
                            <span className="heading-level-2">Admin Order Dashbaord</span>
                        </div>
                       </div>
                       <div className="col-lg-8 float-end">
                          <div className="form-group float-end">
                             {/* <label>Filter BY</label> */}
                             <ul className="list-inline list-unstyled">
                             {/* <li className="list-inline-item"> Filter By </li> */}
                             <li className="list-inline-item"> 
                             <select name="ServiceLevel" id="ServiceLevel" className="form-control" onChange={handelChange}>
                                       <option value="0" name="select">Order List Filter By</option>
                                       {
                                          editStatus.map(Odstatus=>(
                                          <option value={Odstatus._id} key={Odstatus._id}  
                                          name="select">{Odstatus.status}</option>
                                            ))                      
                                       }
                                       {/* <option value="1" key="ddl name">Awating Card List</option>
                                       <option value="2">Card List Sent Via CSV</option>
                                       <option value="3">Awating Cards</option>
                                       <option value="4">Cards Recived By Nashcard</option>
                                       <option value="5">Card Sent To PSA</option>
                                       <option value="3">Cards Recived By PSA</option>
                                       <option value="3">Gardes Popped</option>
                                       <option value="3">Customer Invoice</option>
                                       <option value="3">Order Total = 0</option>
                                       <option value="3">No Email Orders</option>
                                       <option value="3">PSA Sub# is 0</option>
                                       <option value="3">No Connected EMail</option>
                                       <option value="3">Paid Orders</option>
                                       <option value="3">Awating Invoice</option>
                                       <option value="3">Sent to PSA, 0 Card QTY</option>
                                       <option value="3">No Card List</option> */}
                                     </select>
                             </li>
                           </ul>
                          </div>
                          
                       </div>
                       <div className="mt-2 main-card">
                       <Table striped bordered hover>
                                  <thead>
                                      <tr>
                                          <th className="w80">Order#</th>
                                          <th className="w220">Customer Name</th>
                                          <th className="w350">Pickup-Dropoff Info</th>
                                          <th className="w250">Service Level</th>
                                          <th className="w80">PSA Sub#</th>
                                          <th className="w150">Insurance AMT</th>
                                          <th className="w150">Order Total</th>
                                          <th className="w150">Total Cards</th>
                                          <th className="w220">Status</th>
                                          <th className="w220">Pickup/Dropoff Location</th>
                                          <th className="w350">Email</th>
                                          <th className="w80">CSV</th>
                                          <th className="w150">PSA Status</th>
                                          <th>Edit</th>       
                                      </tr>
                                      {
                                      
                                      userinfo.map((unifo, index) => (
                                             <>
                                                 {
                                                   unifo.orders.map((porders, index)=>{
                                                       return(
                                                        <tr key={porders._id}>
                                                          <td key={porders._id}> <span>{porders.orderid}</span></td>
                                                          <td>{unifo.name}</td>
                                                          <td>
                                                            {
                                                            porders.localpickup===1
                                                            ? <label>Yes, I'll drop and pickup my cards</label>
                                                             : <label>No, I will Mail Them</label>
                                                            }
                                                            </td>
                                                          <td>{porders.servicelevel}</td>
                                                          <td>{porders.PSASub}</td>
                                                          <td>{porders.insuranceammount}</td>
                                                          <td>{porders.TotalPrice}</td>
                                                          <td>{porders.cardcount}</td>
                                                          <td>{porders.orderStatus}</td>
                                                          <td>{porders.DropoffLocation}</td>
                                                          <td>{unifo.email}</td>
                                                          <td></td>
                                                          <td></td>
                                                          <td className="bg-primary">
                                                            <button className="edit-btn" onClick={()=>orderDetails(porders.userid, porders.orderid, porders.grcompanyname)}><BiMessageEdit></BiMessageEdit></button>
                                                          </td>

                                                        </tr>
                                                       )
                                                    })
                                                   
                                                 }
                                                 
                                          
                                            </>
                                             
                                        

                                        ))}
                                  </thead>
                        </Table>
                       </div>
                    </div>
                </div>
           </div>
        </div>
       </div>
    )
}

export default index