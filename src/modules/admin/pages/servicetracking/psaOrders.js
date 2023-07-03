import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/admin/sidepanel/sidepanel";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "react-bootstrap/Card";
const PsaOrders = () => {
  const [searchDatas, setSearchData] = useState([]);
  const [orderid, setorderid] = useState("");
  const [orderIdAutoCom, setOrderIdAutoCom] = useState([]);
  const [orderIdMatch, setOrderMatch] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const psasub = orderid;
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/search-psa-orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            psasub,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
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

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/psasub-autocomplete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        console.log(data);
        if (data.length > 0) {
          setOrderIdAutoCom(data);
        }
      }
    };
    getdata();
  }, []);

  const searchOrderId = (text) => {
    if (!text) {
      setOrderMatch([]);
    } else {
      let matches = orderIdAutoCom.filter((orderid) => {
        const regex = new RegExp(`${text}`, "gi");
        return orderid.orderid.match(regex);
      });
      setOrderMatch(matches);
    }
  };
  const handleSuggestion = (suggestion) => {
    setorderid(suggestion);
    setOrderMatch([]);
  };

  const orderDetailsSearch = async (uid, orderid, grname) => {
    localStorage.setItem("aUdetailsId", uid);
    localStorage.setItem("aUorderid", orderid);
    localStorage.setItem("aGradingCompanyName", grname);
  };

  return (
    <div className="container-fluid " id="admin">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="row" id="grade">
        <div className="col-lg-2 noleftrightpadding">
          <UsidePanel></UsidePanel>
        </div>
        <div className="col-lg-10 noleftrightpadding">
          <Uheader></Uheader>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dashboardsec box-shadow helpform">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="Topl">
                      <span className="heading-level-2">Orders</span>
                    </div>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="fw-bold mb-2">PSA Sub #</label>
                      <input
                        type="textbox"
                        name="psasub"
                        value={orderid}
                        onChange={(e) => setorderid(e.target.value)}
                        onKeyDown={(e) => searchOrderId(e.target.value)}
                        className="form-control"
                      ></input>
                      {orderIdMatch
                        ? orderIdMatch.map((el, index) => {
                            return (
                              <Card title={el.orderid} key={index}>
                                <Card.Body
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleSuggestion(el.orderid)}
                                >
                                  {el.orderid}
                                </Card.Body>
                              </Card>
                            );
                          })
                        : null}
                    </div>
                  </div>

                  <div className="col-lg-4 mt-4">
                    <Link
                      onClick={handleSubmit}
                      className="submitbtn mt-1 float-start text-ce"
                    >
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Dashboardsec box-shadow helpform">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="Topl">
                      <span className="heading-level-2">Orders </span>{" "}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <Link className="topbtn">Export To CSV</Link>
                  </div>
                </div>

                <Table striped bordered hover className="mt-4">
                  <thead>
                    <tr>
                      <th className="w80">Order#</th>
                      <th className="w210">PSA Sub#</th>
                      <th className="w80">Service Level</th>
                      <th className="w150">Status</th>
                      <th className="w150">Order Total</th>
                      <th className="w150">Order Details </th>
                      <th className="w210">
                        Set All Cards in Order to PSA Sub#
                      </th>
                    </tr>
                    {searchDatas
                      ? searchDatas.map((el) => {
                          return (
                            <tr key={el._id}>
                              <td>{el.orderid}</td>
                              <td>{el.psasub}</td>
                              <td>{el.serviceLevel}</td>
                              <td>{el.status}</td>
                              <td>{el.orderTotal}</td>
                              <td>
                                <Link
                                  to="/admin/order-details/"
                                  className="text-danger"
                                  onClick={() =>
                                    orderDetailsSearch(
                                      el.userid,
                                      el.orderid,
                                      el.grcompanyname
                                    )
                                  }
                                >
                                  Order Details
                                </Link>
                              </td>
                              <td>
                                <Link className="text-danger">
                                  Set All Cards in Order to PSA Sub#
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
  );
};
export default PsaOrders;
