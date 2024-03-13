import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Logoimg from "../../../../assets/images/nashcard-logo.png";

//invoiceDetailsByOrderid

const Invoice = () => {
  const [dataLogCard, setDataLogCard] = useState([]);
  const orderid = localStorage.getItem("aUorderid");
  
    console.log( orderid );

  
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/getInvoiceDetails`, {
      method: "POST",
      body: JSON.stringify({ id: orderid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      const data = await res.json();
      console.log( data );
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
          console.log( data );
        //setDataLogCard(data);
      } else {
        setDataLogCard([]);
      }
    }
  };
  return (
    <>
      <div className="container-fluid  " id="admin">
        <div className="row" id="grade">
          
          <div className="col-lg-2"></div>        
          <div className="col-lg-8 fs-6">
            <div className=" bg-white helpform px-4 py-4">
              <div className="row ">
                <div className="col-lg-8">
                 <div className="row">
                    <div className="col-lg-6">
                       <div className="Topl">
                          <span className="mb-1 d-block w-100">Nashcards</span>
                          <span className="mb-1 d-block w-100">Nashcards.com</span>
                          <span className="mb-1">support@nashcards.com</span>
                       </div>
                    </div>
                    <div className="col-lg-6">
                       <div className="Topl">
                          <span className="mb-1 d-block w-100">300 Pleasent Gove Rd,</span>
                          <span className="mb-1 d-block w-100">#340</span>
                          <span className="mb-1 d-block w-100">MT Juliat, TN 37122</span>
                          <span className="mb-1 d-block w-100">United States</span>
                       </div>
                    </div>
                    <div className="col-lg-12">
                        <span className="mb-1 d-block w-100 fw-bold">James Maxwell</span>
                        <span className="mb-1 d-block w-100">6685</span>
                        <span className="mb-1 d-block w-100">Offalon, Missouri 606060</span>
                        <span className="mb-1 d-block w-100">United States</span>
                        <span className="mb-1 d-block w-100">5674568906</span>
                        <span className="mb-1 d-block w-100">James.v.Maxwell@ehi.com</span>
                    </div>
                 </div>
                 
                </div>
                <div className="col-lg-4">
                    <img src={Logoimg} width="70%"></img>
                    <Table borderless className="my-4">
                       <tbody>
                          <tr className="bg-white">
                            <td>Invoice No</td>
                            <td>53487</td>
                          </tr>
                          <tr className="bg-white">
                            <td>Invoice Date</td>
                            <td>October 5, 2023</td>
                          </tr>
                          <tr className="bg-white">
                            <td>Invoice Total</td>
                            <td>$135.00</td>
                          </tr>
                          <tr className="bg-white">
                            <td>Balance Due</td>
                            <td>53487</td>
                          </tr>
                          
                       </tbody>
                    </Table>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                   <Table borderless className="my-4">
                       <thead>
                          <tr>
                            <td>Item</td>
                          <td>Description</td>
                          <td>Unit Cost</td>
                          <td>Quantity</td>
                          <td>Line Total</td>
                          </tr>
                       </thead>
                       <tbody>
                          <tr className="bg-white border-bottom">
                            <td>PSA - Value Bulk (1980-Present)</td>
                            <td>Grading Services</td>
                            <td>$19.00</td>
                            <td>6</td>
                            <td>$114.00</td>
                          </tr>
                          <tr className="bg-white border-bottom">
                            <td>Shipping</td>
                            <td>Return Shipping</td>
                            <td>$15.00</td>
                            <td>1</td>
                            <td>$15.00</td>
                          </tr>
                          
                          
                       </tbody>
                    </Table>
                    
                  <div className="row mb-2">
                       <div className="col-lg-4">
                        
                       </div>
                       <div className="col-lg-4">
                        
                       </div>
                       <div className="col-lg-4 flex-row-reverse">
                         <table borderless width="100%">
                            <tr className="bg-white border-bottom">
                                <td>Net</td>
                                <td>$115</td>
                            </tr>
                            <tr className="bg-white border-bottom">
                                <td>Subtotal</td>
                                <td>$115</td>
                            </tr>
                            <tr className="bg-white border-bottom">
                                <td>Total</td>
                                <td>$115</td>
                            </tr>
                            <tr className="bg-white border-bottom">
                                <td>Paid to Date</td>
                                <td>$115</td>
                            </tr>
                            <tr className=" border-bottom">
                                <td>Balance Due</td>
                                <td>$115</td>
                            </tr>
                        </table>
                       </div>
                       
                       
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </>
  );
};
export default Invoice;
