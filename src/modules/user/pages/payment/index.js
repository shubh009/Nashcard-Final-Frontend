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
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: '20px' }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
      <h2 style={{ marginBottom: '20px' }}>Payment Failed</h2>


      <Button variant="outlined" onClick={()=>{ navigate("/user/dashbaord") }}>
        Go To Home
      </Button>

    </div>
  );
}
