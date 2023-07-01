import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import ProfileIcon from "../../../../assets/images/rectangle-user-icon.png";
import './dashboard.css';
import { RxPlusCircled } from "react-icons/rx";
import Table from 'react-bootstrap/Table';

const dashboard = () =>
{

    const userid=localStorage.getItem("userid");
    const name=localStorage.getItem("name");

    const [orderdata, setorderdata]=useState([]);
    const [dataerror, setDataerror]=useState(true);
    const [isordercomplete, setisisordercomplete]=useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        gOrderList();
    }, [])

    const gOrderList= async ()=>{
        let result = await fetch("http://localhost:5000/orders/"+userid, {
                method: "POST",
                body: JSON.stringify({ 
                    userid:userid,
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json();
            if(!result.isEmpty)
            {
                console.log(result);
                setDataerror(true);
                setorderdata(result.orders);
            }
            else
            {
                setDataerror(false);
            }
    }

    const resumeOrder=(orderid)=>{
        localStorage.setItem('Porderid', orderid);
        navigate("/user/add-card");
    }


  
   
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2 noleftrightpadding">
                        <UsidePanel></UsidePanel>
                     </div>
                    <div className="col-lg-10 noleftrightpadding">
                        <Uheader></Uheader>
                        
                        <div className="Dashboardsec2 box-shadow">
                            <div className="row">
                                <div className="col-lg-3 ">
                                    <div className="profileI float-start">
                                        <img src={ProfileIcon} width="100%"></img>
                                    </div>
                                    <div className="mt-1 ml-10 float-start mx-2">
                                        <label>Welcome Back</label>    
                                       <h3 className="fw-bold mb-0">{name}</h3>
                                    </div>
                                </div>

                               
                                <div className="col-lg-9 float-end">
                                   
                                   <div className="row">
                                      <div className="col-lg-8 float-end">
                                         
                                      </div>
                                      <div className="col-lg-4">
                                      <button type="button" className="submitbtn">
                                             Create New Order
                                            </button>
                                      </div>
                                   </div> 
                                </div>
                            </div>
                        </div>

                        <div className="right-panel box-shadow">
                            <div className="row">
                               <div className="Topl">
                                 <span className="heading-level-2">My Orders</span>
                                </div>
                                
                                <div className="right-content mt-3">
                                 
                                {
                                  dataerror? 
                                  <Table striped bordered hover>
                                  <thead>
                                      <tr>
                                          <th>Order#</th>
                                          <th>Company Name</th>
                                          <th>Service Level</th>
                                          <th>Status</th>
                                          <th>Total Cards</th>
                                          <th>View Grades</th>
                                          <th>Payment Link</th>
                                          <th>Order Details</th>
                                      </tr>

                                      {orderdata.map((order) => (
                                         
                                          <tr key={order._id}>
                                              <td>{order.orderid}</td>
                                              <td>{order.grcompanyname}</td>
                                              <td>{order.servicelevel}</td>
                                              <td>{order.orderStatus}</td>
                                              <td>{order.cardcount}</td>
                                              <td><Link to="#" className="text-dark">Grade Link</Link> </td>
                                              <td><Link to="#" className="text-dark">Payment Link</Link></td>
                                              <td>
                                                {
                                                order.isordercomplete?  
                                                <button type="submit" className="btn btn-outline-danger"> Order Details</button>:
                                                <button type="submit" className="btn btn-outline-primary" onClick={()=>resumeOrder(order.orderid)}> Resume Order</button>
                                                }
                                              </td>
                                          </tr>
                                          
                                          ))}

                                      {/* <tr>
                                          <td>order id</td>
                                          <td>order id</td>
                                          <td>order id</td>
                                          <td>order id</td>
                                          <td>order id</td>
                                          <td>order id</td>
                                          <td>order id</td>
                                          <td>order id</td>
                                      </tr> */}
                                  </thead>
                                  </Table>
                                   : 
                                   <p className="text-danger heading-level-3">
                                        No  Grading Order Record Found In Collections
                                     </p>
                                }
                                 
                               </div>

                             </div>   
                        </div>


                    </div>
                </div>
            </div>

            
        </>
    )
}
export default dashboard;