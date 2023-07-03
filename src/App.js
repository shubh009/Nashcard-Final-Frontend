import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userlogin from './Auth/sign-in';
import Usersignup from './Auth/NewSignup';
import ForgotPassword from './Auth/forgotpassword';
import FPassword from './Auth/NewForgotPassword';
import Demo from './modules/user/pages/demo/demo';
import UDashbaord from './modules/user/pages/dashboard/dashboard';
import UShippingDetails from './modules/user/pages/dashboard/vieworder';
import UGradingOrder from './modules/user/pages/gradingorder/index';
import UAddCard from './modules/user/pages/Add-card/index';
import UProfile from './modules/user/pages/profile/index';
import UReview from "./modules/user/pages/Review/index";
import UReviewList from "./modules/user/pages/Review/review-list";
import UHelp from "./modules/user/pages/help/index";
import UHelpList from "./modules/user/pages/help/querylist" 
import Adashboard from "./modules/admin/pages/dashboard";
import Orderdetails from "./modules/admin/pages/orderdetails/index";
import Grades from "./modules/admin/pages/grades/index";
import Upcharges from "./modules/admin/pages/upcharges/index";
import Servicelevel from "./modules/admin/pages/servicetracking/index";
import AvgCards from "./modules/admin/pages/servicetracking/avgcards";
import CardTracking from "./modules/admin/pages/servicetracking/cardTracking"
import PsaOrders from './modules/admin/pages/servicetracking/psaOrders';
import Cards from './modules/admin/pages/cards';
import CardDetails from './modules/admin/pages/cards/cardDetails';
import Customer from "./modules/admin/pages/customers/customers";
import Address from './modules/admin/pages/customers/address';
import Help from './modules/admin/pages/help';
import Userdetails from './modules/admin/pages/customers/userdetails';
import OrederNotes from './modules/admin/pages/ordernotes';
import Projects from './modules/admin/pages/projects/projects';
import UpdateDetails from './modules/admin/pages/customers/updateDetails';
import EditProject from './modules/admin/pages/projects/editProject';
import LogCard from './modules/admin/pages/logcards/logcard';
import LocalPicks from './modules/admin/pages/localpicks';
import SGCPhotos from './modules/admin/pages/sgcphotos/index';
import ReviewSend from './modules/admin/pages/review/index';
import PaidOrders from './modules/admin/pages/paidorders/index'
import PSASubTracker from './modules/admin/pages/psa-subtracker/index';
import MphasisReview from './modules/admin/pages/reviewOrder/index';
import EditGrade from './modules/admin/pages/customers/editGrade';
import Shipping from './modules/admin/pages/shipping/shipping';
import PsasubmissionDetails from './modules/admin/pages/shipping/psa-submission-details';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/user/demo" element={<Demo></Demo>}></Route>
        <Route path="/login" element={<Userlogin></Userlogin>}></Route>
        <Route path="/signup" element={<Usersignup></Usersignup>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/fpassword" element={<FPassword></FPassword>}></Route>
        <Route path='/user/dashbaord' element={<UDashbaord></UDashbaord>}></Route>
        <Route path='/user/new-grading-order' element={<UGradingOrder></UGradingOrder>}></Route>
        <Route path='user/add-card' element={<UAddCard></UAddCard>}></Route>
        <Route path='user/profile' element={<UProfile></UProfile>}></Route>
        <Route path='user/submit-review' element={<UReview></UReview>}></Route>
        <Route path='user/review-list/' element={<UReviewList></UReviewList>}></Route>
        <Route path='user/help' element={<UHelp></UHelp>}></Route>
        <Route path='user/query-list' element={<UHelpList></UHelpList>}></Route>
        <Route path='user/view-Order/shipping-details' 
               element={<UShippingDetails></UShippingDetails>}></Route>
        <Route path='admin/dashboard/' element={<Adashboard></Adashboard>}></Route>
        <Route path='admin/order-details/' element={<Orderdetails></Orderdetails>}></Route>
        <Route path='admin/grades/' element={<Grades></Grades>}></Route>
        <Route path='admin/upcharges/' element={<Upcharges></Upcharges>}></Route>
        <Route path='admin/service-level-tracking/' element={<Servicelevel></Servicelevel>}></Route>
        <Route path='admin/average-cards/' element={<AvgCards></AvgCards>}></Route>
        <Route path='admin/card-tracking/' element={<CardTracking></CardTracking>}></Route>
        <Route path='admin/psa-orders/' element={<PsaOrders></PsaOrders>}></Route>
        <Route path='admin/cards/' element={<Cards></Cards>}></Route>
        <Route path='admin/card/card-details/' element={<CardDetails></CardDetails>}></Route>
        <Route path='admin/customers/' element={<Customer></Customer>}></Route>
        <Route path='admin/address/' element={<Address></Address>}></Route>
        <Route path='admin/help/' element={<Help></Help>}></Route>
        <Route path='admin/customer/user-details' element={<Userdetails></Userdetails>}></Route>
        <Route path='admin/order-notes' element={<OrederNotes></OrederNotes>}></Route>
        <Route path='admin/projects' element={<Projects></Projects>}></Route>
        <Route path='admin/update-details' element={<UpdateDetails></UpdateDetails>}></Route>
        <Route path='admin/edit-project' element={<EditProject></EditProject>}></Route>
        <Route path='admin/log-cards' element={<LogCard></LogCard>}></Route>
        <Route path='admin/local-picks' element={<LocalPicks></LocalPicks>}></Route>
        <Route path='admin/sgc-photos' element={<SGCPhotos></SGCPhotos>}></Route>
        <Route path='admin/review-send' element={<ReviewSend></ReviewSend>}></Route>
        <Route path='admin/paid-orders' element={<PaidOrders></PaidOrders>}></Route>
        <Route path='admin/psa-subtracker' element={<PSASubTracker></PSASubTracker>}></Route>
        <Route path='admin/memphis-review' element={<MphasisReview></MphasisReview>}></Route>
        <Route path='admin/edit-grades' element={<EditGrade></EditGrade>}></Route>
        <Route path='admin/shipping' element={<Shipping></Shipping>}></Route>
        <Route path='admin/shipping/psa-submission-details' element={<PsasubmissionDetails></PsasubmissionDetails>}></Route>
      
      </Routes>
    </BrowserRouter>

  );
}

export default App;


//React.js port no: 3001
