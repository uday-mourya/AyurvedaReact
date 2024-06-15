import React, { useEffect, useState } from 'react'
import '../style/doctor.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Home() {
  const [doctor, setDoctor] = useState({});
  const [doctorDetails, setDoctorDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const doctor = JSON.parse(sessionStorage.getItem('doctor-details'));
    setDoctor(doctor);
    const doctorDetails = JSON.parse(sessionStorage.getItem('doctor-extra-details'));
    setDoctorDetails(doctorDetails);
    !sessionStorage.getItem('doctor-details') && navigate('/');
  }, [])
  function pendingAppointement(){
    if(checkDetails()){

    }
  }
  function checkDetails(){
    if(!doctorDetails){
      toast.warning('Firstly Add Details');
      return false;
    }
    else if(doctorDetails.status===0){
      toast.warning(' Your Details send if your details is valid and approve then you will use this features');
      return false;
    }
    else if(doctorDetails.status===-1){
      toast.error('Your Details is not valid your request is rejected Please add a valid details')
      return false;
    }
    else if(doctorDetails.status===1){
      console.log('valid doctor');
      return true;
    }
  }
  return (
    <>
      <div style={{width:'100% !important'}} className="container-fluid justify-content-center align-items-center">
        <div className='row row-cols-3'>
          <div className='col p-3'>
            <div className='border border-success bg-secondary' onClick={pendingAppointement} style={{ height: '150px', borderRadius: '20px' }}>
              <h2 className='p-4' style={{color:'wheat'}}>
                Pending Appointment
              </h2>
            </div>
          </div>
          <div className='col p-3'>
            <div className='border border-success bg-secondary' style={{ height: '150px', borderRadius: '20px' }}>
              <h2 className='p-4' style={{color:'wheat'}}>
                Patient
              </h2>
            </div>
          </div>
          <div className='col p-3'>
            <div className='border border-success bg-secondary' style={{ height: '150px', borderRadius: '20px' }}>
              <h2 className='p-4' style={{color:'wheat'}}>
                Old Appointment
              </h2>
            </div>
          </div>      
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Home