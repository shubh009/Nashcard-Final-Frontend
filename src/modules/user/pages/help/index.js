import React, { useState } from "react"
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./help.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const index =()=>
{
    const [querytopic, setquerytopic]=useState("");
    const [qtitle, setqtitle]=useState("");
    const [comments, setcomments]=useState("");
    const userid =localStorage.getItem('userid');

    const showToast = () => {
        toast.success("I'm never gonna toast you!");
         };
    
    const notify = () => toast.success("Your query has been send to our customer care executive!");
    const notifyalert = () => toast.error("Please fill all the details");
    const formclear = () => toast.success("Form has been cleared");


    const onServiceLevelDDL=(e)=>{
        var index = e.target.selectedIndex;  
        if(index>0)
        {
           const dname=e.target[index].text;
           setquerytopic(dname);
           alert(dname);
        } 
        else
        {
           alert("Please select Card Type")
        }
     }

     const handleonchange=(p)=>{
        const txtcomments= p.target.value;
        setcomments(txtcomments);
     }
     
     const handleonchangetitle=(p)=>{
        const txttitle= p.target.value;
        setqtitle(txttitle);
     }

    const postQuestions=async()=>{
        if(querytopic && qtitle && comments !=null)
        {
          let result = await fetch('http://localhost:5000/addhelp', {
            method: 'post',
            body: JSON.stringify({ 
              "userid": userid,
              "qtopic": querytopic,
              "qtitle": qtitle,
              "comment": comments,
              "isactive": true
             }),
             headers: {
                'content-type': 'application/json'
            },
         });
         setqtitle("");
         setcomments("");
         notify();
        //  alert("Your Question has been send to our customer care executive.");
        }
        else
        {
            notifyalert();
        }

        
    }

    return(
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
  <div className="container-fluid ">
                 <div className="row">
                    <div className="col-lg-2 noleftrightpadding">
                        <UsidePanel></UsidePanel>
                     </div>
                    <div className="col-lg-10 noleftrightpadding">
                        <Uheader></Uheader>
                  
                     
                        <div className="Dashboardsec box-shadow helpform">
                            <div className="row">
                                <div className="Topl">
                                   <span className="heading-level-2">Any Questions? Please Ask</span>
                                </div>
                            </div>
                            <div className="row mt-4 mb-2">
                             <div className="col-lg-5">
                              <label className="heading-level-4 mb-2" >Query Topic</label>
                              <select className="form-control" onChange={onServiceLevelDDL}>
                                <option value="0" name="select"> Select Topic</option>
                                <option value="1" name="select"> Grading Order</option>
                                <option value="2" name="select"> Grading Process</option>
                                <option value="3" name="select"> Payment Issue</option>
                                <option value="4" name="select"> Grading Level</option>
                                <option value="5" name="select"> Review Order</option>
                                <option value="6" name="select"> Review Process</option>
                              </select>
                             </div>
                            

                             <div className="col-lg-7">
                              <label className="heading-level-4 mb-2">Query Title</label>
                              <input type="text" className="form-control" value={qtitle} onChange={handleonchangetitle}></input>
                              
                             </div>
                            </div>
                            <div className="row mt-4 mb-4">
                               <div className="col-lg-12">
                               <label className="heading-level-4 mb-2">Comments</label>
                                <textarea className="form-control textarea" value={comments} onChange={handleonchange}></textarea>
                               </div>
                            </div>
                            <div className="row mt-4 mb-4">
                            <div className="col-lg-6">
                              <button className="btn btn-outline-primary w-100 height-theme" onClick={formclear}> Clear Form</button>
                              </div>
                              <div className="col-lg-6">
                              <button type="submit" className="submitbtn"onClick={postQuestions}> Post Your Question...</button>
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