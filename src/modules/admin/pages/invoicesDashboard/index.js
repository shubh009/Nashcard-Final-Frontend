import React, { useEffect, useState } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import InvoicesPage from "./InvoicesPage";
import axios from "axios";
import InsightPage from "./InsightPage";

const fetchData = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/get/invoice/insights`
  );
  return res.data.data;
};

const index = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    getData();
  }, [])

  return (
    <div className="container-fluid " id="admin">

      <div className="row" id="grade">
        <div className="col-lg-2 noleftrightpadding">
          <UsidePanel></UsidePanel>
        </div>
        <div className="col-lg-10 noleftrightpadding">
          <Uheader></Uheader>
          <div className="row">
          </div>

          {/* invoice states */}
           <InsightPage data={data} setData={setData} />

          {/* display all invoices list in table */}
          <InvoicesPage />

        </div>
      </div>
    </div>
  );
};

export default index;
