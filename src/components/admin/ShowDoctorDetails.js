import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Api from "../WebApi/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ShowDoctorDetails() {
    const [doctor, setDoctor] = useState(null);
    const { pendingDoctorList, current } = useSelector((store) => store.pendingDoctor);
    const navigate=useNavigate();
    useEffect(() => {
        setDoctor(pendingDoctorList[current]);
        console.log(pendingDoctorList[current])
    }, [pendingDoctorList, current]);
    const handleDoctorApproveAccept=async ()=>{
        try {
            const response=await axios.put(Api.approveDoctorRequestAccept,{doctorId:doctor.doctor.id})
            toast.success(response.data.message)
            navigate('/admin-dashboard/pending-doctor-request')
        } catch (error) {
            toast.error(error.response.data.error);
            navigate('/admin-dashboard/pending-doctor-request')
        }
    }
    const handleDoctorApproveReject=async ()=>{
        try {
            const response=await axios.put(Api.approveDoctorRequestReject,{doctorId:doctor.doctor.id})
            toast.success(response.data.message)
            navigate('/admin-dashboard/pending-doctor-request')
        } catch (error) {
            toast.error(error.response.data.error);
            navigate('/admin-dashboard/pending-doctor-request')
        }
    }
    return <>
        <div className="container-fluid">
            {doctor && <>
                <div className="">
                    <h3 className="text-success">Qualification Image</h3>
                    <img style={{ height: '900px', width: '650px' }} src={`http://localhost:3000/images/${doctor.doctorDetails.qualificationImage}`} className="img-fluid border border-success" />
                </div>
                <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 my-3">
                    <div className="col">
                        <img style={{height:'300px',width:'300px'}} src={`http://localhost:3000/images/${doctor.doctor.profileImage}`} className="img-fluid"/>
                    </div>
                    <div className='col'>
                        <h3 className="text-success p-3 pb-1 ps-5 mt-4">Personal Details</h3>
                        <span style={{ fontSize: '17px', color: '#212121', fontWeight: '400' }} className="ms-4 d-block">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;{doctor.doctor.doctorName}</span>
                        <span style={{ fontSize: '17px', color: '#212121', fontWeight: '400' }} className="ms-4 d-block">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;{doctor.doctor.email}</span>
                        <span style={{ fontSize: '17px', color: '#212121', fontWeight: '400' }} className="ms-4 d-block">Contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;{doctor.doctor.contactNumber}</span>
                        <span style={{ fontSize: '17px', color: '#212121', fontWeight: '400' }} className="ms-4 d-block">Experence : &nbsp;&nbsp;&nbsp;{doctor.doctorDetails.experience} Year</span>
                        <span style={{ fontSize: '17px', color: '#212121', fontWeight: '400' }} className="ms-4 d-block">Contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;{doctor.doctor.contactNumber}</span>
                        <span style={{ fontSize: '17px', color: '#212121', fontWeight: '400' }} className="ms-4 d-block">Language&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;{doctor.doctorDetails.language}</span>
                        <button onClick={handleDoctorApproveAccept} className="btn-sm btn-success my-3">Accept Request</button>
                        <button onClick={handleDoctorApproveReject} className="btn-sm btn-danger ms-3 my-3">Reject Request</button>
                    </div>
                </div>
            </>}
        </div>
    </>
}
export default ShowDoctorDetails;