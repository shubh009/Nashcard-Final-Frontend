import React, { useEffect, useState } from 'react'; // Import React
import Navbar from "./Navbar";
import FilterBar from './FilterBar';
import Table from './Table';
import axios from 'axios';

const InvoicesPage = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getInvoiceList`
    );
    return res.data.data;
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();        
      setData(fetchedData);
    };
    getData();
  }, []);

  return (
    <div style={{backgroundColor:"white", borderRadius:"5px", padding:"10px", margin:"10px"}}  >
      {/* <Navbar /> */}
      <FilterBar data={data} setData={setData} />
      <div style={{ marginTop: '20px' }}>
        <Table data={data} />
      </div>
    </div>
  );
};

export default InvoicesPage;
