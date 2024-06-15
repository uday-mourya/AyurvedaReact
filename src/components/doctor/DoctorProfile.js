import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import Api from "../WebApi/Api";

function DoctorProfile() {
    const [doctor, setDoctor] = useState({});
    const [doctorDetails, setDoctorDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const doctor = JSON.parse(sessionStorage.getItem('doctor-details'));
        setDoctor(doctor);
        const doctorDetails = JSON.parse(sessionStorage.getItem('doctor-extra-details'));
        setDoctorDetails(doctorDetails);
        !sessionStorage.getItem('doctor-details') && navigate('/');
        console.log(doctorDetails)
    }, [])

    const handleLogOut = () => {
        sessionStorage.clear();
        navigate('/');
    }
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        const doctorId = doctor._id;
        formData.append('doctorId', doctorId);
        formData.append('profile', file);
        formData.append('doctor', JSON.stringify(doctor));

        axios.post(Api.addProfilePicture, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                const updatedDoctor = { ...doctor, profileImage: response.data.filePath };
                setDoctor(updatedDoctor);
                console.log('File uploaded successfully');
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    }
    return (
        <div>
            <div className="container-fluid border ms-4 border-success m-auto mt-4" style={{ width: '950px' }}>
                <div style={{ width: '100%', zIndex: '4' }} className="container row row-cols-md-2 row-cols-1 position-relative row-cols-sm-2 row-cols-lg-2">
                    <div className="col my-2">
                        <center>
                            <div style={{ width: '300px', height: '300px' }}>
                                <input type='file' id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
                                <label htmlFor="fileInput" style={{ left: '62px', top: '7px' }} className="btn btn-secondary my-3 position-absolute">
                                    <i className="fa fa-edit" style={{ fontSize: '20px' }}></i>
                                </label>
                                <img style={{ borderRadius: '50%', height: '250px', width: '250px', cursor: 'pointer' }} src={doctor.profileImage ? 'http://localhost:3000/images/' + doctor.profileImage : 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'} className="img-fluid mt-3" />
                            </div>
                        </center>
                    </div>
                    <div className="col mb-5 ps-5">
                        <div style={{ width: '100%', float: 'left' }}>
                            <h5 style={{ fontSize: '33px' }} className="text-success mt-5 ms-4">Personal Details</h5>
                            <span style={{ fontSize: '22px', color: '#212121', fontWeight: '400' }} className="ms-4 my-3">Name : {doctor.doctorName}</span><br />
                            <span style={{ fontSize: '22px', color: '#212121', fontWeight: '400' }} className="ms-4 ">Email : {doctor.email}</span><br />
                            <span style={{ fontSize: '22px', color: '#212121', fontWeight: '400' }} className="ms-4 ">Contact : {doctor.contactNumber}</span><br />                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-group ms-4 my-4 float-end">
                <button className="btn btn-success mx-2 rounded-pill" onClick={() => navigate('/doctor-dashboard/doctor-profile/edit-profile', { state: { doctor } })}>Edit Details</button>
                <button className="btn btn-success mx-2  rounded-pill" onClick={() => navigate('/doctor-dashboard/doctor-profile/change-password', { state: { doctor } })}>Change Password</button>
                {<button className="btn btn-warning mx-2  rounded-pill" onClick={() => navigate('/doctor-dashboard/doctor-profile/add-details-doctor', { state: { doctor } })}>Add Details</button>}
                <button className="btn btn-danger mx-2   rounded-pill" onClick={handleLogOut}>Log Out</button>
            </div>
            <Outlet />
        </div>
    );
}

export default DoctorProfile;
