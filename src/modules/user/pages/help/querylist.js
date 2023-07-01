
import React, { useState, useEffect } from "react"
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./help.css";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

const queryList=()=>
{

    const userid=localStorage.getItem("userid");
    const [orderdata, setorderdata]=useState([]);
    const [dataerror, setDataerror]=useState(false);

    useEffect(()=>{
        GetPostList();
    }, [])


    const GetPostList=async ()=>{
        let result = await fetch("http://localhost:5000/gethelplist/", {
            method: "POST",
            body: JSON.stringify({ 
                userid:userid,
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        result=Array.of(result);
        if(result)
        {
            console.log(result);
            setDataerror(false);
            setorderdata(result[0]);  
        }
        else
        {
            setDataerror(true);
        }
    }

    return(
        <div className="container-fluid ">
             <div className="row">
                   <div className="col-lg-2 noleftrightpadding">
                           <UsidePanel></UsidePanel>
                   </div>
                   <div className="col-lg-10 noleftrightpadding">
                       <Uheader></Uheader>
                       <div className="Dashboardsec box-shadow">
                         <div className="row orer-details">
                         <div className="row orer-details">
                           <div className="col-lg-6">
                             <div className="Topl mb-3">
                               <span className="heading-level-2">Your Query List </span>
                             </div>
                           </div>
                           <div className="col-lg-6 float-end">
                             <div className=" mt-2 float-end">
                               <Link to="/user/submit-review" className="submitbtn">Post New Query</Link>
                             </div>
                           </div>
                           
                           
                            
                          </div>
                          </div>
                        
                        <div className="row mt-3">
                         {
                           dataerror?
                           <label className="text-danger">Now Query Found On Database</label>
                            :
                            <Table striped bordered hover>
                               <thead>
                                 <tr>
                                    <th>Query Topic#</th>
                                    <th>Query Title</th>
                                    <th>Comments</th>
                                   
                                 </tr>
                                 { orderdata.map((post) => (
                                   <tr key={post._id}>
                                    <td>{post.qtopic}</td>
                                    <td>{post.qtitle}</td>
                                    <td>{post.comment}</td>
                                   </tr>
                                  ))}
                               </thead>
                            </Table>
                         }
                        </div>
                       </div>
                   </div>
               </div>
        </div>
       )
}
export default queryList