import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const _id = param._id
  const [loading, setLoading] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()



  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const errors = {};

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
      errors.pincode = 'Pincode is required';
    }

    if (Object.keys(errors).length === 0) {
      try {
        await axios.patch(`${process.env.REACT_APP_API_URL}/add/new/delivery/address/with/emailed/link`, {
          _id,
          state,
          country,
          city,
          pincode
        });
        setState("")
        setCity("")
        setPincode("")
        setCity("")
        setCountry("")
        toast.success("Address Updated");

        setTimeout(() => {
          navigate("/user/dashbaord")
        }, 1000);

        // Handle success
      } catch (error) {
        // Handle error
        console.log(error)
        toast.error("Request Failed")
      }
      finally {
        setLoading(false);
      }
    } else {
      setErrors(errors);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className='mt-4' >Add New Delivery Address</h1>
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
          label="Pincode"
          value={pincode}
          onChange={(e) => handleInputChange(e, setPincode)}
          error={errors.pincode}
        />
        <button type="button" className="btn btn-primary mt-4" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <div className="d-flex gap-2 align-items-center">
              <span className="">Please Wait</span>
              <span className="spinner-border spinner-border-sm" role="status"></span>
            </div>

          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
