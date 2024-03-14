import React, { useState } from 'react';
import { Button, Breadcrumbs, Link, TextField, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownChange = (event) => {
    setSelectedItem(event.currentTarget.textContent);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="shadow-sm container-fluid" style={{ height: '50px', backgroundColor: 'white' }}>
      <style type="text/css">
        {`
          .btn-flat {
            background-color: white;
            color: black;
            border: none;
          }
          .btn-xxl {
            padding: 1rem 1.5rem;
            font-size: 1.5rem;
          }
        `}
      </style>
      <div className="h-100 d-flex align-items-center">
        <div className="d-flex gap-3 align-items-center w-50">
          <Button
            variant="flat"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleMenuOpen}
          >
            {selectedItem}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDropdownChange}>Dashboard</MenuItem>
            <MenuItem onClick={handleDropdownChange}>Invoices</MenuItem>
            <MenuItem onClick={handleDropdownChange}>Something else</MenuItem>
          </Menu>
          <TextField
            type="text"
            variant="outlined"
            placeholder="Search..."
            InputProps={{ className: 'border-0' }}
          />
        </div>
      </div>

      <div className="mt-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="#" color="inherit">
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={24} viewBox="-6 2 28 24">
              <path d="M12.56 2.171a1 1 0 0 0-1.12 0l-8 5.4A1 1 0 0 0 3 8.4V21a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.4a1 1 0 0 0-.44-.829ZM14 20h-4v-6h4Zm5 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5V8.932l7-4.725 7 4.725Z" />
            </svg>
          </Link>
          <Link color="inherit" href="#" onClick={() => setSelectedItem('Dashboard')}>
            Dashboard
          </Link>
          <Link color="inherit" href="#" onClick={() => setSelectedItem('Invoices')}>
            {selectedItem}
          </Link>
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Navbar;
