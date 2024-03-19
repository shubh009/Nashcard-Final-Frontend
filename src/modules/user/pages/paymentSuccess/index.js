import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function index() {

  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', marginTop: '15%' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="green"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: '20px' }}
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>

      <h2 style={{ marginBottom: '20px' }}>Payment Success</h2>


      <Button variant="outlined" onClick={() => { navigate("/user/dashbaord") }}>
        Go To Dashbaord
      </Button>

    </div>
  );
}
