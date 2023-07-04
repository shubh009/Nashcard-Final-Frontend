import React from "react";
import './sidepanel.css';
import NashcardLogo from '../../../assets/images/nashcard-logo.png';
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize, MdOutlineLocalShipping, MdShareLocation, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { BiCartAdd, BiUser, BiLogOutCircle, BiMailSend, BiReceipt, BiCategory } from "react-icons/bi";
import { VscPreview, VscSettings } from "react-icons/vsc";
import { TbHelp, TbUsers, TbNotes, TbTrack } from "react-icons/tb";
import {AiOutlineApi} from "react-icons/ai"
import {TiBusinessCard} from "react-icons/ti";
import {CgListTree} from "react-icons/cg"

const adminsidepanel=()=>{
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token-info');
        navigate("/login");

        //setIsLoggedin(false);
      };

return(
    <>
      <div className="sidepanel">
                <div className="sidepaneltop">
                    <img src={NashcardLogo} className="logo"></img>
                </div>
               <div id="admin">
                <div className="sidemenu">
                    <div className="sidemenu-item">
                        <div className="mactive">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/dashbaord"} >Dashboard</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiCartAdd></BiCartAdd>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/grades/"} >Grades</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiCategory></BiCategory>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/upcharges/"} >Upcharges</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiCategory></BiCategory>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/psa-orders/"} >PSA Orders</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiCategory></BiCategory>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/service-level-tracking/"} >Order Tracking</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiCategory></BiCategory>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/card-tracking/"} >Card Tracking</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                    
                     {/* <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiUser></BiUser>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"#"} >Tasks</Link>
                            </div>
                       </div>
                       </div>   
                    </div> */}

                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <TbHelp></TbHelp>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/cards/"} >Cards</Link>
                                </div>
                                
                       </div>
                       </div>   
                    </div>

                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <TbHelp></TbHelp>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/admin/help/"} >Help</Link>
                                </div>
                                
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <TbUsers></TbUsers>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/customers"} >Customers</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <MdOutlineLocalShipping></MdOutlineLocalShipping>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/shipping"} >Shipping</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <MdShareLocation></MdShareLocation>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/local-picks"} >Local Picks</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <TbNotes></TbNotes>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/order-notes"} >Order Notes</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <AiOutlineApi></AiOutlineApi>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/projects"} >Projects</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <TiBusinessCard></TiBusinessCard>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/log-cards"} >Logcards</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <MdOutlinePhotoSizeSelectActual></MdOutlinePhotoSizeSelectActual>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/sgc-photos"} >SGC Photos</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiMailSend></BiMailSend>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/review-send"} >Review Send</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <TbTrack></TbTrack>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/psa-subtracker"} >Sub Tracker</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiReceipt></BiReceipt>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/paid-orders"} >Recent Payment</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
                    {/* <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <CgListTree></CgListTree>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"#"} >CRC</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div> */}
                    {/* <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiLogOutCircle></BiLogOutCircle>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"#"} >Record Submission</Link>
                               
                            </div>
                       </div>
                       </div>   
                    </div> */}
                    <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                    <VscPreview></VscPreview>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                            <Link to={"/admin/memphis-review"} >Review</Link>
                               
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

export default adminsidepanel;