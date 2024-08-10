import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import showToasts from './Toast';

function Settings({ userData, token }) {

  console.log(userData)

  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const updateDetails = async (e) => {
    e.preventDefault();

    if (details.password !== details.confirmPassword) {
      showToasts('Passwords do not match', 'error');
      return;
    }

    try {
      const response = await axios.patch(`https://form-bot-server-1.onrender.com/update/${userData._id}`, {
        email: details.email,
        password: details.password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === 'Success') {
        showToasts(response.data.message, 'success');
        // Clear the form fields
        setDetails({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        showToasts(response.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      showToasts('An error occurred while updating details', 'error');
    }
  };

  if(!userData) {
    return (
      <div style={{textAlign: 'center'}}>
        <p>You are not authorized to update data, Please login to update the data</p>
      </div>
    )
  }

  return (
    <div>
      <div className='background-header'>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Settings</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4vw' }}>
          <form onSubmit={updateDetails}>
            <div>
              <input
                className='input-1'
                type='text'
                placeholder='Name'
                value={details.username}
                onChange={(e) => setDetails({ ...details, username: e.target.value })}
              />
            </div>
            <div>
              <input
                className='input-2'
                type='email'
                placeholder='Update email'
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
              />
            </div>
            <div>
              <input
                className='input-2'
                type='password'
                placeholder='Old password'
                value={details.password}
                onChange={(e) => setDetails({ ...details, password: e.target.value })}
              />
            </div>
            <div>
              <input
                className='input-2'
                type='password'
                placeholder='Confirm password'
                value={details.confirmPassword}
                onChange={(e) => setDetails({ ...details, confirmPassword: e.target.value })}
              />
            </div>
            <div>
              <button type='submit' className='update-btn'>Update</button>
            </div>
          </form>
        </div>

        <div className='log-out'>
          <svg style={{ marginRight: '1vw' }} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d="M13.0165 5.38948V4.45648C13.0165 2.42148 11.3665 0.771484 9.33146 0.771484H4.45646C2.42246 0.771484 0.772461 2.42148 0.772461 4.45648V15.5865C0.772461 17.6215 2.42246 19.2715 4.45646 19.2715H9.34146C11.3705 19.2715 13.0165 17.6265 13.0165 15.5975V14.6545" stroke="#CF3636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.8096 10.0215H7.76855" stroke="#CF3636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16.8818 7.10645L19.8098 10.0214L16.8818 12.9374" stroke="#CF3636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
