import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './filterbar.css';

const FilterBar = ({ data, setData, pageNumber  }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    applyFilters();
  }, [selectedStatus, name, pageNumber]);

  const applyFilters = async () => {
    let url = `${process.env.REACT_APP_API_URL}/getInvoiceList?pageNumber=${pageNumber}`;
    if (selectedStatus) {
      url += `&status=${selectedStatus}`;
    }

    if (name) {
        url += `&clientName=${name}`;
    }

    const res = await axios.get(url);

    setData(res.data.data);
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };


  return (
    <div
      className="d-flex gap-3 m-4 justify-content-between align-items-center"
    >
      <div
        id="filterBar_first"
        className="d-flex justify-content-center align-items-center gap-3"
      >

        <Select
          value={selectedStatus}
          onChange={handleStatusChange}
          displayEmpty
          style={{ width: '160px' }}
        >
          <MenuItem value="">Filter by status</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </div>
      <div
        className="d-flex align-items-center justify-content-center gap-3"
      >
        <TextField
          value={name}
          onChange={handleNameChange}
          label="Search by user name"
          variant="outlined"
          style={{ width: '250px' }}
        />
      </div>
    </div>
  );
};

export default FilterBar;
