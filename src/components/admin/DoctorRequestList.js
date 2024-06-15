import axios from "axios";
import React, { useEffect, useState } from "react";
import Api from "../WebApi/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPendingDoctor, updateCurrent } from "../../redux-config/PendinDoctorSlice";
import { toast } from "react-toastify";

function DoctorRequestList() {
    const { error, isLoading, pendingDoctorList } = useSelector((store) => store.pendingDoctor);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showDetails = (index) => {
        dispatch(updateCurrent(index));
        navigate('/admin-dashboard/show-doctor-details')
    }
    const handleDoctorApproveReject = async (doctorId) => {
        try {
            const response = await axios.put(Api.approveDoctorRequestReject, { doctorId })
            dispatch(getPendingDoctor());
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
    useEffect(() => {
        dispatch(getPendingDoctor());
    }, [])
    return (
        <div className='container-fluid'>
            {pendingDoctorList.length ?
                <>
                    <div className="text-center d-flex justify-content-center my-3 align-items-center" style={{ height: '50px', backgroundColor: '#eded98' }}>
                        <h2 className="text-success">Pending Request</h2>
                    </div>
                    <div className="row row-cols-4">
                        <div style={{ borderRadius: '10px 0px 0px 0px' }} className="col d-flex p-2 justify-content-center align-items-center border border-success">
                            Name
                        </div>
                        <div className="col d-flex justify-content-center align-items-center border border-success">
                            Experience
                        </div>
                        <div className="col d-flex justify-content-center align-items-center border border-success">
                            Image
                        </div>
                        <div style={{ borderRadius: '0px 10px 0px 0px' }} className="col d-flex justify-content-center align-items-center border border-success">
                        </div>
                        {pendingDoctorList.map((pendingDoctorList, index) => (
                            <React.Fragment key={index}>
                                <div className="col d-flex justify-content-center align-items-center border border-success">
                                    <span>{pendingDoctorList.doctor.doctorName}</span>
                                </div>

                                <div className="col d-flex justify-content-center align-items-center border border-success">
                                    <span>{pendingDoctorList.doctorDetails.experience}</span>
                                </div>

                                <div className="col d-flex justify-content-center align-items-center border border-success">
                                    <img style={{ height: '100px', width: '100px' }} className="img-fluid p-2" src={`http://localhost:3000/images/${pendingDoctorList.doctor.profileImage}`} />
                                </div>
                                <div style={{ borderLeft: '0px' }} className="col d-flex justify-content-center align-items-center border border-success">
                                    <button className="btn btn-success mx-2" onClick={() => showDetails(index)}>Details</button>
                                    <button className="btn btn-danger" onClick={() => handleDoctorApproveReject(pendingDoctorList.doctor._id)}>Reject</button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </>
                : <div className="text-center d-flex justify-content-center align-items-center" style={{ height: '100px', backgroundColor: '#eded98' }}>
                    <h2 className="text-success">No Pending Request Available</h2>
                </div>
            }
        </div>
    );
}

export default DoctorRequestList;
