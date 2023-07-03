import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import "./upcharges.css";

const index = () => {
  const [searchDatas, setSearchData] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const setdata = (e) => {
    const { name, value } = e.target;
    setInpVal((inpVal) => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { cert, orderid, PSASubs } = inpVal;
    let PSASub = parseInt(PSASubs);
    const getdata = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/order-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cert,
          orderid,
          PSASub,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          if (data.length > 0) {
            setSearchData(data);
          } else {
            setSearchData([]);
          }
        }
      }
    };
    getdata();
  };
  return (
    <div className="container-fluid " id="admin">
      <div className="row" id="grade">
        <div className="col-lg-2 noleftrightpadding">
          <UsidePanel></UsidePanel>
        </div>
        <div className="col-lg-10 noleftrightpadding">
          <Uheader></Uheader>
          <div className="row">
            <div className="col-lg-4">
              <div className="Dashboardsec box-shadow upchargesform">
                <div className="Topl">
                  <span className="heading-level-2">Grades Search</span>
                </div>
                <div className="form-group pt-3">
                  <label>Cert</label>
                  <input
                    name="cert"
                    onChange={setdata}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Order#</label>
                  <input
                    name="orderid"
                    onChange={setdata}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Sub#</label>
                  <input
                    name="PSASubs"
                    onChange={setdata}
                    type="text"
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group pt-3">
                  <Link className="submitbtn" onClick={handleSubmit}>
                    Search
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="Dashboardsec box-shadow helpform">
                <div className="Topl">
                  <span className="heading-level-2">
                    Grade Search Direction
                  </span>
                </div>
                <div className="form-group">
                  <ol className="list-group-numbered">
                    <li className="list-group-item">
                      Open orders@nashcards.com gmail account
                    </li>
                    <li className="list-group-item">
                      Search for the PSA Sub # in the search bar
                    </li>
                    <li className="list-group-item">
                      Look for emails that are usually the most recent{" "}
                      <Link to="#">(example a)</Link>
                    </li>
                    <li className="list-group-item">
                      Once found, open the PDF <Link to="#">(example b)</Link>{" "}
                      and search for the upcharges (usually highlighted in
                      yellow and contain a different amount than their billing
                      level)
                    </li>
                    <li className="list-group-item">
                      Determine the PSA Upcharge amount:
                      <ol className="list-group-numbered">
                        <li className="list-group-item">
                          Determine the PSA Upcharged Service Level
                        </li>
                        <li className="list-group-item">
                          Determine the equivalent Nashcards Service Level
                          Pricing
                        </li>
                        <li className="list-group-item">
                          Upcharged Nashcards Service Level - Order Service
                          Level = PSA Upcharge Amount
                        </li>
                      </ol>
                    </li>
                    <li className="list-group-item">
                      Search NAP by the Cert Number from the PSA Emailed PDF{" "}
                    </li>
                    <li className="list-group-item">
                      Enter the PSA Upcharge amount and click update (processing
                      time is long)
                    </li>
                    <li className="list-group-item">
                      Refresh the table hitting the "refresh" button
                    </li>
                    <li className="list-group-item">
                      Click the button "Mark Update Occured"
                    </li>
                    <li className="list-group-item">
                      Go back to order or the grades screen to verify the order
                      was updated{" "}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="Dashboardsec box-shadow helpform">
                <div className="Topl">
                  <span className="heading-level-2">Grades Data Table</span>
                </div>
                <div className="mt-2">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="w80">Order#</th>
                        <th className="w80">PSA Sub#</th>
                        <th className="w80">Cert</th>
                        <th className="w80">Grade</th>
                        <th className="w80">Description</th>
                        <th className="w150">PSA Upcharge Amount</th>
                        <th className="w220">Mark Update Occured</th>
                      </tr>
                      {searchDatas
                        ? searchDatas.map((el) => {
                            return (
                              <tr key={el._id}>
                                <td>{el.orderid}</td>
                                <td>{el.PSASub}</td>
                                <td>{el.cert}</td>
                                <td>{el.grade}</td>
                                <td>{el.description}</td>
                                <td>{el.PSAUpchargeAmmount}</td>
                                <td>
                                  <Link to="#" className="btn btn-primary">
                                    Mark Update Occured
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </thead>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
