import axios from "axios";
import { useRef, useState } from "react";
import Api from "../WebApi/Api";
import { toast } from "react-toastify";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

function AdminAccount(){
    const emailSignInInput = useRef();
    const passwordSignInInput = useRef();
    const [emailSignInError, setEmailSignInError] = useState('');
    const [passwordSignInError, setPasswordSignInError] = useState('');
    const navigate=useNavigate();
    const handleSignIn=async ()=>{
        try{     
            if(signInValidation()){
                let email=emailSignInInput.current.value;
                let password=passwordSignInInput.current.value;
                let response = await axios.post(Api.adminSignIn,{email,password});
                sessionStorage.setItem('admin-details',JSON.stringify(response.data.admin));
                toast.success(response.data.message)
                navigate('/admin-dashboard');
            }
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message)
        }
    }
    function signInValidation() {
        let isValid = validateSignInEmail(emailSignInInput.current.value) && validateSignInPassword(passwordSignInInput.current.value);
        return isValid;
    }
    function validateSignInEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailSignInError('Please enter a valid email');
            return false;
        } else {
            setEmailSignInError('');
            return true;
        }
    }

    function validateSignInPassword(password) {
        if (password.length < 6) {
            setPasswordSignInError('Password must be at least 6 characters long');
            return false;
        } else {
            setPasswordSignInError('');
            return true;
        }
    }
    return (
        <>
            <Header />
            <div className="container-fluid doctor-account">
                <div className="d-flex justify-content-center align-items-center my-4">
                    <h5>
                        <span style={{ color: '#198754', cursor: 'pointer' }} className="account-btn">Admin SignIn</span>
                    </h5>
                </div>
                <div className="border border-2 m-auto" style={{ width: '280px' }}></div>
                <div className="container-fluid rounded p-5 d-flex justify-content-center align-items-center">
                    <div id="signIn" className="border rounded rounded-5 border-2 p-4 pb-5">
                        <input type='text' onChange={(event) => validateSignInEmail(event.target.value)} ref={emailSignInInput} placeholder="Enter Email" className="form-control my-3 mt-5" />
                        <span className="text-danger">{emailSignInError}</span>
                        <input type='password' onChange={(event) => validateSignInPassword(event.target.value)} ref={passwordSignInInput} placeholder="Enter Password" className="form-control my-3" />
                        <span className="text-danger">{passwordSignInError}</span>
                        <button className="form-control btn btn-success" onClick={handleSignIn} >Sign In As Doctor</button>
                        <span className="mt-5 d-block text-secondary" style={{ fontWeight: '600', cursor: 'pointer' }}>Forget Password ? </span>
                        <span className="mt-3 d-block text-secondary" style={{ fontWeight: '600', cursor: 'pointer' }}>Register As Doctor: <span className="text-success">Register</span> </span>
                    </div>
                </div>
            </div>
        </>)
}
export default AdminAccount;