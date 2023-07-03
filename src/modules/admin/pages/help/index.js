import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import '../help/style.css'

const help=()=>{

    return(
    <div className="container-fluid " id="admin">
         <div className="row" id="grade">
              <div className="col-lg-2 noleftrightpadding">
                   <UsidePanel></UsidePanel>
              </div>
              <div className="col-lg-10 noleftrightpadding">
                 <Uheader></Uheader>
                 
                 <div className="row">
                   <div className="col-lg-12">
                       <div className="Dashboardsec box-shadow helpform mb-3">
                          <div className="Topl">
                            <span className="heading-level-2">Adding New Order</span>
                            <p className="mb-0"><b>Purpose</b>: Walk-in customer, new customer, current customer, custom order creation</p>
                            <p><b>Page Link</b>: <Link to="#">Orders</Link></p>
                           </div>
                           <div className="mt-2 videoframe">
                           <iframe width="100%" height="100%" src="https://www.youtube.com/embed/CLRV29OnvYQ" title="WalkIn Customer:Create Customer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                           </div>
                        </div>
                        <div className="Dashboardsec box-shadow helpform mb-3">
                          <div className="Topl">
                            <span className="heading-level-2">Adjusting Order to Pre 10/1/20 Pricing</span>
                            <p className="mb-0"><b>Purpose</b>: Price change occured on 10/1/20 for any orders unbilled. Adjust pricing via order details page and then update each card qty</p>
                            <p><b>Page Link</b>: <Link to="#">Grades</Link></p>
                           </div>
                           <div className="mt-2 videoframe">
                           <iframe width="100%" height="100%" src="https://www.youtube.com/embed/pKI0qthftiM" title="invoicing Old Orders pre 10 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                           </div>
                        </div>
                        <div className="Dashboardsec box-shadow helpform mb-3">
                          <div className="Topl">
                            <span className="heading-level-2">Order Tracking</span>
                            <p className="mb-0"><b>Purpose</b>: Research orders based off of time. Find Super Express orders that are above the 5 day processing time. Or find orders that are taking too long for PSA to check them in. Also, view timeline information about orders!</p>
                            <p><b>Page Link</b>: <Link to="#">Order Tracking</Link></p>
                           </div>
                           <div className="mt-2 videoframe">
                           <iframe width="100%" height="100%" src="https://www.youtube.com/embed/_z3iCB5D2wc" title="Order Tracking" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                           </div>
                        </div>
                    </div>
                  </div>
              </div>
         </div>
    </div>
    )


}
export default help