import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';

export default function SendDeliveryAddressUpdateLink() {
  const [loading, setLoading] = useState(false);
  const orderID = localStorage.getItem('aUorderid');

  const handleSendUpdateLink = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/send/Add/New/Adddress/Link/On/Email`, { orderID });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);        
      } else {
        toast.error('Failed to send request. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-inline-item mt-3">
      <div className="admintopmenu" style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={handleSendUpdateLink}>
      Send Delivery Address Update Link
        {loading && (
          <CircularProgress size={16} color="inherit" style={{ marginLeft: '10px', marginTop:"7px" }} />
        )}
       
      </div>
    </div>
  );
}
