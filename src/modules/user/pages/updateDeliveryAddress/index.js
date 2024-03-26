import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NashcardLogo from "../../../../assets/images/nashcard-logo.png";


const InputField = ({ label, value, onChange, error }) => {
  return (
    <div className="form-group mt-2">
      <label>{label}</label>
      <input
        type="text"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default function updateDeliveryAddress() {
  const param = useParams();
  // const _id = param._id
  const [loading, setLoading] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const orderID = param._id

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (pickup) => {
    setLoading(true);
    const errors = {};

    if (!pickup) {
      // If pickup is false, check if all fields are filled
      if (!state) {
        errors.state = 'State is required';
      }
      if (!country) {
        errors.country = 'Country is required';
      }
      if (!city) {
        errors.city = 'City is required';
      }
      if (!pincode) {
        errors.pincode = 'Zip code is required';
      }
    }
    // else{
    //   setPincode("")
    //   setCity("")
    //   setCountry("")
    //   setState("")
    // }

    if (Object.keys(errors).length === 0) {
      try {
        // Prepare payload based on pickup parameter
        const payload = {
          orderID,
          state,
          country,
          city,
          pincode,
          pickup // Include pickup parameter in payload
        };

        let response = await axios.post(`${process.env.REACT_APP_API_URL}/add/delivery/address`, payload);

        const { message, paymentLink } = response.data;
        toast.success(message);

        if (paymentLink) {
          window.location.href = paymentLink; // Redirect user to payment link
        }

        // Handle success
      } catch (error) {
        // Handle error
        console.log(error);
        toast.error("Request Failed");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(errors);
      setLoading(false);
    }
  };



  const getDeliveryAddress = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get/delivery/address/${orderID}`);


      setState(response.data.state)
      setCity(response.data.city)
      setPincode(response.data.pincode == 0 ? "" : response.data.pincode)
      setCountry(response.data.country)

    } catch (error) {
      // Handle errors here
      console.error('Error occurred:', error);
    }
  }


  // get delivery ad
  useEffect(() => {
    getDeliveryAddress()
  }, [])

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   const errors = {};

  //   if (!state) {
  //     errors.state = 'State is required';
  //   }
  //   if (!country) {
  //     errors.country = 'Country is required';
  //   }
  //   if (!city) {
  //     errors.city = 'City is required';
  //   }
  //   if (!pincode) {
  //     errors.pincode = 'Zip code is required';
  //   }

  //   if (Object.keys(errors).length === 0) {
  //     try {
  //       await axios.patch(`${process.env.REACT_APP_API_URL}/add/new/delivery/address/with/emailed/link`, {
  //         _id,
  //         state,
  //         country,
  //         city,
  //         pincode
  //       });
  //       setState("")
  //       setCity("")
  //       setPincode("")
  //       setCity("")
  //       setCountry("")
  //       toast.success("Address Updated");

  //       setTimeout(() => {
  //         navigate("/user/dashbaord")
  //       }, 1000);

  //       // Handle success
  //     } catch (error) {
  //       // Handle error
  //       console.log(error)
  //       toast.error("Request Failed")
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     setErrors(errors);
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="container" >
      <div className="row justify-content-center mt-10 align-items-center " style={{ height: "100vh" }}>
        <div className="" style={{ maxWidth: "400px" }}>
          <div className="text-center">
            <img src={NashcardLogo} className="img-fluid" alt="Nashcard Logo" style={{ maxWidth: "200px", height: "100px" }} />
          </div>

          <h3 className="fw-bold mt-4 mb-4 text-center">Add Delivery Address</h3>

          {/* <h1 className='mt-4'></h1> */}
          <form>
            <InputField
              label="State"
              value={state}
              onChange={(e) => handleInputChange(e, setState)}
              error={errors.state}
            />
            <InputField
              label="Country"
              value={country}
              onChange={(e) => handleInputChange(e, setCountry)}
              error={errors.country}
            />
            <InputField
              label="City"
              value={city}
              onChange={(e) => handleInputChange(e, setCity)}
              error={errors.city}
            />
            <InputField
              label="Zip Code"
              value={pincode}
              onChange={(e) => handleInputChange(e, setPincode)}
              error={errors.pincode}
            />
            <button type="button" className="btn btn-primary mt-3 border-0" onClick={() => { handleSubmit(false) }} disabled={loading} style={{ backgroundColor: "#f1592a", width: "100%", height: "45px" }}>
              {loading ? (
                <div className="d-flex gap-2 align-items-center justify-content-center  ">
                  <span className="">Please Wait</span>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                </div>
              ) : (
                <span>Add Delivery Address</span>
              )}
            </button>

          </form>

          <button type="button" className="btn btn-primary mt-3 border-0" onClick={() => { handleSubmit(true) }} disabled={loading} style={{ backgroundColor: "#f1592a", width: "100%", height: "45px" }}>

            {loading ? (
              <div className="d-flex gap-2 align-items-center justify-content-center  ">
                <span className="">Please Wait</span>
                <span className="spinner-border spinner-border-sm" role="status"></span>
              </div>
            ) : (
              <span>            Wants To Pickup  </span>
            )}


          </button>
        </div>


      </div>
      <ToastContainer />
    </div>
  );
}
