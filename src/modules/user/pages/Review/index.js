import React, { useState } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./riview.css";
import Userprofile from "../../../../assets/images/rectangle-user-icon.png"

const review=()=>{

   const [companyname, setcompanyname]=useState("");
   const [catdtype, setcardtype]=useState("");
   const [comments, setcomments]=useState("");
   const [agree, setagree]=useState("");
   const userid =localStorage.getItem('userid');

   const handleonchange=(p)=>{
      const txtcomments= p.target.value;
      setcomments(txtcomments);
   }

   const onServiceLevelDDL=(e)=>{
      var index = e.target.selectedIndex;  
      if(index>0)
      {
         const dname=e.target[index].text;
         setcardtype(dname);
         alert(dname);
      } 
      else
      {
         alert("Please select Card Type")
      }
      
   }

   const handlegrcompanychange= async(evt)=>{
      let grcmpname=evt.target.value;
      grcmpname=grcmpname.toUpperCase();
      setcompanyname(grcmpname);
   }

   const submitreview= async()=>{
      let newreviewid = '';
      const characters = '0123456789';
      const charactersLength = 5;
      let counter = 0;
      while (counter < 5) {
         newreviewid += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;}
        let reviewPrefix=companyname;
        reviewPrefix=reviewPrefix.slice(0,3);
        newreviewid=reviewPrefix+ "-" + newreviewid;
        if(companyname && comments && catdtype !=null)
        {
          let result = await fetch('http://localhost:5000/submitreview', {
            method: 'post',
            body: JSON.stringify({ 
              "userid": userid,
              "reviewid": newreviewid,
              "companyname": companyname,
              "cardtye": catdtype,
              "comment": comments,
              "isactive": true
             }),
             headers: {
                'content-type': 'application/json'
            },
         });
         alert("Your Card has been submitted for Review. We will send you the mail very soon");
        }
        else
        {
          alert("All Fields Are Mandatory");
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
                         <div className="Topl mb-3">
                            <span className="heading-level-2">Welcome to Memphis Review! </span>
                         </div>
                       </div>
                       <div className="row mb-3">
                         <div className="col-lg-6">
                            <div className="form-group">
                               <label className="fw-bold mb-2">Grading company Select</label>
                               <ul className="list-inline">
                                  <li className="list-inline-item">
                                  <input id="r11" type="radio" name="radio" value="SGC" onChange={handlegrcompanychange}></input>
                                         <label htmlFor="r11" className="ml-10" > SGC</label>
                                  </li>
                                  <li className="list-inline-item">
                                  <input id="r22" type="radio" name="radio" value="PSA" onChange={handlegrcompanychange}></input>
                                         <label htmlFor="r22" className="ml-10"> PSA</label>
                                  </li>
                                  <li className="list-inline-item">
                                  <input id="r3" type="radio" name="radio" value="Beckett" onChange={handlegrcompanychange}></input>
                                         <label htmlFor="r3" className="ml-10"> Beckett</label>
                                  </li>
                                  <li className="list-inline-item">
                                  <input id="r4" type="radio" name="radio" value="Best Option" onChange={handlegrcompanychange}></input>
                                         <label htmlFor="r4" className="ml-10"> Best Option</label>
                                  </li>
                                  
                               </ul>
                            </div>
                         </div>
                         <div className="col-lg-6">
                            <div className="form-group">
                                <label className="mb-2 fw-bold">Would you like to log your cards?</label>
                                 <select className="form-control " onChange={onServiceLevelDDL}>
                                    <option value="0" name="select">Select Card Types</option>
                                    <option value="1" name="select">Log Cards</option>
                                    <option value="2" name="select">Do Not Log Cards</option>
                                 </select>
                            </div>
                        </div>
                        
                       </div>
                       <div className="row mb-3">
                         <div className="col-lg-12">
                            <div className="form-group">
                               <label className="fw-bold mb-2">Comments for Reviewers</label>
                               <textarea  className="form-control height200" value={comments} onChange={handleonchange} ></textarea>
                            </div>
                         </div>
                       </div>
                       <div className="row">
                         <div className="col-lg-12">
                            <div className="form-group">
                               <label className="fw-bold mb-2">Agreement of Terms</label>
                               <p>
                               By selecting "Do Not Log Cards" not logging cards to the order, customer agrees to not contesting the contents of your order. Additionally, customer agrees to forfeit right to contest declared value and/or declared value. Our reviewer’s results will be sent to you. Any cards that pass review will be put in appropriate service levels. Upon customers approval of review, customer agrees to the grading charges for appropriate grading company levels. 
                               </p>
                               <input type="checkbox" id="chk1" name="terms and condition" value="1"></input>
                               <label Htmlfor="chk1" className="ml-10"> Yes, I agree</label><br></br>
                            </div>
                         </div>
                       </div>
                       <div className="row mt-3">
                         <div className="col-lg-12">
                            <div className="form-group">
                                 <button type="submit" className="submitbtn" onClick={submitreview}>Submit For Review</button>
                            </div>
                         </div>
                      </div>
                    </div>
                </div>
            </div>
     </div>
    )
}
export default review;