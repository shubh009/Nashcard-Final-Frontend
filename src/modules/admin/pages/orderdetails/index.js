import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import { BiMessageEdit, BiCheckDouble, BiPlusCircle } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { TbTableExport } from "react-icons/tb";
import "./detailsstyle.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { CSVLink } from "react-csv";
// import {useRef} from 'reCSVLinkact';
import FormData from "form-data";
import Axios from "axios";
import { DownloadTableExcel } from "react-export-table-to-excel";
import axios from "axios";
import SendDeliveryAddressUpdateLink from "./SendDeliveryAddressUpdateLink";
import UpdateDeliveryTimeline from "./UpdateDeliveryTimeline";
const index = () => {
  //local storage varaible

  const userid = localStorage.getItem("aUdetailsId");
  const orderid = localStorage.getItem("aUorderid");
  const upid = localStorage.getItem("aUdetailsId");
  const odid = localStorage.getItem("aUorderid");
  const grname = localStorage.getItem("aGradingCompanyName");
  const idperorder = localStorage.getItem("idperorder");
  // const userid =7116
  // const orderid="SG-33043"
  // const upid=7116
  // const odid="SG-33043"
  // const grname="SGC"
  const slct = "SGC - Pokemon";
  //manage toast
  const notify = () =>
    toast.success("WOW! PSA SUB & order status has been updated");
  const notifyalert = () => toast.error("Please fill all the details");
  const Statusnotify = (e) => toast.success(e);
  const sucessMessage = (e) => toast.success(e);

  //set Navigattion
  const navigate = useNavigate();

  //state to mange the cards
  const [qty, setqty] = useState("");
  const [cardyear, setCardyear] = useState("");
  const [brand, setbrand] = useState("");
  const [cardnumber, setcardnumber] = useState("");
  const [playername, setplayername] = useState("");
  const [attribute, setattribute] = useState("");
  const [ntotalDv, nsettotaldv] = useState("");
  const [insuranceamt, setinsuranceamt] = useState("");
  const [trackingno, settrackingno] = useState("");
  const [totalInsAmt, settotalInsAmt] = useState("");
  const [totaldv, settotaldv] = useState("");
  const [updatecardid, setupdatecardid] = useState("");
  const [pricepercard, setpricepercard] = useState("");
  const [psasubno, setpsasubno] = useState("");
  const [showtable, setShowtable] = useState(false);
  const [showorderdetails, setShoworderdetails] = useState(false);
  const [grcompanyname, setGrcompanyName] = useState("");
  const [getGrade, setGrades] = useState([]);

  //states to manage log card add and update button
  const [updatebtn, setupdatebtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  //States to get set the users card list for that partculer order
  const [cardlistData, setCardlistData] = useState([]);
  const [show, setShow] = useState(false);
  const [Editshow, setEditshow] = useState(false);
  const [EditGradeshow, setEditGradeshow] = useState(false);
  const [viewCustomerinfoShow, setViewCustomerinfoShow] = useState(false);
  const [psaCopypopup, setPsaCopypopup] = useState("");
  const [nonpsaCopypopup, setNonPsaCopypopup] = useState("");
  const [orderDetPerid, setOrderDetPerid] = useState("");

  //state to manage the new node modal popup
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state to manage the edit order modal popup
  const handleEditClose = () => setEditshow(false);
  const handleEditShow = () => {
    setEditshow(true);
    bindServiceLevelDDL();
    bindorderStatus();
    const getOrderDetailsForEdit = async () => {
      let result = await fetch(
        `${process.env.REACT_APP_API_URL}/orders-details-perid`,
        {
          method: "post",
          body: JSON.stringify({ orderid: odid, userid }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let data = await result.json();
      console.log(data);
      if (!data.isEmpty) {
        setOrderDetPerid(data[0]);
        seteditcardsaverqty(data[0].totalcards);
        seteditInsamount(data[0].insuranceammount);
        seteditcardsaverprice(data[0].pricepercard);
        seteditnoofkicksfromSL(data[0].NumberOfKicksfromservicelevel);
        seteditpassesprice(data[0].PassesPrice);
        seteditnoofreviewpasses(data[0].NumberofReviewPasses);
        seteditnonloggedcardCount(data[0].NonLoggedCardCount);
        seteditpercardprice(data[0].Percardpriceofnonloggedcard);
        seteditnoofkicksfromSL(data[0].NumberOfKicksfromservicelevel);
      }
    };
    getOrderDetailsForEdit();
  };

  //state to manage the edit Grade modal popup
  const handleEditGradeClose = () => setEditGradeshow(false);
  const handleEditGradeShow = () => {
    getGradelistbyUserid();
    setEditGradeshow(true);
  };

  //state to manage the View Customer Info modal popup
  const handleViewinfopopupShow = () => {
    getUserAndOrderDetails();
    setViewCustomerinfoShow(true);
  };
  const handleViewinfopopupClose = () => setViewCustomerinfoShow(false);

  //state to manage the PSA Copy modal popup
  const handlepsasubpopupshow = () => {
    getcardlist();
    setPsaCopypopup(true);
  };

  const handlepsasubpopuphide = () => setPsaCopypopup(false);

  //state to manage the Non PSA Copy modal popup
  const handlenonpsasubpopupshow = () => {
    getcardlist();
    orderDetails();
    getUserDetails();
    setNonPsaCopypopup(true);
  };
  const handlenonpsasubpopuphide = () => setNonPsaCopypopup(false);

  const tableRef = useRef(null);

  //states to hold the user details details
  const [user, setUser] = useState("");
  const [ODdetails, setODdetails] = useState([]);

  //state to hold order, card, Grdes details
  const [ordernotes, setrderNotes] = useState([]);
  const [isorderNotes, setisorderNotes] = useState(false);
  const [note, setNote] = useState("");
  const [orderGrades, setorderGrades] = useState([]);
  const [gradeListPsa, setgradeListPsa] = useState("");

  //state to manage order details.
  const [editservicelevel, seteditservicelevel] = useState([]);
  const [editStatus, seteditStatus] = useState([]);
  const [editInsamount, seteditInsamount] = useState("");
  const [editlocal, setEditlocal] = useState("");
  const [editcardsaverqty, seteditcardsaverqty] = useState("");
  const [editcardsaverprice, seteditcardsaverprice] = useState("");
  const [editnonloggedcardCount, seteditnonloggedcardCount] = useState("");
  const [editpercardprice, seteditpercardprice] = useState("");
  const [editnoofkicksfromSL, seteditnoofkicksfromSL] = useState("");
  const [editnoofreviewpasses, seteditnoofreviewpasses] = useState("");
  const [editpassesprice, seteditpassesprice] = useState("");
  const [editSelectService, setEditSelectService] = useState("");
  const [editSelectStatus, setEditSelectStatus] = useState("");

  //Manage State to get the gradeList in Popup
  const [gradeList, setGradeList] = useState([]);
  const [OrderStatus, setOrderStatus] = useState("");

  //Manage State to get the userorderDetails in Popup
  const [userOrderDetails, setuserOrderDetails] = useState([]);
  const [popupuserDetails, setpopupuserDetails] = useState([]);

  const headers = [
    { label: "Qty", key: "Qty" },
    { label: "Card year", key: "Cardyear" },
    { label: "Brand", key: "Brand" },
    { label: "Card Number", key: "CNumber" },
    { label: "Player Name", key: "PName" },
    { label: "Attributes/SN", key: "AttrSN" },
    { label: "Declared Value", key: "dv" },
  ];

  const [carduploadfilename, setcarduploadfileName] = useState(null);
  const [file, setFile] = useState(null);

  //code to bind service level based on grading company name

  const bindServiceLevelDDL = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/getservicelevel/` + grname,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    response = await response.json();
    console.log(response);
    if (response) {
      seteditservicelevel(response);
    } else {
      alert("Service Level not found");
    }
  };

  const bindorderStatus = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/getorderStatus/`,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    response = await response.json();

    if (response) {
      console.log(response);
      seteditStatus(response);
    } else {
      alert("Order Status not found");
    }
  };

  const getdataGrades = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get-grades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setGrades(data);
      } else {
        setGrades([]);
      }
    }
  };

  const orderDetails = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/getOrderAndCardDetails/` + upid,
      {
        method: "POST",
        body: JSON.stringify({ orderid: odid }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      //console.log(result)
      setODdetails(result);
      setGrcompanyName(result.grcompanyname);
      setOrderStatus(result.orderStatus);
    }
  };

  const getUserDetails = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/getprofile/`, {
      method: "POST",
      body: JSON.stringify({ userid: upid }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      setUser(result);
    }
  };

  useEffect(() => {
    getcardlist();
    orderDetails();
    getUserDetails();
    getnotesList();
    bindServiceLevelDDL();
    bindorderStatus();
    getdataGrades();
  }, []);

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

  const totalinsuracecost = () => {
    const insammount = insuranceamt;
    let calculatedInsamount = 0;
    if (insammount <= 500) {
      calculatedInsamount = 6;
    } else {
      const calck = insammount / 500;
      calculatedInsamount = calck * 6;
      settotalInsAmt(calculatedInsamount);
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
    console.log(result);

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
      //alert(result.cards._id);
    } else {
      setupdatebtn(false);
    }
  };

  const updatecarddetails = async () => {
    const id = updatecardid;
    alert(id);
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

    console.log(result);
    result = await result.json();
    if (result) {
      getcardlist();
      alert("Card Details Information Has Been Updated");
    }
  };

  const uploadGrads = async (e) => {
    e.preventDefault();
    if (file !== null) {
      console.log(file);
      let formValue = new FormData();
      formValue.append("file", file);
      formValue.append("userid", userid);
      formValue.append("orderid", orderid);
      Axios.post(`${process.env.REACT_APP_API_URL}/uploadGrades`, formValue, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        getGradelistbyUserid();
        sucessMessage("File Uploaded Sucessfully");
      });
    } else {
      alert("Select a valid file.");
    }
  };

  const Addnewcard = async (e) => {
    if (carduploadfilename) {
      e.preventDefault();
      if (file !== null) {
        console.log(file);
        let formValue = new FormData();
        formValue.append("file", file);
        formValue.append("userid", userid);
        formValue.append("orderid", orderid);

        Axios.post(`${process.env.REACT_APP_API_URL}/upload`, formValue, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          sucessMessage("File Uploaded Sucessfully");
        });
      } else {
        alert("Select a valid file.");
      }
    } else {
      setShowtable(true);
      setShoworderdetails(true);
      totalinsuracecost();
      let result = await fetch(`${process.env.REACT_APP_API_URL}/addcard`, {
        method: "post",
        body: JSON.stringify({
          userid: userid,
          orderid: orderid,
          rowid: 4,
          qty: qty,
          cardyear: cardyear,
          brand: brand,
          cardnumber: cardnumber,
          playername: playername,
          attribute: attribute,
          totalDV: ntotalDv,
          insuranceAmt: insuranceamt,
          trackingno: trackingno,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();

      if (result) {
        setIsEmpty(false);
        setCardlistData(result.cards);
        setShoworderdetails(true);
        setqty("");
        setattribute("");
        setbrand("");
        setcardnumber("");
        setCardyear("");
        setplayername("");
        setpricepercard("");
        settotaldv("");
        alert("Insurance & Card details has been updated");
      } else {
        alert("find some issue");
      }
    }
  };
  //
  const getcardlist = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/getcardlist`, {
      method: "post",
      body: JSON.stringify({ userid: userid }),
      headers: {
        "content-type": "application/json",
      },
    });

    const result1 = await result.json();
    if (!result1.isEmpty) {
      setIsEmpty(false);
      setCardlistData(result1.cards);
      setShoworderdetails(true);
    } else {
      setIsEmpty(true);
      // setCardlistData("");
    }
  };

  const updatePSANo = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/updatePSASUB/`, {
      method: "PATCH",
      body: JSON.stringify({
        _id: odid,
        PSASub: psasubno,
        orderstatus: "Cards Logged",
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    result = await result.json();
    if (result) {
      notify();
      setpsasubno("");
    }
  };

  const markorderpaid = async () => {
    alert(odid);
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/markorderpaid/`,
      {
        method: "PATCH",
        body: JSON.stringify({
          orderid: odid,
          isorderpaid: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      notify();
    }
  };

  const getnotesList = async () => {
    //code to get the order note list

    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/ordernotelist/` + upid,
      {
        method: "post",
        body: JSON.stringify({ orderid: odid }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    result = await result.json();
    if (!result.isEmpty) {
      setisorderNotes(true);
      setrderNotes(result.orderNotes);
    } else {
      setisorderNotes(false);
      setrderNotes("");
    }
  };

  const getUserAndOrderDetails = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/getOrderAndCustomerDetails/`,
      {
        method: "post",
        body: JSON.stringify({ orderid: odid }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    if (!result.isEmpty) {
      setuserOrderDetails(result.orders);
      setpopupuserDetails(result);
    }
  };

  const onServiceLevelDDL = (e) => {
    var index = e.target.selectedIndex;

    const dname = e.target[index].text;
    alert(dname);
    setEditSelectService(dname);
  };
  const onStatus = (e) => {
    const index = e.target.selectedIndex;

    const dname = e.target[index].text;
    alert(dname);
    setEditSelectStatus(dname);
  };
  const handleRbOnchange = (ev) => {
    const localpickup = ev.target.value;
    setEditlocal(localpickup);
  };

  const handleSave = async () => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/addnotes`, {
      method: "POST",
      body: JSON.stringify({
        userid: upid,
        orderid: orderid,
        notes: note,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      getnotesList();
      notify();
    }
  };

  const handleDelete = async (note) => {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/deletenote`, {
      method: "DELETE",
      body: JSON.stringify({
        userid: upid,
        orderid: orderid,
        noteid: note.noteid,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      getnotesList();
      alert("Note Deleted");
    }
  };

  const updateOrderdetails = async () => {
    handleEditClose();
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/updateOrderFromAdmin/` + odid,
      {
        method: "PATCH",
        body: JSON.stringify({
          userid: upid,
          NonLoggedCardCount: editnonloggedcardCount,
          LoggedCardCount: editnonloggedcardCount,
          cardsaverqty: editcardsaverqty,
          cardsaverprice: editcardsaverqty,
          PSAUpcharge: 0,
          servicelevel: editSelectService,
          orderStatus: editSelectStatus,
          insuranceammount: editInsamount,
          Percardpriceofnonloggedcard: editpercardprice,
          NumberOfKicksfromservicelevel: editnoofkicksfromSL,
          NumberofReviewPasses: editnoofreviewpasses,
          PassesPrice: editpassesprice,
          localpickup: editlocal,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    result = await result.json();
    if (result) {
      notify();
    }
  };

  const updateOrderStatus = async (e) => {
    alert(e.id);
    let { orderStatus, mailId } = "";
    mailId = e.id;
    if (mailId === 1) {
      orderStatus = "Card Sent To Grading Company";
    } else if (mailId === 2) {
      orderStatus = "Cards Reviewed by Nashcards";
    }

    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/updateOrderStatus/`,
      {
        method: "PATCH",
        body: JSON.stringify({
          uemail: "gupta.shubhanshu007@gmail.com",
          _id: odid,
          orderStatus: orderStatus,
          mailId: mailId,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    result = await result.json();
    console.log(result);
    if (result) {
      orderDetails();
      Statusnotify("Order Status Has Been Updated");
    }
  };

  //Card table data download into CSV

  const csvReport = {
    data: cardlistData,
    headers: headers,
    filename: "Cards.csv",
  };

  const sendOrderStatusOnEmail = async (e) => {
    //alert(e.id);
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/sendOrderStatusOnEmail/`,
      {
        method: "POST",
        body: JSON.stringify({
          uemail: "gupta.shubhanshu007@gmail.com",
          orderId: odid,
          orderStatus: OrderStatus,
          mailId: e.id,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    result = await result.json();
    console.log(result);
    if (result) {
      Statusnotify("Order status has been sent on Registered email id");
    }
  };

  const getGradelistbyUserid = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/gradelistbyuserid/`,
      {
        method: "POST",
        body: JSON.stringify({
          userid: userid,
          orderId: odid,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    result = await result.json();
    console.log(result);
    if (result) {
      setorderGrades(result.Grades);
      setgradeListPsa(result.PSASub);
    }
  };

  const deleteGrade = async (e) => {
    let _id = e._id;
    let orderid = e.orderid;
    let result = await fetch(`${process.env.REACT_APP_API_URL}/deleteGrade/`, {
      method: "DELETE",
      body: JSON.stringify({
        userid: userid,
        orderid: orderid,
        _id: _id,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    if (result) {
      getGradelistbyUserid();
      Statusnotify("Grades has been deleted sucessfully!!!");
    }
  };
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    setFile(event.target.files && event.target.files[0]);
    if (!fileObj) {
      return;
    }

    setcarduploadfileName(fileObj.name);

    // setcarduploadfileName(fileObj.name);
    // console.log('fileObj is', fileObj);

    // // 👇️ reset file input
    event.target.value = null;

    // // 👇️ is now empty
    // console.log(event.target.files);

    // // 👇️ can still access file object here
    // console.log(fileObj);
    // console.log(fileObj.name);
  };

  const gradeDetails = async (orderid) => {
    localStorage.setItem("gradeOrder", orderid);
  };
  const [frontImage, setFImage] = useState("");
  const [backImage, setBImage] = useState("");
  const getImg = async (cert) => {
    const headers = {
      Authorization:
        "Bearer efIjuZZweQdXDXL149ELi1S-npq7N4kyxTko1XaJB8SCPzKKUzyBCq3nvGc2c0KynQ_fAFG0MxnyiNc_kMc_sBBytzvCNyppnx4T2mdF8EXD_pNPKSXmYEiYmOT0S2a7hiI3-jRlfsLAWIcI_AU2LKFKQe373Ez5p0rgCEkBBgFts_8MK_L4HsMzaL-OVwleJkveLOhH6RFveOBrR_gE6saJ2KxBE3ImqsSZovOBAOrgT1pZhQxYFHFkjdg5gVo4E5xAalUd_hQhZelrc-2A-2_5eQNF265cAT-KpWCig-rty_UJ",
    };
    const response = await axios.get(
      `https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/${cert}`,
      { headers }
    );
    setFImage(response.data[1].ImageURL);
    setBImage(response.data[0].ImageURL);
  };

  const GotoSendInvoice = async () => {
    //navigate("admin/shipping");


  }

  return (
    <>
      <div className="container-fluid " id="admin">
        <Modal show={psaCopypopup} onHide={handlepsasubpopuphide} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>PSA Copy Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-3">
                <div className="statebox">
                  <label className="heading-level-4">Order Number</label>
                  <p className="mb-1">{orderid}</p>
                </div>
              </div>
            </div>
            <Table striped bordered hover className="my-3">
              <thead>
                <tr>
                  <th className="w80">Qty</th>
                  <th className="w270">Card</th>
                  <th className="w80">DV</th>
                </tr>

                {cardlistData.map((cardlist) => (
                  <tr>
                    <td>{cardlist.qty}</td>
                    <td>
                      <span> {cardlist.cardyear}</span>
                      <span> {cardlist.brand}</span>
                      <span> {cardlist.cardnumber} </span>
                      <span> {cardlist.playername}</span>
                      <span> {cardlist.attribute}</span>
                    </td>
                    <td>{cardlist.totalDV}</td>
                  </tr>
                ))}
              </thead>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlepsasubpopuphide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={nonpsaCopypopup}
          onHide={handlenonpsasubpopuphide}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Non PSA Copy Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {ODdetails.map((odlist) => (
              <div className="row">
                <div className="col-lg-3">
                  <div className="statebox">
                    <label className="heading-level-4">Order Number</label>
                    <p className="mb-1">{orderid}</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="statebox">
                    <label className="heading-level-4">Order Name</label>
                    <p className="mb-1">
                      {user.name}
                      {user.lastname}
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="statebox">
                    <label className="heading-level-4">Service Level</label>
                    <p className="mb-1">{odlist.servicelevel}</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="statebox">
                    <label className="heading-level-4">PSA Sub</label>
                    <p className="mb-1">{odlist.PSASub}</p>
                  </div>
                </div>
              </div>
            ))}
            <Table striped bordered hover className="my-3">
              <thead>
                <tr>
                  <th className="w80">Qty</th>
                  <th className="w80">Year</th>
                  <th className="w150">Brand</th>
                  <th className="w80">Card No</th>
                  <th className="w270">Player Name</th>
                  <th className="w80">Attributes</th>
                  <th className="w80">DV</th>
                </tr>
                {cardlistData.map((cardlist) => (
                  <tr>
                    <td>{cardlist.qty}</td>
                    <td>{cardlist.cardyear}</td>
                    <td>{cardlist.brand}</td>
                    <td>{cardlist.cardnumber}</td>
                    <td>{cardlist.playername}</td>
                    <td>{cardlist.attribute}</td>
                    <td>{cardlist.totalDV}</td>
                  </tr>
                ))}
              </thead>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlenonpsasubpopuphide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handlepsasubpopuphide}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              className="textareap"
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSave}
            >
              {" "}
              Add New Note
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={EditGradeshow} onHide={handleEditGradeClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Order Grades Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="theme-highlight-div mb-4 text-center">
              <div className="form-group mt-4 mb-4">
                <form className="text-center mb-5">
                  <ul className="list-inline list-unstyled">
                    <li className="list-inline-item">
                      {" "}
                      <input
                        style={{ display: "none" }}
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                      />
                      <Link
                        className="text-theme mb-1 pt-3 d-block text-decoration-none"
                        onClick={handleClick}
                      >
                        <BiPlusCircle></BiPlusCircle> Select A CSV File To
                        Upload
                      </Link>
                    </li>
                    <li className="list-inline-item mx-4">
                      {" "}
                      <label className="mb-2">{carduploadfilename}</label>
                    </li>
                  </ul>

                  <center>
                    {" "}
                    <button
                      className="submitbtn  d-block w270 text-center"
                      type="submit"
                      onClick={uploadGrads}
                    >
                      Log Cards Via CSV
                    </button>
                  </center>
                </form>
              </div>
            </div>

            <Table striped bordered hover className="scroll-table">
              <thead>
                <tr>
                  <th className="w150">Order#</th>
                  <th className="w150">Cert</th>
                  <th className="w180">Grade</th>
                  <th className="w270">Description</th>
                  <th className="w400">PSA Upcharge Ammount</th>
                  <th className="w180">Front Image</th>
                  <th className="w180">Back Image</th>
                  <th className="w180">Get Images</th>
                  <th className="w220">PSA Sub#</th>
                  <th className="w80">Edit </th>
                  <th className="w80">Delete</th>
                </tr>
                {getGrade.map((glist) => (
                  <tr className={glist._id}>
                    <td>{glist.orderid}</td>
                    <td>{glist.cert}</td>
                    <td>{glist.grade}</td>
                    <td>{glist.desc}</td>
                    <td>{glist.psaupcharge}</td>
                    <td>
                      {
                        <img
                          src={frontImage}
                          alt="front"
                          style={{ height: "7rem", width: "4.5rem" }}
                        />
                      }
                    </td>
                    <td>
                      {
                        <img
                          src={backImage}
                          alt="back"
                          style={{ height: "7rem", width: "4.5rem" }}
                        />
                      }
                    </td>
                    <td className="bg-success text-center text-text-decoration-none">
                      <Link
                        to="#"
                        onClick={(e) => getImg(glist.cert)}
                        className="text-white"
                      >
                        Get Images
                      </Link>
                    </td>
                    <td>{glist.psasub}</td>
                    <td className="bg-primary text-center text-decoration-none">
                      <Link
                        to="/admin/edit-grades/"
                        onClick={gradeDetails(glist.orderid)}
                        className="text-white"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="bg-danger text-center text-decoration-none">
                      <Link
                        to="#"
                        onClick={(e) =>
                          deleteGrade({
                            _id: glist._id,
                            orderid: glist.orderid,
                          })
                        }
                        className="text-white"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </thead>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditGradeClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={viewCustomerinfoShow}
          onHide={handleViewinfopopupClose}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>View Customer/Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row py-4">
              <div className="col-lg-3">
                <div className="highlightboxbox box-shadow">
                  <p className="mb-1 Ncount">{popupuserDetails.ordercount}</p>
                  <label className="heading-level-4">
                    Total Numbers of Orders
                  </label>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="highlightboxbox box-shadow">
                  <p className="mb-1 Ncount">20</p>
                  <label className="heading-level-4">Sum of All Orders</label>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="highlightboxbox box-shadow">
                  <p className="mb-1 Ncount">40</p>
                  <label className="heading-level-4">Total Graded Cards</label>
                </div>
              </div>
              {/* <div className="col-lg-3">
                   <div className="highlightboxbox box-shadow">
                      <p className="mb-1 Ncount">22 May 2023</p>
                      <label className="heading-level-4">Graded Pooped Date</label>
                    
                    </div>
                </div> */}
            </div>

            <>
              <div className="row py-2">
                <div className="col-lg-3">
                  <div className="statebox">
                    <label className="heading-level-4">Customer Name</label>
                    <p className="mb-1">{popupuserDetails.username}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="statebox">
                    <label className="heading-level-4">Email Id</label>
                    <p className="mb-1">{popupuserDetails.userEmail}</p>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="statebox">
                    <label className="heading-level-4">Contact No</label>
                    <p className="mb-1">{popupuserDetails.userContact}</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="statebox">
                    <label className="heading-level-4">Address</label>
                    <p className="mb-1"> Suhag Nagar, Firozabad</p>
                  </div>
                </div>
              </div>
            </>

            {userOrderDetails.map((glist) => (
              <>
                <Table
                  striped
                  bordered
                  hover
                  className="scroll-table-long my-3"
                >
                  <thead>
                    <tr>
                      <th className="w80">Order#</th>
                      <th className="w270">Service Level</th>
                      <th className="w220">Status</th>
                      <th className="w220">Total Cards</th>
                      <th className="w80">Order Total</th>
                      <th className="w220">Paid Date</th>
                      <th className="w220">Grade Pop Date</th>
                    </tr>

                    <tr className={glist._id}>
                      <td>{glist.orderid}</td>
                      <td>{glist.servicelevel}</td>
                      <td>{glist.orderStatus}</td>
                      <td>{glist.cardcount}</td>
                      <td></td>
                      <td>{glist.Gardespopdate}</td>
                      <td>{glist.CustomerInvoicedDate}</td>
                    </tr>
                  </thead>
                </Table>
              </>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleViewinfopopupClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={Editshow} onHide={handleEditClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    defaultValue={orderDetPerid.name}
                    type="text"
                    className="form-control disabled"
                    disabled
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    defaultValue={orderDetPerid.email}
                    type="text"
                    className="form-control disabled"
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Service Level</label>
                  <select
                    defaultValue={orderDetPerid.servicelevel}
                    className="form-control"
                    onChange={onServiceLevelDDL}
                  >
                    <option name="select">Select Service Level</option>
                    {editservicelevel.map((svlist) => (
                      <option
                        value={svlist.servicelevelid}
                        key={svlist.servicelevelid}
                      >
                        {svlist.servicelevel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    defaultValue={orderDetPerid.status}
                    className="form-control"
                    onChange={onStatus}
                  >
                    <option name="select">Select Order Status</option>
                    {editStatus.map((Odstatus) => (
                      <option key={Odstatus._id}>{Odstatus.status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Amount Of Insurance</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditInsamount(e.target.value)}
                    value={editInsamount}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Local Pickup/Drop Off?</label>
                  <div>
                    <ul className="list-unstyled">
                      <li>
                        <input
                          id="r1"
                          type="radio"
                          name="radio"
                          checked={orderDetPerid.localpickup === 1}
                          value="1"
                          onChange={handleRbOnchange}
                        ></input>
                        <label htmlFor="r1">
                          Yes, I'll drop off and pickup my cards
                        </label>
                      </li>
                      <li>
                        <input
                          id="r2"
                          type="radio"
                          name="radio"
                          value="2"
                          checked={orderDetPerid.localpickup === 2}
                          onChange={handleRbOnchange}
                        ></input>
                        <label htmlFor="r2">No, I'll mail them</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>PSA Up-charge Occurred (add below)</label>

                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <input
                        checked={orderDetPerid.PSAUpcharge === 1}
                        id="r1"
                        type="radio"
                        name="radio"
                        value="1"
                      ></input>
                      <label htmlFor="r1"> Yes</label>
                    </li>
                    <li className="list-inline-item">
                      <input
                        checked={orderDetPerid.PSAUpcharge === 0}
                        id="r2"
                        type="radio"
                        name="radio"
                        value="0"
                      ></input>
                      <label htmlFor="r2"> No</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>PSA Calculated Upcharge from Order</label>
                  <input
                    type="text"
                    className="form-control disabled"
                    disabled
                    onChange={(e) => seteditInsamount(e.target.value)}
                    value={editInsamount}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Card Saver Qty</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditcardsaverqty(e.target.value)}
                    value={editcardsaverqty}
                  ></input>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Card Saver Price</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditcardsaverprice(e.target.value)}
                    value={editcardsaverprice}
                  ></input>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Total Price Card Saver</label>
                  <input
                    defaultValue={orderDetPerid.orderTotal}
                    type="text"
                    className="form-control disabled"
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Number of Non Logged Cards</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={orderDetPerid.NonLoggedCardCount}
                    onChange={(e) => seteditnonloggedcardCount(e.target.value)}
                    value={editnonloggedcardCount}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Per Card Price of Non Logged Card</label>
                  <input
                    defaultValue={orderDetPerid.Percardpriceofnonloggedcard}
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditpercardprice(e.target.value)}
                    value={editpercardprice}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Number of Kicks from service level (input)</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditnoofkicksfromSL(e.target.value)}
                    value={editnoofkicksfromSL}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Kicks from Review</label>
                  <input
                    defaultValue={orderDetPerid.Kicksfromreview}
                    type="text"
                    className="form-control disabled"
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Number of Review Passes</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditnoofreviewpasses(e.target.value)}
                    value={editnoofreviewpasses}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Passes Price - Enter $5</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditpassesprice(e.target.value)}
                    value={editpassesprice}
                  ></input>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
            <button className="btn btn-primary" onClick={updateOrderdetails}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>

        <ToastContainer
          position="top-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="row">
          <div className="col-lg-2 noleftrightpadding">
            <UsidePanel></UsidePanel>
          </div>
          <div className="col-lg-10 noleftrightpadding">
            <Uheader></Uheader>
            {ODdetails.map((order) => (
              <>
                <div className="col-lg-12 my-4 px-4">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <div>
                        {order.isorderpaid ? (
                          <Link
                            to="#"
                            className="btn btn-secondary"
                            onClick={(e) =>
                              Statusnotify("Order already Marked as paid")
                            }
                          >
                            <BiCheckDouble></BiCheckDouble> Order Paid: Done
                          </Link>
                        ) : (
                          <div className="admintopmenu">
                            <Link to="#" onClick={markorderpaid}>
                              Mark Order Paid
                            </Link>
                          </div>
                        )}
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="admintopmenu">
                        <Link onClick={handleViewinfopopupShow}>
                          View Customer Info
                        </Link>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="admintopmenu">
                        <Link to="#" onClick={handlepsasubpopupshow}>
                          PSA Copy
                        </Link>
                      </div>
                    </li>

                    <li className="list-inline-item">
                      <div className="admintopmenu">
                        <Link to="#" onClick={handlenonpsasubpopupshow}>
                          Non PSA Copy
                        </Link>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="admintopmenu">
                        <Link
                          to="#"
                          onClick={(e) => updateOrderStatus({ id: 1 })}
                        >
                          Mark As Logged
                        </Link>
                      </div>
                    </li>
                    {/* <li className="list-inline-item">
                     <div className="admintopmenu">
                        <Link to="#">Order History</Link>
                      </div>
                  </li> */}
                    <li className="list-inline-item">
                      <div className="admintopmenu">
                        <Link to="#">TAX Reciept</Link>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="Dashboardsec box-shadow helpform">
                  <div className="row">
                    <div className="Topl">
                      <span className="heading-level-2 mb-3">
                        {" "}
                        Order Details
                      </span>
                    </div>
                    <div className="mt-2 main-card">
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">Order Id:</label>
                            <p className="mb-0">{order.orderid}</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Order Date:
                            </label>
                            <p className="mb-0">22 April 2023</p>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Customer Name:
                            </label>
                            <p className="mb-0">
                              {user.name} {user.lastname}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Customer Email:
                            </label>
                            <p className="mb-0">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Service Level
                            </label>
                            <p className="mb-0">{order.servicelevel}</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Total Cards
                            </label>
                            <p className="mb-0">{order.cardcount}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Order Status
                            </label>
                            <p className="mb-0">{order.orderStatus}</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Total Card Price
                            </label>
                            <p className="mb-0">$ {order.totalprice}</p>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Shipment Fee
                            </label>
                            <p className="mb-0">$ 15</p>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              No of Non Logged Cards
                            </label>
                            <p className="mb-0"> 0</p>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Price Per Non Logged Card
                            </label>
                            <p className="mb-0"> 0</p>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Non-Logged Cards Price
                            </label>
                            <p className="mb-0"> 0</p>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Total Price Card Saver
                            </label>
                            <p className="mb-0">$ 0.00</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Card Saver Qty
                            </label>
                            <p className="mb-0">0</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Card Saver Price
                            </label>
                            <p className="mb-0">$ 0</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              PSA Upcharge
                            </label>
                            <p className="mb-0"> $ 0</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4"> PSA Sub#</label>
                            <p className="mb-0"> {order.PSASub}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">SGC Photo</label>
                            <p className="mb-0">0</p>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Customer CSV
                            </label>
                            <p className="mb-0">$ 0</p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Review Price
                            </label>
                            <p className="mb-0"> $ 0</p>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Cell Phone
                            </label>
                            <p className="mb-0"> {order.textmessagealert}</p>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Drop Off & Pickup Location
                            </label>
                            <p className="mb-0"> 0</p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3 mb-4">
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Insurance Ammount
                            </label>
                            <p className="mb-0">$ {order.insuranceammount}</p>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Total Insurance Cost
                            </label>
                            <p className="mb-0">
                              $ {order.caculatedinsurancecost}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="statbox">
                            <label className="heading-level-4">
                              Order Total
                            </label>
                            <p className="mb-0">$ {order.TotalPrice}</p>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="statbox">
                            <label className="heading-level-4">
                              {" "}
                              Local Pickup & Dropoff
                            </label>
                            <p className="mb-0">
                              {order.localpickup === 1 ? (
                                <label>Yes, I'll drop & pickup cards</label>
                              ) : (
                                <label>No, I will Mail Them</label>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 my-2">
                    <div className="row">
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <div className="admintopmenu">
                            <Link to="#" onClick={handleEditShow}>
                              Edit Order
                            </Link>
                          </div>
                        </li>
                        <li className="list-inline-item">
                          <div className="admintopmenu">
                            <Link to="#" onClick={handleEditGradeShow}>
                              Edit Grades
                            </Link>
                          </div>
                        </li>
                        <li className="list-inline-item">
                          <div className="admintopmenu">
                            <Link
                              to="#"
                              onClick={(e) => sendOrderStatusOnEmail({ id: 1 })}
                            >
                              Send Status Update
                            </Link>
                          </div>
                        </li>
                        <li className="list-inline-item">
                          <div className="admintopmenu">
                            <Link to="#">Send Print Label to Ship</Link>
                          </div>
                        </li>

                        <li className="list-inline-item">
                          <div className="admintopmenu">
                            <Link
                              to="#"
                              onClick={(e) => sendOrderStatusOnEmail({ id: 2 })}
                            >
                              Send Reminder To Pay
                            </Link>
                          </div>
                        </li>
                        <li className="list-inline-item">
                          <div className="admintopmenu">
                            <Link
                              to="#"
                              onClick={(e) => sendOrderStatusOnEmail({ id: 3 })}
                            >
                              Send Grade Pop Reminder
                            </Link>
                          </div>
                        </li>
                        <li className="list-inline-item mt-3">
                          <div className="admintopmenu">
                            <Link
                              to="#"
                              onClick={(e) => sendOrderStatusOnEmail({ id: 4 })}
                            >
                              Email Customer Reciept(walk-ins){" "}
                            </Link>
                          </div>
                        </li>

                        <li className="list-inline-item mt-3">
                          <div className="admintopmenu">
                            <Link
                              to="#"
                              onClick={(e) => updateOrderStatus({ id: 2 })}
                            >
                              Email Review Result{" "}
                            </Link>
                          </div>
                        </li>
                        <li className="list-inline-item mt-3">
                          <div className="admintopmenu">
                            <Link to="#">Packing List</Link>
                          </div>
                        </li>
                        <li className="list-inline-item mt-3">
                          <div className="admintopmenu">
                            <Link to="/payment/invoice" >Send Invoice</Link>
                          </div>
                        </li>

                        {/* Send Delivery Address Update Link button */}
                        <SendDeliveryAddressUpdateLink />

                        {/* update order timeline */}
                        <UpdateDeliveryTimeline />

                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ))}

            <div className="Dashboardsec box-shadow helpform">
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
                      Add match card below indivudaly by filling in all required
                      fields.
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
                      onClick={updatecarddetails}
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

            <div className="Dashboardsec box-shadow">
              <div className="row orer-details">
                <div className="Topl mb-3">
                  <div className="row">
                    <div className="col-lg-9">
                      <span className="heading-level-2">Your Logged Cards</span>
                    </div>
                    <div className="col-lg-3">
                      <DownloadTableExcel
                        filename="Cards Records"
                        sheet="Cards Data"
                        currentTableRef={tableRef.current}
                      >
                        <button className="submitbtn w270">
                          <TbTableExport></TbTableExport> Export To excel{" "}
                        </button>
                      </DownloadTableExcel>
                    </div>
                  </div>

                  {isEmpty ? (
                    <label className="text-danger mt-3 fs-5 fw-semibold">
                      No Card List Found For This Order. Looged Your Card for
                      this order
                    </label>
                  ) : (
                    <Table
                      striped
                      bordered
                      hover
                      className="mt-3"
                      ref={tableRef}
                    >
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
            <div className="row">
              <div className="col-lg-6">
                <div className="Dashboardsec box-shadow">
                  <div className="Topl mb-3">
                    <span className="heading-level-2">Add PSA SUB #</span>
                  </div>
                  <div>
                    <div className="form-group">
                      <label className="fw-bold">PSA SUB #</label>
                      <input
                        type="text"
                        onChange={(e) => setpsasubno(e.target.value)}
                        value={psasubno}
                        className="form-control"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="fw-bold">Order Status</label>
                      <select
                        name="ServiceLevel"
                        id="ServiceLevel"
                        className="form-control"
                        disabled
                      >
                        <option value="1" key="ddl name" name="select">
                          Awating Card List
                        </option>
                      </select>
                    </div>
                    <p className="mt-3">Add number on individual basis </p>
                    <p>
                      This sets status to:{" "}
                      <span className="bg-danger px-3 py-1 text-white rounded-3 mt-2">
                        Cards Logged
                      </span>{" "}
                    </p>
                    <p>
                      <b>NOTE:</b> This does NOT send an email OR update Card
                      status. This is done on the Order Logging Screen when you
                      click Mark as Logged.
                      <span className="fw-bold">
                        HOWEVER, IF status above is Cards Rec'd, Cards Sent to
                        PSA or Grades Popped, this WILL update PSA # in the Card
                        list as shown above.
                      </span>
                    </p>
                    <p>
                      <b> Protip:</b> Add a temporary number here like 999. Then
                      go back to the main orders screen and do a bulk update and
                      set condition of when PSA Sub # is 999 set PSA Sub # to
                      actual submission number given.
                    </p>

                    <button
                      className="submitbtn d-block mt-4 mt-2"
                      type="submit"
                      onClick={updatePSANo}
                    >
                      Add PSA SUB
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="Dashboardsec box-shadow">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="Topl mb-3">
                        <span className="heading-level-2">Order Notes</span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <Link className="topbtn" onClick={handleShow}>
                        Add New Note
                      </Link>
                    </div>
                  </div>

                  <>
                    {isorderNotes ? (
                      ordernotes.map((notes) => (
                        <div className="statebox mb-3 mt-3" key={notes._id}>
                          <div className="row">
                            <div className="col-lg-8">
                              <div className="form-group">
                                <label className="heading-level-4">
                                  Notes Date
                                </label>
                                <label>{notes.notedate}</label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="heading-level-4">
                                  User Name
                                </label>
                                <label>{notes.adminid}</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <label className="heading-level-4">Notes:</label>
                            <p>{notes.notes}</p>
                          </div>

                          <div className="row">
                            <button
                              className="btn-danger"
                              onClick={() => handleDelete(notes)}
                            >
                              Delete Note
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <label className="text-danger">
                        No Order Notes Found for this details
                      </label>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
