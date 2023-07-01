import React, { useEffect, useState,  useRef} from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./addcardstyle.css";
import { BiCaretDown, BiMessageEdit, BiPlusCircle } from "react-icons/bi";
import {AiOutlineDelete} from "react-icons/ai"
import {FiUploadCloud} from "react-icons/fi"
import Table from 'react-bootstrap/Table';
import { useNavigate, Link } from "react-router-dom";

//imp note: have to clear order details local storage after completion of order. 

const index =()=>{

    const navigate = useNavigate();
    const orderid=localStorage.getItem('Porderid');
    const userid =localStorage.getItem('userid');
    
    const [updatecardid, setupdatecardid]=useState("");
    
    let newDate = new Date()
    let date = newDate.getDate();
    const ref = useRef(null);

    //Manage states for order preview 1
    const [name, setname]=useState("");
    const[totalpriceofcards, settotalpriceofcards]=useState("");
    const [orderdate, setorderdate]=useState(newDate);
    const [servicelevel, setServiceLevel]=useState("");
    const [totalcardcount, settotalcardcount]=useState("");
    const [totaldv, settotaldv]=useState("");
    const [pricepercard, setpricepercard]=useState("");

    //States for add order textboxes
    const [qty, setqty]=useState(120);
    const [cardyear, setCardyear]=useState(1909);
    const [brand, setbrand]=useState("ABC");
    const [cardnumber, setcardnumber]=useState(1234);
    const [playername, setplayername]=useState("Shubhanshu");
    const [attribute, setattribute]=useState("attr");
    const [ntotalDv, nsettotaldv]=useState(1200);
    const [insuranceamt, setinsuranceamt]=useState("");
    const [trackingno, settrackingno]=useState("");
    const [totalInsAmt, settotalInsAmt]=useState("");
    
    const [showtable, setShowtable]=useState(false);
    const [showorderdetails, setShoworderdetails]=useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    //states to manage log card add and update button
    const [updatebtn, setupdatebtn]=useState(false);


    //States to get set the users card list for that partculer order
    const [cardlistData, setCardlistData]=useState([])


    useEffect(()=>{
        getorderdetails();
        getcardlist();

    }, [])

    const getorderdetails= async ()=>{
        let result = await fetch('http://localhost:5000/getorderdetails', {
                method: "post",
                body: JSON.stringify({ userid:userid }),
                headers: {
                    'content-type': 'application/json'
                }
            });

        result=await result.json();
        
        setname(result.name);
        settotalpriceofcards(result.orders[0].totalprice);
        setServiceLevel(result.orders[0].servicelevel);
        settotalcardcount(result.orders[0].cardcount);
        settotaldv(result.orders[0].totaldv);
        setpricepercard(result.orders[0].pricepercard);
    }
    const getcardlist = async ()=>{
        let result = await fetch('http://localhost:5000/getcardlist', {
                method: "post",
                body: JSON.stringify({ userid:userid }),
                headers: {
                    'content-type': 'application/json'
                }
            });

        result=await result.json();
        console.log(result);
        if(!result.isEmpty)
        {
            setIsEmpty(false);
           setCardlistData(result.cards);
           setShoworderdetails(true);
        }
        else
        {
            setIsEmpty(true);
            // setCardlistData("");

        }
        
        
    }

    const Showtabledata=()=>{
       
        setShowtable(true);
    }

    const totalinsuracecost=()=>{
        const insammount=insuranceamt
        let calculatedInsamount=0;
        if(insammount<=500)
        {
            calculatedInsamount=6;
        }
        else
        {
            const calck=insammount/500;
            calculatedInsamount=calck*6;
            settotalInsAmt(calculatedInsamount);
        }

    }

    const Addnewcard = async (e) => {
        setShowtable(true);
        setShoworderdetails(true);
        totalinsuracecost();
        let result = await fetch('http://localhost:5000/addcard', {
            method: "post",
            body: JSON.stringify({ 
                "userid": userid,
                "orderid": orderid,
                "rowid": 4,
                "qty": qty,
                "cardyear": cardyear,
                "brand": brand,
                "cardnumber": cardnumber,
                "playername": playername,
                "attribute": attribute,
                "totalDV": ntotalDv,
                "insuranceAmt": insuranceamt,
                "trackingno": trackingno
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        
        if(result)
        {   setIsEmpty(false);
            setCardlistData(result.cards);
            setShoworderdetails(true);
            // setqty("");
            // setattribute("");
            // setbrand("");
            // setcardnumber("");
            // setCardyear("");
            // setplayername("");
            // setpricepercard("");
            // settotaldv("");
            //alert("Insurance & Card details has been updated");
        }
        else
        {
            alert("find some issue")
        }
    }

    const FinalOrder = async (e) => {
       
        if (ref.current.checked) {
            alert("Your order has been sucessfully placed. You will get an confirmation email shortly. Thank You")
       
        const uemail="conser.in3@gmail.com";
        let result = await fetch('http://localhost:5000/sendorderemail', {
                method: "post",
                body: JSON.stringify({ uemail }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json();
            navigate("/user/dashbaord");
            //console.log(result);
        }
        else
        {
            ref.current.style.backgroundColor="red";
            alert("Please Agree With the Terms & Conditions")
        }

        
    }

    const deletecard=async(_id)=>{
        let result = await fetch(`http://localhost:5000/dltCards/${_id}`, {
            method: "delete",
            body: JSON.stringify({ userid:userid }),
            headers: {
                'content-type': 'application/json'
               
            }
        });

       result=await result.json();
       getcardlist();
      
    }

    const updateorderfinal=async(orderid)=>{
        let result = await fetch('http://localhost:5000/updateorderfinal/' + orderid, {
            method: "PATCH",
            body: JSON.stringify({ 
                userid:userid, 
                insuranceammount:insuranceamt, 
                textalert:trackingno
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

       result=await result.json();
       if(result)
       {
        alert("Mobile no and insurance has been updated");
       }
    }

    const getcarddetails = async (_id) => {
        //write code here to get function and use filter in result
        
        let result = await fetch('http://localhost:5000/getcarddetails/'+_id, {
            method: "POST",
            body: JSON.stringify({ userid:userid }),
            headers: {
                'content-type': 'application/json'
            }
        });
    result=await result.json();
    
    
     if(!result.isEmpty)
     {
        setupdatebtn(true);
        setqty(result.cards.qty);
        setattribute(result.cards.attribute)
        setplayername(result.cards.playername);
        setbrand(result.cards.brand);
        setcardnumber(result.cards.cardnumber);
        setCardyear(result.cards.cardyear);
        settotaldv(result.cards.totalDV);
        setupdatecardid(result.cards._id);
     }
     else
     {
        setupdatebtn(false);
     }
    }
    
    const updatecarddetails=async(updatecardid)=>{
        
        const id=updatecardid;
        alert(id)
        let result = await fetch('http://localhost:5000/updatecard/' + id, {
            method: "PATCH",
            body: JSON.stringify({ 
                 userid:userid,
                 qty:qty,
                 brand:brand,
                 cardyear:cardyear,
                 playername:playername,
                 attribute:attribute,
                 totalDV:ntotalDv,
                 cardnumber:cardnumber
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

       result=await result.json();
       if(result)
       {
        getcardlist();
        alert("Card Details Information Has Been Updated");
       }
       
    }


    return(
        <>
            <div className="container-fluid ">
                 <div className="row">
                    <div className="col-lg-2 noleftrightpadding">
                        <UsidePanel></UsidePanel>
                     </div>
                    <div className="col-lg-10 noleftrightpadding">
                        <Uheader></Uheader>
                        <div className="Dashboardsec">
                            <div className="row orer-details">
                               <div className="col-lg-8">
                                 <div className="row">
                                 <div className="Topl mb-3">
                                   <span className="heading-level-2">Order Details</span>
                                </div> 
                                    <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="light-text">Order No</label>
                                    <input type="text" className="form-control" disabled value={orderid}></input>
                                </div>

                                    </div>
                                    <div className="col-lg-4">
                             
                                <div className="form-group">
                                    <label className="light-text">Total Price of Cards</label>
                                    <input type="text" className="form-control" value={totalcardcount*pricepercard} disabled></input>
                                </div>
                                    </div>
                                    <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="light-text">Order Creation Date/Time</label>
                                    <input type="text" className="form-control" disabled value={orderdate}></input>
                                </div>

                                    </div>                                
                                 </div>
                                 <div className="row mt-3">
                                 <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="light-text">Service Level</label>
                                    <input type="text" className="form-control" disabled value={servicelevel}></input>
                                </div>

                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-group">
                                          <label className="light-text">Total Card Quantity</label>
                                           <input type="text" className="form-control" disabled value={totalcardcount}></input>
                                         </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                       <div className="form-group">
                                          <label className="light-text">Total DV</label>
                                           <input type="text" className="form-control" disabled value={totaldv}></input>
                                         </div>
                                        <div>

                                        </div>
                                    </div>
                                 </div>
                               </div>
                               <div className="col-lg-1"></div>
                               <div className="col-lg-3">
                                    <div className="theme-highlight-div text-center">
                                        <div className="form-group listt">
                                            <span className="heading-level-4">330$ Per Card</span>
                                        </div>
                                        <div className="form-group listt">
                                            <span className="heading-level-4">All years</span>
                                        </div>
                                        <div className="form-group listt">
                                            <span className="heading-level-4">3 Business Days</span>
                                        </div>
                                        <div className="form-group listt">
                                            <span className="heading-level-4">DV Less Then $2378</span>
                                        </div>
                                    </div>
                               </div>
                            </div>
                           
                           
                        </div>
                        <div className="Dashboardsec box-shadow">
                            <div className="row orer-details">
                            <div className="Topl mb-3">
                                   <span className="heading-level-2">Add Cards</span>
                            </div> 
                            <div className="row">
                                <div className="theme-highlight-div mb-4 text-center">
                                    <div className="form-group mt-4 mb-4">
                                        <Link className="text-theme mb-1 d-block text-decoration-none"><BiPlusCircle></BiPlusCircle> Upload A CSV</Link>
                                        <p className="mb-1">Or</p>
                                        <p className="mb-1">Add match card below indivudaly by filling in all required fields.</p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="row">

                             

                                <div className="col-lg-1">
                                    <div className="form-group">
                                       <label>Qty</label>
                                       <input  onChange={(e)=>setqty(e.target.value)}
                                       type="text" className="form-control" value={qty}
                                       ></input>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="form-group">
                                       <label>Card year</label>
                                       <input type="text" className="form-control"
                                        onChange={(e)=>setCardyear(e.target.value)}
                                        value={cardyear}></input>
                                    </div>
                                </div>
                                <div className="col-lg-1">
                                    <div className="form-group">
                                       <label>Brand</label>
                                       <input type="text" className="form-control" 
                                       onChange={(e)=>setbrand(e.target.value)}
                                       value={brand}></input>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="form-group">
                                       <label>Card Number</label>
                                       <input type="text" className="form-control" 
                                       onChange={(e)=>setcardnumber(e.target.value)}
                                       value={cardnumber}></input>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="form-group">
                                       <label>Player Name</label>
                                       <input type="text" className="form-control" 
                                       onChange={(e)=>setplayername(e.target.value)}
                                       value={playername}></input>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="form-group">
                                       <label>Attributes/SN</label>
                                       <input type="text" className="form-control" 
                                       onChange={(e)=>setattribute(e.target.value)}
                                       value={attribute}></input>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="form-group">
                                       <label>Total Declard Value</label>
                                       <input type="text" onChange={(e)=>nsettotaldv(e.target.value)}
                                       className="form-control" value={ntotalDv}></input>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-4 d-block text-center">
                               
                               {
                                updatebtn?
                                <button className="submitbtn d-block mt-4 mt-2" type="submit" 
                                 onClick={()=>updatecarddetails(updatecardid)}>Update Logged Card Details</button>
                                 :
                                 <button className="submitbtn d-block mt-4 mt-2" type="submit" 
                                 onClick={Addnewcard}>Log Card</button>
                               }

                                 

                                  {/* <Link to="#" className="submitbtn d-block mt-4 mt-2">Log Card</Link> */}
                                </div>
                                <div className="col-lg-4"></div>         
                            </div>
                            </div>
                        </div>
                        <div className="Dashboardsec box-shadow">
                            <div className="row orer-details">
                            <div className="Topl mb-3">
                                   <span className="heading-level-2">Your Logged Cards</span>
		                                     {
                                                isEmpty?
                                                <label className="text-danger mt-3 fs-5 fw-semibold">No Card List Found For This Order. Looged Your Card for this order</label>
                                            :
                                                
                                                 <Table striped bordered hover className="mt-3">
                                                 <thead>
                                                 <tr>
                                                   <th>Qty</th>
                                                   <th>Card year</th>
                                                   <th>Brand</th>
                                                   <th>Card Number</th>
                                                   <th>Player Name</th>
                                                   <th>Attributes/SN</th>
                                                   <th>Declared Value</th>
                                                   <th>Edit</th>
                                                   <th>DLT</th>
                                                </tr>
                                               
                                                {cardlistData.map((card) => (
                                                   <tr key={card._id}> 
                                                   <td>{card.qty}</td>
                                                   <td>{card.cardyear}</td>
                                                   <td>{card.brand}</td>
                                                   <td>{card.cardnumber}</td>
                                                   <td>{card.playername}</td>
                                                   <td>{card.attribute}</td>
                                                   <td>{card.totalDV}</td>
                                                   
                                                   <td className="bg-primary text-white text-center font-30"> 
                                                   <button type="submit" onClick={()=>getcarddetails(card._id)}>  <BiMessageEdit></BiMessageEdit></button>
                                                   
                                                   </td>
                                                   <td className="bg-danger text-white text-center heading-level-3 font-30"> 
                                                     <button type="submit" onClick={()=>deletecard(card._id)}>  <AiOutlineDelete></AiOutlineDelete></button>
                                                     
                                                   </td>
                                                   </tr> 
                                                 ))}
                                             </thead>
                                               </Table>
                                          
                                             }
                                  
                            </div> 
                            
                            </div>
                        </div>
                        <div className="Dashboardsec box-shadow">                          
                            <div className="row noleftrightpadding">
                                <div className="col-lg-4  d-block">
                                <div className="Topl mb-3">
                                   <span className="heading-level-2">Add Insurance & Alert</span>
                            </div> 
                                    <div className="form-group">
                                        <label>Amount of Insurance *</label>
                                        <input type="text" className="form-control"
                                         onChange={(e)=>setinsuranceamt(e.target.value)}
                                         value={insuranceamt}
                                        ></input>
                                        <p className="light-text">Please enter the total amount of insurance you would like (i.e. 1,500 and NOT $6)</p>
                                    </div>
                              
                                </div>
                                <div className="col-lg-4">

                                <div className="form-group alert-box">
                                        <label>Text Message Alerts</label>
                                        <input type="text" className="form-control"
                                          onChange={(e)=>settrackingno(e.target.value)}
                                          value={trackingno}
                                        ></input>
                                        <p className="light-text">
                                        add your cell phone to be informed with text message updates
                                        </p>

                                    </div> 
                                
                                </div>
                                <div className="col-lg-4 norightpadding">
                                <div className="theme-highlight-div text-center">
                                        <div className="form-group listt">
                                            <span className="heading-level-4">Return Shipping Once Graded</span>
                                        </div>
                                        <div className="form-group listt">
                                            <span className="heading-level-4">$6 per $500 Package Insurance</span>
                                        </div>
                                        <div className="form-group listt">
                                            <span className="heading-level-4"> $1.5k insurance will add $18 to your order</span>
                                        </div>
                                        <div className="form-group listt">
                                            <span className="heading-level-4">$500 insurance will add $6 to your order</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2">

                                </div>
                                <div className="col-lg-4">
                                <button className="submitbtn d-block mt-4 mt-2" type="submit" 
                                 onClick={()=>updateorderfinal(orderid)}>Add Your Insurance & Alert</button>
                               
                                </div>
                            </div>
                        </div>
                        <div className="Dashboardsec box-shadow">  
                        <div className="Topl mb-3">
                                   <span className="heading-level-2">Complete Your Order</span>
                         </div>       
                         {
                            showorderdetails?
                              <div>
                                 <div className="row noleftrightpadding mb-3">
                              <div className="col-lg-3">
                                 <div className="form-group">
                                    <label className="light-text">Order No</label>
                                    <input type="text" className="form-control" value={orderid} disabled></input>
                                 </div>

                               </div>
                               <div className="col-lg-3">
                                 <div className="form-group">
                                     <label className="light-text">Service Level</label>
                                     <input type="text" className="form-control" disabled value={servicelevel}></input>
                                  </div>
                                </div>
                                    <div className="col-lg-3">
                                      <div className="form-group">
                                       <label className="light-text">Order Creation Date/Time</label>
                                        <input type="text" className="form-control" disabled value={orderdate}></input>
                                       </div>
                                    </div>  
                                    <div className="col-lg-3">
                                 <div className="form-group">
                                    <label className="light-text">Total DV</label>
                                    <input type="text" className="form-control" disabled value={ntotalDv}></input>
                                 </div>

                               </div>                              
                                 
                            </div>
                            <div className="row noleftrightpadding mb-3">
                              <div className="col-lg-3">
                                 <div className="form-group">
                                    <label className="light-text">Amount of Insurance</label>
                                    <input type="text" className="form-control" disabled 
                                    value={insuranceamt}></input>
                                 </div>

                               </div>
                               <div className="col-lg-3">
                                 <div className="form-group">
                                     <label className="light-text">Price Per Card</label>
                                     <input type="text" className="form-control" disabled value={pricepercard}></input>
                                  </div>
                                </div>
                                    <div className="col-lg-3">
                                      <div className="form-group">
                                       <label className="light-text">Calculated Total Card Qty</label>
                                        <input type="text" className="form-control" disabled value={totalcardcount}></input>
                                       </div>
                                    </div>  
                                    <div className="col-lg-3">
                                 <div className="form-group">
                                    <label className="light-text">Calculated Insurance Cost</label>
                                    <input type="text" className="form-control" disabled
                                  value={totalInsAmt}  ></input>
                                 </div>

                               </div>                              
                                 
                            </div>
                            <div className="row noleftrightpadding mb-3">
                              <div className="col-lg-3">
                                 <div className="form-group">
                                    <label className="light-text">Total Price of Cards</label>
                                    <input type="text" className="form-control" disabled value={totalcardcount*pricepercard}></input>
                                 </div>

                               </div>
                               <div className="col-lg-3">
                                 <div className="form-group">
                                     <label className="light-text">Review Cards Fee</label>
                                     <input type="text" className="form-control" disabled></input>
                                  </div>
                                </div>
                                    <div className="col-lg-3">
                                      <div className="form-group">
                                       <label className="light-text">Shipping/Processing</label>
                                        <input type="text" className="form-control" disabled></input>
                                       </div>
                                    </div>  
                                    <div className="col-lg-3">
                                 <div className="form-group">
                                    <label className="light-text">Order Total</label>
                                    <input type="text" className="form-control" disabled></input>
                                 </div>

                               </div>                              
                                 
                            </div>
                              </div>
                          : "" }
                           
                            <div className="row mt-3">
                            <p className="light-text">Along with email updates, add your cell phone to be informed with text message updates. We'll update you for status updates, when your grades pop and when it's time for final payment. Not interested, just leave it blank and we won't bother you!</p>
                            <p className="light-text">
                            Once grades pop, we provide a link via email to view your grades. Payment is due at that time and expected at time of invoice days. Failure to pay within 30 days will result in a collection attempt process as outlined on our privacy and terms policy pages. In addition, I agree to the Price Change policy also located on our terms policy page. By checking the Yes, I Agree box and submitting this order, you agree to abide by the terms as linked.
                            </p>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">

                                </div>
                                <div className="col-lg-6">

                                    <div className="mb-3 mt-3">
                                        <label className="heading-level-4">Please note our shipping address has changed as of 7/7/22:</label>

                                        <ul className="list-unstyled">
                                            <li>2491 N. Mt. Juliet Rd.</li>
                                            <li>PO Box 439</li>
                                            <li>Mt. Juliet, TN 37121</li>
                                            <li className="mt-2">
                                                <b>Agreement to Terms</b>
                                            </li>
                                            <li className="mt-2">
                                                <p>
                                                <input type="checkbox" id="Termcheckbox"
                                                ref={ref}
                                                name="termsandcondition" value="Terms and Condition"></input><label for="vehicle1" className="ml-10">  Yes, I Agree</label>
                                                </p>
                                            </li>
                                        </ul>


                                    </div>


                                <button type="submit" className="submitbtn d-block mt-4 mt-2 
                                text-center" onClick={FinalOrder}>Complete Your Order</button>
                              
                                
                                </div>
                                <div className="col-lg-4">

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