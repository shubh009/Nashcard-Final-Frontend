import React, { useEffect, useState } from 'react'; // Import React
import FilterBar from './FilterBar';
import Table from './Table';
import axios from 'axios';

const InvoicesPage = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getInvoiceList?pageNumber=${pageNumber}`
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

      <FilterBar data={data} setData={setData}  pageNumber={pageNumber}/>
      <div style={{ marginTop: '20px' }}>
        <Table data={data} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
};

export default InvoicesPage;
