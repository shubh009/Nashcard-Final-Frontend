import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import Chip from '@mui/material/Chip';

import axios from 'axios';

const CustomTable = ({ data, pageNumber, setPageNumber  }) => {
  const [disabledButtons, setDisabledButtons] = useState({});
  const [loading, setLoading] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // State to track anchor element
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to track selected invoice

  const handleAction = async (id, action) => {
    setSelectedInvoice(null); // Reset selected invoice
    setAnchorEl(null); // Close the menu

    setDisabledButtons({ ...disabledButtons, [id]: true });
    setLoading({ ...loading, [id]: true });

    try {
      let res;
      switch (action) {
        case 'view':
        case 'download':
          res = await axios.get(`${process.env.REACT_APP_API_URL}/get/invoice/pdf/${id}`);
          const uint8Array = new Uint8Array(res.data.data.data.data);
          const pdfData = new Blob([uint8Array], { type: 'application/pdf' });
          const pdfURL = URL.createObjectURL(pdfData);
          if (action === 'view') {
            window.open(pdfURL, '_blank');
          } else {
            const a = document.createElement('a');
            a.href = pdfURL;
            a.download = 'invoice.pdf';
            a.click();
          }
          break;
        case 'resend':
          res = await axios.post(
            `${process.env.REACT_APP_API_URL}/resend/Invoice/PDF/On/Email`,
            { invoiceNumber: id },
            { headers: { 'Content-Type': 'application/json' } }
          );
          if (res.status === 200 || res.status === 201) {
            setShowToast(true);
            setToastMessage('Invoice resent successfully');
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error:', error);
      setShowToast(true);
      setToastMessage('Error sending invoice');
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } finally {
      setDisabledButtons({ ...disabledButtons, [id]: false });
      setLoading({ ...loading, [id]: false });
    }
  };


  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <div className="mx-4 pb-4">
      <Snackbar open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
        <Alert onClose={() => setShowToast(false)} severity="success" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#f0592a' }}>STATUS</TableCell>
              <TableCell style={{ color: '#f0592a' }}>INVOICE NO.</TableCell>
              <TableCell style={{ color: '#f0592a' }}>CLIENT</TableCell>
              <TableCell style={{ color: '#f0592a' }}>AMOUNT</TableCell>
              <TableCell style={{ color: '#f0592a' }}>BALANCE</TableCell>
              <TableCell style={{ color: '#f0592a' }}>DATE</TableCell>
              <TableCell style={{ color: '#f0592a' }}>DUE DATE</TableCell>
              <TableCell style={{ color: '#f0592a' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {/* if no data found */}
            {data && data.length == 0 && (<h5 className='m-4' > No Data Found </h5>)}

            {/* map data */}
            {data &&
              data.map((el, index) => (
                <TableRow key={el.invoiceNumber} >
                  <TableCell component="th" scope="row">
                    <Chip
                      label={el.status.charAt(0).toUpperCase() + el.status.slice(1)}
                      style={{
                        backgroundColor: el.status.toLowerCase() === 'paid' ? '#cce5d0' : '#ffb3b3',
                        color: el.status.toLowerCase() === 'pending' ? '#800000' : '#3c7646',
                        fontWeight: 'bold',
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ color: '#5f8ec3', fontWeight: '600' }}>{el.invoiceNumber}</TableCell>
                  <TableCell style={{ color: '#5f8ec3', fontWeight: '600' }}>{el.user}</TableCell>
                  <TableCell style={{ fontWeight: '600' }}>₹{el.amount}</TableCell>
                  <TableCell style={{ fontWeight: '600' }}>₹{el.balance}</TableCell>
                  <TableCell style={{ fontWeight: '600' }}>
                    {new Date(el.createdDate).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell style={{ fontWeight: '600' }}>
                    {new Date(el.dueDate).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      id={`dropdown-basic-${el.invoiceNumber}`} // Unique ID for each button
                      variant="contained"
                      onClick={(event) => {
                        setAnchorEl(event.currentTarget); // Open the menu
                        setSelectedInvoice(el.invoiceNumber); // Set the selected invoice
                      }}
                      disabled={disabledButtons[el.invoiceNumber]}
                    >
                      {loading[el.invoiceNumber] ? <CircularProgress color="inherit" size={24} /> : 'More Actions'}
                    </Button>
                    <Menu
                      id={`simple-menu-${el.invoiceNumber}`} // Unique ID for each menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedInvoice === el.invoiceNumber} // Open the menu only for the selected invoice
                      onClose={() => setAnchorEl(null)} // Close menu
                    >
                      <MenuItem onClick={() => handleAction(el.invoiceNumber, 'view')}>View PDF</MenuItem>
                      <MenuItem onClick={() => handleAction(el.invoiceNumber, 'download')}>Download PDF</MenuItem>
                      <MenuItem onClick={() => handleAction(el.invoiceNumber, 'resend')}>Resend Invoice</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        
      </TableContainer>

  {/* Pagination */}
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Button
          variant="outlined"
          disabled={pageNumber === 1}
          onClick={() => handlePageChange(pageNumber - 1)}
        >
          Previous
        </Button>
        <span style={{ margin: '0 10px' }}>Page {pageNumber}</span>
        <Button
          variant="outlined"
          disabled={data && data.length < 10}
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Next
        </Button>
      </div>


    </div>
  );
};

export default CustomTable;
