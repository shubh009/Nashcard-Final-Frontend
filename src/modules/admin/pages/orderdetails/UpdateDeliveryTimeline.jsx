import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { IoMdAdd } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function UpdateDeliveryTimeline() {
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [timelineData, setTimelineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const orderID = localStorage.getItem('aUorderid');

    // update timeline
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/update/delivery/timeline`, {
                status,
                orderID
            });
            if (response.status === 200) {
                setStatus("");
                toast.success("Delivery timeline successfully updated ");
                fetchTimelineData();
                handleCloseModal();
            } else {
                toast.error('Update failed');
            }
        } catch (error) {
            toast.error('Update failed');
        }
        setIsLoading(false);
    };

    // show modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    // close modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // get timeline 
    const fetchTimelineData = async () => {
        try {
            // Fetch timeline data from the API
            const response = await axios.get(`http://localhost:8000/get/delivery/timeline/${orderID}`);

            setTimelineData(response.data.orderTimeline);
            setLoading(false);
        } catch (error) {
            // Handle errors during data fetching
            setError(error.message);
            setLoading(false);
        }
    };

    // get timeline
    useEffect(() => {
        // Call the fetchTimelineData function on component mount
        fetchTimelineData();
    }, []);

    return (
        <>
            {/* show modal button */}
            <div className="list-inline-item mt-3">
                <div className="admintopmenu" style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={handleShowModal}>
                    Update Delivery Timeline
                </div>
            </div>

            {/* modal */}
            <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Update Delivery Timeline</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex gap-2 align-items-center ">
                        <FormControl fullWidth>
                            <InputLabel>Select Status</InputLabel>
                            <Select
                                label="Select Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Order Creation">Order Creation</MenuItem>
                                <MenuItem value="Cards Received Date">Cards Received Date</MenuItem>
                                <MenuItem value="Cards Received by Grading Date">Cards Received by Grading Date</MenuItem>
                                <MenuItem value="Grades Pop Date">Grades Pop Date</MenuItem>
                                <MenuItem value="Customer Invoiced Date">Customer Invoiced Date</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            style={{ height: 56 }} // Set consistent height for Button
                        >
                            {isLoading ? (
                                <div className="spinner-border" role="status" style={{ width: '35px', height: '35px' }}></div>
                            ) : (
                                <IoMdAdd size={35} />
                            )}
                        </Button>
                    </div>

                    {/* Delivery Timeline header */}
                    <h3 className="mt-4">Current Timeline</h3>

                    {/* Timeline items */}
                    <div className="">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            // Display error message if an error occurred during data fetching
                            <p>{error}</p>
                        ) :
                            // Display 'No data found' message if no timeline data is available 
                            timelineData.length === 0 ? (
                                <p>No delivery timeline present</p>
                            ) : (

                                // Render timeline items if data is available
                                <ul className="list-unstyled">
                                    {timelineData.map((item, index) => (
                                        <li key={index} className="timeline-item d-flex align-items-center gap-4 mt-4">

                                            {/* Timeline icon */}
                                            <div className="timeline-icon mr-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    {/* Clock icon */}
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 6v6l4 2" />
                                                </svg>
                                            </div>

                                            {/* Timeline content */}
                                            <div className="timeline-content">
                                                <h2 className="h5 mb-0">{item.status}</h2>
                                                <span className="small text-gray">

                                                    {/* Convert timestamp to localized date and time string */}
                                                    {new Date(item.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
