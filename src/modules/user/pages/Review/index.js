import React, { useState, useRef, useEffect } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./riview.css";
import { useNavigate, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { BiMessageEdit, BiPlusCircle } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const review = () =>
{
  const userid = localStorage.getItem( "userid" );
  let totalcardqty = 0;
  //const orderid = reviewOrderId;
  const [ reviewOrderId, setreviewOrderId ] = useState( "" );
  const sucessMessage = (e) => toast.success(e);
  const [companyname, setcompanyname] = useState("");
  const [cardtype, setcardtype] = useState("");
  const [comments, setcomments] = useState("");
  const [ agree, setagree ] = useState( "" );
  const [ notLoggedcardcount, setnotLoggedcardcount ] = useState( "" );
  const [ showcountbox, setshowcountbox ] = useState( false );
  const [ isLogcard, setisLogcard ] = useState( "" );
  const [updatecardid, setupdatecardid] = useState("");
  const [ isEmpty, setIsEmpty ] = useState( true );
  const [totaldv, settotaldv] = useState("");
  
  //States for add order textboxes
  const [qty, setqty] = useState(120);
  const [cardyear, setCardyear] = useState(1909);
  const [brand, setbrand] = useState("ABC");
  const [cardnumber, setcardnumber] = useState(1234);
  const [playername, setplayername] = useState("Shubhanshu");
  const [attribute, setattribute] = useState("attr");
  const [ntotalDv, nsettotaldv] = useState(1200);
  const [carduploadfilename, setcarduploadfileName] = useState(null);
  const [file, setFile] = useState(null);

  //states to manage log card add and update button
  const [updatebtn, setupdatebtn] = useState(false);

  //States to get set the users card list for that partculer order
  const [cardlistData, setCardlistData] = useState([]);

  const navigate = useNavigate();

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  

 useEffect(() => {
   CreateReviewOrderid();
  }, []);

  const CreateReviewOrderid = () =>{
    
    let newreviewid = "";
    const characters = "0123456789";
    const charactersLength = 5;
    let counter = 0;
    while (counter < 5) {
      newreviewid += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
      counter += 1;
    }
     
    let reviewPrefix = "PSA";
    reviewPrefix = reviewPrefix.slice(0, 3);
    newreviewid = reviewPrefix + "-" + newreviewid;
    console.log( newreviewid );
    setreviewOrderId( newreviewid );
    
  }

  const handleonchange = (p) => {
    const txtcomments = p.target.value;
    setcomments(txtcomments);
  };

  const onServiceLevelDDL = (e) => {
    var index = e.target.selectedIndex;
    if (index > 0) {
      const dname = e.target[ index ].text;
      const dvalue = e.target[ index ].value;
      setcardtype( dname );
      if ( dvalue == 1 )
      {
        setisLogcard(true)
      }
      else
      {
        setisLogcard(false)
      }
      
    } else {
      alert("Please select Card Type");
    }
  };

  const handlegrcompanychange = async (evt) => {
    let grcmpname = evt.target.value;
    grcmpname = grcmpname.toUpperCase();
    setcompanyname( "ps-23456" );
    CreateReviewOrderid();
  };

  const submitreview = async () => {
   
   
    if ( comments && cardtype != null) {
      let result = await fetch(
        `${process.env.REACT_APP_API_URL}/submitreview`,
        {
          method: "post",
          body: JSON.stringify({
            userid: userid,
            reviewid: reviewOrderId,
            companyname: companyname,
            cardtype: cardtype,
            comment: comments,
            isactive: true,
            status: "Created",
            notloggedcadqty: notLoggedcardcount
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      alert(
        "Your Card has been submitted for Review. We will send you the mail very soon"
      );
      navigate("/user/review-list");
    } else {
      alert("All Fields Are Mandatory");
    }
  };

  const Addnewcard = async ( e ) =>
  {
    // CreateReviewOrderid();
    if (carduploadfilename) {
      e.preventDefault();
      if (file !== null) {
        console.log(file);
        let formValue = new FormData();
        formValue.append("file", file);
        formValue.append("userid", userid);
        formValue.append("reviewid", reviewOrderId);
        console.log( reviewOrderId );
        
        Axios.post(`${process.env.REACT_APP_API_URL}/uploadReviewCards`, formValue, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          getcardlist();
          sucessMessage("File Uploaded Sucessfully");
        });
      } else {
        alert("Select a valid file.");
      }
    } else
    {
      
      let result = await fetch(`${process.env.REACT_APP_API_URL}/addReviewcard`, {
        method: "post",
        body: JSON.stringify({
          userid: userid,
          reviewid: reviewOrderId,
          qty: qty,
          cardyear: cardyear,
          brand: brand,
          cardnumber: cardnumber,
          playername: playername,
          attribute: attribute,
          totalDV: ntotalDv
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();

      if (result) {
        getcardlist()
        setIsEmpty(false);
        //setCardlistData(result.CardList);
        // setqty("");
        // setattribute("");
        // setbrand("");
        // setcardnumber("");
        // setCardyear("");
        // setplayername("");
        // setpricepercard("");
        // settotaldv("");
        alert("Card details has been updated");
      } else {
        alert("find some issue");
      }
    }
  };
    const getcarddetails = async (_id) => {
    //write code here to get function and use filter in result

    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/getcarddetails/` + _id,
      {
        method: "POST",
        body: JSON.stringify({ userid: userid }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    result = await result.json();

    if (!result.isEmpty) {
      setupdatebtn(true);
      setqty(result.cards.qty);
      setattribute(result.cards.attribute);
      setplayername(result.cards.playername);
      setbrand(result.cards.brand);
      setcardnumber(result.cards.cardnumber);
      setCardyear(result.cards.cardyear);
      settotaldv(result.cards.totalDV);
      setupdatecardid(result.cards._id);
    } else {
      setupdatebtn(false);
    }
  };

  const deletecard = async (_id) => {
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/dltCards/${_id}`,
      {
        method: "delete",
        body: JSON.stringify({ userid: userid }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    result = await result.json();
    getcardlist();
  };

   const getcardlist = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/getReviewcardlist`, {
      method: "post",
      body: JSON.stringify({ userid: userid, reviewid: reviewOrderId}),
      headers: {
        "content-type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    if (!result.isEmpty) {
      setIsEmpty(false);
      setCardlistData(result.CardList);
    } else {
      setIsEmpty(true);
      // setCardlistData("");
    }
   };
  
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    setFile(event.target.files && event.target.files[0]);
    if (!fileObj) {
      return;
    }

    setcarduploadfileName(fileObj.name);
    event.target.value = null;
  };

  const updatecarddetails = async (updatecardid) => {
    const id = updatecardid;
    //alert(id);
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/updatecard/` + id,
      {
        method: "PATCH",
        body: JSON.stringify({
          userid: userid,
          qty: qty,
          brand: brand,
          cardyear: cardyear,
          playername: playername,
          attribute: attribute,
          totalDV: ntotalDv,
          cardnumber: cardnumber,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    result = await result.json();
    if (result) {
      getcardlist();
      alert("Card Details Information Has Been Updated");
    }
  };

  return (
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
                <span className="heading-level-2">
                  Welcome to Memphis Review!{" "}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              {/* <div className="col-lg-6">
                <div className="form-group">
                  <label className="fw-bold mb-2">Grading company Select</label>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <input
                        id="r11"
                        type="radio"
                        name="radio"
                        value="SGC"
                        onChange={handlegrcompanychange}
                      ></input>
                      <label htmlFor="r11" className="ml-10">
                        {" "}
                        SGC
                      </label>
                    </li>
                    <li className="list-inline-item">
                      <input
                        id="r22"
                        type="radio"
                        name="radio"
                        value="PSA"
                        onChange={handlegrcompanychange}
                      ></input>
                      <label htmlFor="r22" className="ml-10">
                        {" "}
                        PSA
                      </label>
                    </li>
                    <li className="list-inline-item">
                      <input
                        id="r3"
                        type="radio"
                        name="radio"
                        value="Beckett"
                        onChange={handlegrcompanychange}
                      ></input>
                      <label htmlFor="r3" className="ml-10">
                        {" "}
                        Beckett
                      </label>
                    </li>
                    <li className="list-inline-item">
                      <input
                        id="r4"
                        type="radio"
                        name="radio"
                        value="Best Option"
                        onChange={handlegrcompanychange}
                      ></input>
                      <label htmlFor="r4" className="ml-10">
                        {" "}
                        Best Option
                      </label>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2 fw-bold">
                    Would you like to log your cards?
                  </label>
                  <select
                    className="form-control "
                    onChange={onServiceLevelDDL}
                  >
                    <option value="0" name="select">
                      Select Card Types
                    </option>
                    <option value="1" name="select">
                      Log Cards
                    </option>
                    <option value="2" name="select">
                      Do Not Log Cards
                    </option>
                  </select>
                </div>
              </div>
              {
                isLogcard ? null
                  :
                  
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="mb-2 fw-bold">
                       Not Logged Card Quantity
                      </label>
                      <input type="text" className="form-control" id="cardcountnotlooged"
                        value={ notLoggedcardcount }
                         onChange={(e) => setnotLoggedcardcount(e.target.value)}></input>
                       </div>
                    </div>
                 
                
             }
              
            </div>
  
            {
              isLogcard ?
                
            
            <div>
            <div className="row orer-details">
                <div className="Topl mb-3">
                  <span className="heading-level-2">Add Cards</span>
                </div>
                <div className="row">
                  <div className="theme-highlight-div mb-4 text-center">
                    <div className="form-group mt-4 mb-4">
                      <form className="text-center mb-2">
                        <input
                          style={{ display: "none" }}
                          ref={inputRef}
                          type="file"
                          onChange={handleFileChange}
                        />
                        <Link
                          className="text-theme mb-1 d-block text-decoration-none"
                          onClick={handleClick}
                        >
                          <BiPlusCircle></BiPlusCircle> Select A CSV File To
                          Upload
                        </Link>
                        <label className="mb-2">{carduploadfilename}</label>
                        <center>
                          {" "}
                          <button
                            className="submitbtn d-block w270 text-center"
                            type="submit"
                            onClick={Addnewcard}
                          >
                            Log Cards Via CSV
                          </button>
                        </center>
                      </form>
                      <p className="mb-1">Or</p>
                      <p className="mb-1">
                        Add match card below indivudaly by filling in all
                        required fields.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-1">
                    <div className="form-group">
                      <label>Qty</label>
                      <input
                        onChange={(e) => setqty(e.target.value)}
                        type="text"
                        className="form-control"
                        value={qty}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>Card year</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setCardyear(e.target.value)}
                        value={cardyear}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div className="form-group">
                      <label>Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setbrand(e.target.value)}
                        value={brand}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setcardnumber(e.target.value)}
                        value={cardnumber}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>Player Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setplayername(e.target.value)}
                        value={playername}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>Attributes/SN</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setattribute(e.target.value)}
                        value={attribute}
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>Total Declard Value</label>
                      <input
                        type="text"
                        onChange={(e) => nsettotaldv(e.target.value)}
                        className="form-control"
                        value={ntotalDv}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4 d-block text-center">
                    {updatebtn ? (
                      <button
                        className="submitbtn d-block mt-4 mt-2"
                        type="submit"
                        onClick={() => updatecarddetails(updatecardid)}
                      >
                        Update Logged Card Details
                      </button>
                    ) : (
                      <button
                        className="submitbtn d-block mt-4 mt-2"
                        type="submit"
                        onClick={Addnewcard}
                      >
                        Log Card
                      </button>
                    )}

                    {/* <Link to="#" className="submitbtn d-block mt-4 mt-2">Log Card</Link> */}
                  </div>
                  <div className="col-lg-4"></div>
                </div>
              </div>
            <div className="row mb-3 mt-3">
               <div className="Topl">
                  <span className="heading-level-2">Your Logged Cards</span>
                  {isEmpty ? (
                    <label className="text-danger mt-3 fs-5 fw-semibold">
                      No Card List Found For This Order. Looged Your Card for
                      this order
                    </label>
                  ) : (
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
                              <button
                                type="submit"
                                onClick={() => getcarddetails(card._id)}
                              >
                                {" "}
                                <BiMessageEdit></BiMessageEdit>
                              </button>
                            </td>
                            <td className="bg-danger text-white text-center heading-level-3 font-30">
                              <button
                                type="submit"
                                onClick={() => deletecard(card._id)}
                              >
                                {" "}
                                <AiOutlineDelete></AiOutlineDelete>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </thead>
                    </Table>
                  )}
                </div>

                  </div>
            </div>
                :
                null
            }

            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="fw-bold mb-2">Comments for Reviewers</label>
                  <textarea
                    className="form-control height200"
                    value={comments}
                    onChange={handleonchange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="fw-bold mb-2">Agreement of Terms</label>
                  <p>
                    By selecting "Do Not Log Cards" not logging cards to the
                    order, customer agrees to not contesting the contents of
                    your order. Additionally, customer agrees to forfeit right
                    to contest declared value and/or declared value. Our
                    reviewer’s results will be sent to you. Any cards that pass
                    review will be put in appropriate service levels. Upon
                    customers approval of review, customer agrees to the grading
                    charges for appropriate grading company levels.
                  </p>
                  <input
                    type="checkbox"
                    id="chk1"
                    name="terms and condition"
                    value="1"
                  ></input>
                  <label Htmlfor="chk1" className="ml-10">
                    {" "}
                    Yes, I agree
                  </label>
                  <br></br>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <div className="form-group">
                  <button
                    type="submit"
                    className="submitbtn"
                    onClick={submitreview}
                  >
                    Submit For Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default review;
