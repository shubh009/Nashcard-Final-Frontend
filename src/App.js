import "./App.css";
import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem("userid"));
    if (localStorage.getItem("userid")) {
      navigate("/user/dashbaord");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/user/demo" element={<Demo></Demo>}></Route>
      <Route path="/login" element={<Userlogin></Userlogin>}></Route>
      <Route path="/signup" element={<Usersignup></Usersignup>}></Route>
      <Route
        path="/forgot-password"
        element={<ForgotPassword></ForgotPassword>}
      ></Route>
      <Route path="/fpassword" element={<FPassword></FPassword>}></Route>
      <Route path="/user/dashbaord" element={<UDashbaord></UDashbaord>}></Route>
      <Route
        path="/user/new-grading-order"
        element={<UGradingOrder></UGradingOrder>}
      ></Route>
      <Route path="user/add-card" element={<UAddCard></UAddCard>}></Route>
      <Route path="user/profile" element={<UProfile></UProfile>}></Route>
      <Route path="user/submit-review" element={<UReview></UReview>}></Route>
      <Route
        path="user/review-list/"
        element={<UReviewList></UReviewList>}
      ></Route>
      <Route path="user/help" element={<UHelp></UHelp>}></Route>
      <Route path="user/query-list" element={<UHelpList></UHelpList>}></Route>
      <Route
        path="user/view-Order/shipping-details"
        element={<UShippingDetails></UShippingDetails>}
      ></Route>
      <Route
        path="admin/dashboard/"
        element={<Adashboard></Adashboard>}
      ></Route>
      <Route
        path="admin/order-details/"
        element={<Orderdetails></Orderdetails>}
      ></Route>
      <Route path="admin/grades/" element={<Grades></Grades>}></Route>
      <Route path="admin/upcharges/" element={<Upcharges></Upcharges>}></Route>
      <Route
        path="admin/service-level-tracking/"
        element={<Servicelevel></Servicelevel>}
      ></Route>
      <Route
        path="admin/average-cards/"
        element={<AvgCards></AvgCards>}
      ></Route>
      <Route
        path="admin/card-tracking/"
        element={<CardTracking></CardTracking>}
      ></Route>
    </Routes>
  );
}

export default App;

//React.js port no: 3001
