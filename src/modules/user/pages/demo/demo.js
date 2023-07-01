import React, { useState } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./demo.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormData from "form-data";
import Axios from "axios";


const demo = () =>
{
    const notify = () => toast.success("New Order Has Been Created!");
    const notifyalert = () => toast.error("Please fill all the details");
    const navigate = useNavigate();
    const sucessMessage=(e)=>toast.success(e);
    const userid =localStorage.getItem('userid');
    const [file,setFile] = useState(null);
    const [newfile,setnewFile] = useState(null);


    const handleFileSubmitUserMassUpload = (e)=>{
        e.preventDefault();  
        if (newfile !== null) {			
          console.log(file);
          let formValue = new FormData();
          formValue.append("file", newfile);
          formValue.append("userid",5549);
          formValue.append("orderid","SG-00132");
          
          Axios.post("http://localhost:5000/userUpload", formValue, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((res) => {
            
            let count=341;
            sucessMessage( count + " Rows Uploaded Sucessfully ");
          });
        } else {
          alert("Select a valid file.")
        }
    };


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

            <div className="container-fluid ">
                 <div className="row">
                    <div className="col-lg-2 noleftrightpadding">
                        <UsidePanel></UsidePanel>
                     </div>
                    <div className="col-lg-10 noleftrightpadding">
                      <Uheader></Uheader>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="Dashboardsec box-shadow">
                                  <div className="Topl">
                                     <span className="heading-level-2">
                                       Mass Log Upload
                                     </span>
                                     <div className="form-group">
                                       <p className="mt-4 mb-4">
                                       <form onSubmit={handleFileSubmitUserMassUpload}>
                                          <input type="file" name="file" required className="mb-4"  onChange={(e)=>setnewFile(e.target.files[0])} ></input>
                                       
                                         <div className="row">
                                          <div className="col-lg-12">
                                            <button type="submit" className="submitbtn">Upload Mass User Data </button>
                                          </div>
                                          
                                         </div>
                                        </form>
                                        </p>
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

export default demo;

