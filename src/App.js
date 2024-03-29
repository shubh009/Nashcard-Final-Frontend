import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userlogin from "./Auth/sign-in";
import Usersignup from "./Auth/NewSignup";
import ForgotPassword from "./Auth/forgotpassword";
import FPassword from "./Auth/NewForgotPassword";
import Demo from "./modules/user/pages/demo/demo";
import UDashbaord from "./modules/user/pages/dashboard/dashboard";
import UShippingDetails from "./modules/user/pages/dashboard/vieworder";
import UGradingOrder from "./modules/user/pages/gradingorder/index";
import UAddCard from "./modules/user/pages/Add-card/index";
import UProfile from "./modules/user/pages/profile/index";
import UReview from "./modules/user/pages/Review/index";
import UReviewList from "./modules/user/pages/Review/review-list";
import UHelp from "./modules/user/pages/help/index";
import UHelpList from "./modules/user/pages/help/querylist";
import Adashboard from "./modules/admin/pages/dashboard";
import Orderdetails from "./modules/admin/pages/orderdetails/index";
import Grades from "./modules/admin/pages/grades/index";
import Upcharges from "./modules/admin/pages/upcharges/index";
import Servicelevel from "./modules/admin/pages/servicetracking/index";
import AvgCards from "./modules/admin/pages/servicetracking/avgcards";
import CardTracking from "./modules/admin/pages/servicetracking/cardTracking";
import PsaOrders from "./modules/admin/pages/servicetracking/psaOrders";
import Cards from "./modules/admin/pages/cards";
import CardDetails from "./modules/admin/pages/cards/cardDetails";
import Customer from "./modules/admin/pages/customers/customers";
import Address from "./modules/admin/pages/customers/address";
import Help from "./modules/admin/pages/help";
import Userdetails from "./modules/admin/pages/customers/userdetails";
import OrederNotes from "./modules/admin/pages/ordernotes";
import Projects from "./modules/admin/pages/projects/projects";
import UpdateDetails from "./modules/admin/pages/customers/updateDetails";
import EditProject from "./modules/admin/pages/projects/editProject";
import LogCard from "./modules/admin/pages/logcards/logcard";
import LocalPicks from "./modules/admin/pages/localpicks";
import SGCPhotos from "./modules/admin/pages/sgcphotos/index";
import ReviewSend from "./modules/admin/pages/review/index";
import PaidOrders from "./modules/admin/pages/paidorders/index";
import PSASubTracker from "./modules/admin/pages/psa-subtracker/index";
import MphasisReview from "./modules/admin/pages/reviewOrder/index";
import EditGrade from "./modules/admin/pages/customers/editGrade";
import Shipping from "./modules/admin/pages/shipping/shipping";
import PsasubmissionDetails from "./modules/admin/pages/shipping/psa-submission-details";
import AddUsers from "./modules/admin/pages/manage-users/addUsers";
import Invoice from "./modules/admin/pages/invoice";
import InvoicesDashboard from "./modules/admin/pages/invoicesDashboard";
import UpdateDeliveryAddress from "./modules/user/pages/updateDeliveryAddress"
import PaymentFailed from "./modules/user/pages/paymentFailed"
import PaymentSuccess from "./modules/user/pages/paymentSuccess"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/demo" element={<Demo />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<Usersignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/fpassword" element={<FPassword />} />
        <Route path="/user/dashbaord" element={<UDashbaord />} />
        <Route path="/user/new-grading-order" element={<UGradingOrder />} />
        <Route path="user/add-card" element={<UAddCard />} />
        <Route path="user/profile" element={<UProfile />} />
        <Route path="user/submit-review" element={<UReview />} />
        <Route path="user/review-list/" element={<UReviewList />} />
        <Route path="user/help" element={<UHelp />} />
        <Route path="user/query-list" element={<UHelpList />} />
        <Route path="/user/payment/Failed" element={<PaymentFailed />} />
        <Route path="/user/payment/Success" element={<PaymentSuccess />} />
        <Route path="user/add-new-delivery-address/:_id" element={<UpdateDeliveryAddress />} />
        <Route path="/user/order-details/:_id" element={<Orderdetails />} />

        <Route
          path="user/view-Order/shipping-details"
          element={<UShippingDetails />}
        />
        <Route path="admin/dashboard/" element={<Adashboard />} />
        <Route path="admin/order-details/" element={<Orderdetails />} />
        <Route path="admin/grades/" element={<Grades />} />
        <Route path="admin/invoices/" element={<InvoicesDashboard />} />
        <Route path="admin/upcharges/" element={<Upcharges />} />
        <Route
          path="admin/service-level-tracking/"
          element={<Servicelevel />}
        />
        <Route path="admin/average-cards/" element={<AvgCards />} />
        <Route path="admin/card-tracking/" element={<CardTracking />} />
        <Route path="admin/psa-orders/" element={<PsaOrders />} />
        <Route path="admin/cards/" element={<Cards />} />
        <Route path="admin/card/card-details/" element={<CardDetails />} />
        <Route path="admin/customers/" element={<Customer />} />
        <Route path="admin/address/" element={<Address />} />
        <Route path="admin/help/" element={<Help />} />
        <Route path="admin/customer/user-details" element={<Userdetails />} />
        <Route path="admin/order-notes" element={<OrederNotes />} />
        <Route path="admin/projects" element={<Projects />} />
        <Route path="admin/update-details" element={<UpdateDetails />} />
        <Route path="admin/edit-project" element={<EditProject />} />
        <Route path="admin/log-cards" element={<LogCard />} />
        <Route path="admin/local-picks" element={<LocalPicks />} />
        <Route path="admin/sgc-photos" element={<SGCPhotos />} />
        <Route path="admin/review-send" element={<ReviewSend />} />
        <Route path="admin/paid-orders" element={<PaidOrders />} />
        <Route path="admin/psa-subtracker" element={<PSASubTracker />} />
        <Route path="admin/memphis-review" element={<MphasisReview />} />
        <Route path="admin/edit-grades" element={<EditGrade />} />
        <Route path="admin/shipping" element={<Shipping />} />
        <Route
          path="admin/shipping/psa-submission-details"
          element={<PsasubmissionDetails />}
        />
        <Route path="admin/add-new-user" element={<AddUsers />} />
        <Route path="payment/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//React.js port no: 3001
