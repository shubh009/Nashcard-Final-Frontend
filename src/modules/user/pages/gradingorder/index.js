import React, { useState } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./gradingstyle.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';

const index = () =>
{
    const notify = () => toast.success("New Order Has Been Created!");
    const notifyalert = () => toast.error("Please fill all the details");

  //Manage States For Select Dropdowns//
  const [serviceLevelvalue, setServiceLevelvalue]=useState('');
  const [acceptyears, setAcceptyears]=useState('');
  const [acceptDvValue, setAcceptDvValue]=useState('');
  const [pricePerCard, setpricePercard]=useState('');
  const [servicelevel, setServicelevel]=useState('');
  const [servicelevelList,setServicelevelList]=useState([{
    'servicelevel' : "", 
    'servicelevelid' : "" 
  }]);
  
  const navigate = useNavigate();
  let dname="";
  const userid =localStorage.getItem('userid');


  //Manage textbox States
  const [cardsCount, setCardCount]=useState(""); 

  //Manage states for radiobutton
  const [selectedRb, setSelectedRb] = useState("");
  const [grcompanyname, setGrcompanyName]=useState('');

  //Manage States For Validations
  const[ErrorCountTextbox, setErrorCountTextbox]=useState(false);

  //Manage State to get the gradeList in Popup
   //const [gradeList, setgradeList]=useState([]);

  //Event to hnadle radiobutton on change
  const handleRbOnchange=(ev)=>{
    const localpickup=ev.target.value;
    setSelectedRb(localpickup);
  }

  const handlegrcompanychange= async(evt)=>{
    let grcmpname=evt.target.value;
    grcmpname=grcmpname.toUpperCase();
    setGrcompanyName(grcmpname);

    let response = await fetch('http://localhost:5000/getservicelevel/'+grcmpname, {
                    method: 'get',
                    headers: {
                        'content-type': 'application/json'
                    },
                });
                response = await response.json();
               
                if (response) {
                    setServicelevelList(response);
                    console.log(servicelevelList);
                }
                else
                {
                  alert("Servie Level not found"); 
                }


  }



  //Event to card Count textbox

  const handleonchange=(p)=>{

    //const cardcount=p.target.value.replace(/\D/g, '');
    const cardcount= p.target.value;
    const numberRegEx = /^[0-9\b]+$/;
    const result=numberRegEx.test(cardcount);
    setCardCount(cardcount);
    if(result)
    {
      
      setErrorCountTextbox(false);
    }
    else
    {
      setErrorCountTextbox(true);
    }

  }

  //-----code to manage service Level dropdown------//

  const onServiceLevelDDL=(e)=>{
     var index = e.target.selectedIndex;
     const dvalue=e.target.value;
     dname=e.target[index].text;
     setServicelevel(dname);
     setServiceLevelvalue(dvalue);
     if(dvalue==1)
     {
        setAcceptDvValue("$2499");
        setpricePercard("20");
        setAcceptyears("All years");
        console.log("inside if")
     }
     else if(dvalue==2)
     {
      setAcceptDvValue("$3499");
      setpricePercard("40");
      setAcceptyears("All years");
     }
     else if(dvalue==3)
     {
      setAcceptDvValue("$1499");
      setpricePercard("10");
      setAcceptyears("All years");
     }
     else if(dvalue==0)
     {
       setAcceptyears("");
       setAcceptDvValue("");
       setpricePercard("");
     }
  }
  //-----code to manage service Level dropdown------//

  //code to button submit & save values

  const CreateGradingorder = async (event) => {

    event.preventDefault();
    if(serviceLevelvalue!=="" && cardsCount!=="" && selectedRb!=="")
    {
      //code to generate random orderid
       let neworderid = '';
       const characters = '0123456789';
       const charactersLength = 5;
       let counter = 0;
       while (counter < 5) {
         neworderid += characters.charAt(Math.floor(Math.random() * charactersLength));
         counter += 1;}

         let orderPrefix=grcompanyname;
         orderPrefix=orderPrefix.slice(0,2);
         neworderid=orderPrefix+ "-" + neworderid;

        // alert(neworderid);
        const cert= null
        const grade= null
        const description= null
        const gradeDate= null
      

      let result = await fetch('http://localhost:5000/order', {
                    method: 'post',
                    body: JSON.stringify({ 
                      "userid": userid,
                      "orderid": neworderid,
                      "grcompanyname": grcompanyname,
                      "servicelevel": servicelevel, 
                      "cardcount": cardsCount, 
                      "localpickup": selectedRb,
                      "orderType": "Grading Order",
                      "totaldv": 4500, 
                      "insuranceammount": 0,
                      "pricepercard":pricePerCard,
                      "calculatedtotalcard":0,
                      "isactive" : true, 
                      "caculatedinsurancecost": 0,
                      "TotalPrice": 0,
                      "RevewCardFee": 0,
                      "ShippingFee":0,
                      "textmessagealert":1234567890,
                      "userid": userid,
                      "isordercomplete": false,
                      "orderStatus": "Awating Card List",
                      "SGCphotoid": 0,
                      "NonLoggedCardCount":0,
                      "LoggedCardCount":0,
                      "cardsaverqty":0,
                      "cardsaverprice":0,
                      "PSASub":0,
                      "PSAUpcharge":0,
                      "CustomerCSV":false,
                      "DropoffLocation": "No Location",
                      "paymentlink": "No Link",
                      "autographcount":0,
                      "isorderpaid":false,
                      "Gardespopdate": gradeDate,
                      "CardrecivedDate": gradeDate,
                      "CardsenttoPSADate": gradeDate,
                      "CustomerInvoicedDate": gradeDate,
                      "Orderconfirmed": gradeDate,
                      grades: [
                        {
                          orderid: null,
                          cert: cert,
                          grade: grade,
                          description: description,
                          PSAsub: null,
                          poppedDate: gradeDate,
                          PSAUpchargeAmmount: null,
                          frontImage:null,
                          backimage:null

                        }
                      ]                  
                    }),
                    headers: {
                        'content-type': 'application/json'
                    },
                });
                result = await result.json();
                if (result) {
                    notify();
                    //alert("New Order Has Been Created");
                    localStorage.setItem('Porderid', neworderid);
                    navigate("/user/add-card");
                }
    }
    else
    {
      notifyalert();
    }
  }

  //code to button submit & save values
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
                        <div className="Dashboardsec box-shadow">
                            <div className="row">
                                <div className="Topl">
                                 <span className="heading-level-2">Create New Grading Order</span>
                                </div>

                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                              <div className="grdeScreenouter">
                                <div className="form-data">
                                   <form>                           
                                   <div className="form-group">
                                      <label className="fw-bold mb-0">Grading company Select</label>
                                       <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <input id="r11" type="radio" name="radio" onChange={handlegrcompanychange} value="SGC"></input>
                                                <label htmlFor="r11" className="ml-10" > SGC</label>
                                              </li>
                                               <li className="list-inline-item">
                                                  <input id="r22" type="radio" name="radio" onChange={handlegrcompanychange} value="PSA"></input>
                                                  <label htmlFor="r22" className="ml-10"> PSA</label>
                                                 </li>
                                                <li className="list-inline-item">
                                                  <input id="r3" type="radio" name="radio" onChange={handlegrcompanychange} value="Beckett"></input>
                                                   <label htmlFor="r3" className="ml-10"> Beckett</label>
                                                </li>
                                        </ul>
                                    </div>
                    

                                   <div className="form-group">
                                    <label>Choose Service Level</label>
                                    <select name="ServiceLevel" id="ServiceLevel" className="form-control" onChange={onServiceLevelDDL}>
                                       <option value="0" name="select">Select Service Level</option>
                                      
                                      {
                                         servicelevelList.map(svlist=>(
                                           <option value={svlist.servicelevelid} key={svlist.servicelevelid} name="select">{svlist.servicelevel}</option>
                                         ))
                                          
                                      }
                                      
                                      
                                      
                                       {/* <option value="1" key="ddl name">PSA - Regular</option>
                                       <option value="2">PSA - Express</option>
                                       <option value="3">Sec - Express</option> */}
                                     </select>
                                   </div>
                                   <div className="form-group">
                                    <label>How Many Cards</label>
                                    <input type="text" value={cardsCount} onChange={handleonchange} className="form-control" ></input>
                                    <p className="mt-2">This is just an estimate for now. your total cards will be calculated once your cards are logged.</p>
                                    {ErrorCountTextbox? <label className="text-danger">No iS Invalid</label>: ""}
                                   </div>
                                   <div className="form-group">
                                    <label>Local Pickup/Drop Off?</label>
                                    <div>
                                        <ul className="list-unstyled">
                                        <li>
                                          <input id="r1" type="radio" name="radio" value="1" onChange={handleRbOnchange}></input>
                                         <label htmlFor="r1">Yes, I'll drop off and pickup my cards</label>
                                         </li>
                                        <li>
                                          <input id="r2" type="radio" name="radio" value="2" onChange={handleRbOnchange}></input>
                                          <label htmlFor="r2">No, I'll mail them</label>
                                        </li>
                                        </ul>
                                      </div>
                                   
                                   </div>
                                   <div className="form-group">
                                        <button type="submit" onClick={CreateGradingorder} className="submitbtn">Create Order & Log Cards</button>
                                   </div>

                                   </form>
                                </div>

                              </div>

                              </div>
                              <div className="col-lg-6">
                                <div className="right-content">
                                  <div className="disable-form">
                                    <label className="heading-level-3">Please review the year and DV Values: </label>

                                    <div className="row mt-4">
                                        <div className="col-lg-4">
                                        <div className="form-group">
                                        <label>Accepted Years</label>
                                        <input type="text" className="form-control" value={acceptyears}  disabled ></input>
                                      </div>
                                        </div>
                                        <div className="col-lg-4">
                                        <div className="form-group">
                                        <label>Accepted DV</label>
                                        <input type="text" className="form-control " disabled  value={acceptDvValue}></input>
                                      </div>
                                        </div>
                                        <div className="col-lg-4">
                                        <div className="form-group">
                                        <label>Price Per Card</label>
                                        <input type="text" className="form-control " value={pricePerCard} disabled></input>
                                      </div>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="highlightbox">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <label className="heading-level-3">Review is back</label>
                                            <p>Need cards reviewed? What a professional opinion?</p>
                                        </div>
                                        <div className="col-lg-5 float-end">
                                            <Link to="#" className="highlightbtn"> Create Review</Link>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="highlightbox">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <label className="heading-level-3">Review is back</label>
                                            <p>Need cards reviewed? What a professional opinion?</p>
                                        </div>
                                        <div className="col-lg-5 float-end">
                                            <Link to="#" className="highlightbtn"> Create Review</Link>
                                        </div>
                                    </div>
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
export default index
