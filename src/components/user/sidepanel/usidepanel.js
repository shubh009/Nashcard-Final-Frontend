import React from "react";
import './usidestyle.css';
import NashcardLogo from '../../../assets/images/nashcard-logo.png';
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiCartAdd, BiUser, BiLogOutCircle } from "react-icons/bi";
import { VscPreview, VscSettings } from "react-icons/vsc";
import { TbHelp } from "react-icons/tb";

const usidePanel = () =>
{

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token-info');
        navigate("/login");

        //setIsLoggedin(false);
      };

    return (
        <>
            <div className="sidepanel">
                <div className="sidepaneltop">
                    <img src={NashcardLogo} className="logo"></img>
                </div>
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
                                <Link to={"/user/dashbaord"} >Dashboard</Link>
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
                                <Link to={"/user/new-grading-order"} >New Order</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <VscPreview></VscPreview>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/user/review-list/"} >My Reviews</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiUser></BiUser>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/user/profile"} >My Profile</Link>
                            </div>
                       </div>
                       </div>   
                    </div>
                     {/* <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <VscSettings></VscSettings>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/"} >Settings</Link>
                            </div>
                       </div>
                       </div>   
                    </div> */}
                    <hr></hr>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <TbHelp></TbHelp>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <Link to={"/user/query-list"} >Help</Link>
                                </div>
                                
                       </div>
                       </div>   
                    </div>
                     <div className="sidemenu-item">
                        <div className="normal">
                             <div className="row">
                            <div className="col-lg-3">
                                    <span className="iconn">
                                        <BiLogOutCircle></BiLogOutCircle>
                                    </span> 
                            </div>
                            <div className="col-lg-9 noleftrightpadding">
                                <button type="submit" className="logoutbtn" onClick={logout}>Logout</button>
                               
                            </div>
                       </div>
                       </div>   
                    </div>
               </div>
               
            </div>
        </>
    )
}
export default usidePanel;