import Form from 'react-bootstrap/Form';
import axios from 'axios';
import React from 'react';

const ChartFilter = ({ setData }) => {
    const fetchFilteredData = async (filter) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/get/invoice/insights?date=${filter}`
            );

            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    return (
        <div
            className=" d-flex mt-4 justify-content-between px-4 align-items-center mb-4" >

            <h3 className="" style={{ color: '#5f6064' }}>
                Overview
            </h3>
            <Form.Select
                onChange={(e) => {
                    fetchFilteredData(e.target.value);
                }}
                style={{ width: '195px' }}
                aria-label="Default select example"
            >
                <option value="">Select custom date</option>
                <option value="last_7_days">Last 7 days</option>
                <option value="last_30_days">Last 30 days</option>
                <option value="this_month">This month</option>
                <option value="last_month">Last month</option>
                <option value="this_year">This Year</option>
                <option value="last_year">Last Year</option>
            </Form.Select>
        </div>
    );
};

export default ChartFilter;