import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../WebApi/Api";
import { toast } from "react-toastify";
import Header from "../Header";

function UserAccount(){
    const navigate=useNavigate();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [emailSignInError, setEmailSignInError] = useState('');
    const [passwordSignInError, setPasswordSignInError] = useState('');
    const emailSignInInput = useRef();
    const passwordSignInInput = useRef();
    const nameInput = useRef();
    const passwordInput = useRef();
    const emailInput = useRef();
    const contactInput = useRef();

    function showSignIn() {
        let signUpElement = document.getElementById('signUp');
        let signInElement = document.getElementById('signIn');
        let accountBtn = document.getElementsByClassName('account-btn');
        signInElement.style.display = 'block';
        signUpElement.style.display = 'none';
        accountBtn[0].style.color = '#198754';
        accountBtn[0].style.textDecoration = 'underline';
        accountBtn[0].style.cursor = 'pointer';
        accountBtn[1].style.color = 'black';
        accountBtn[1].style.textDecoration = 'none';
        accountBtn[1].style.cursor = 'pointer';
    }

    function showSignUp() {
        let signUpElement = document.getElementById('signUp');
        let signInElement = document.getElementById('signIn');
        let accountBtn = document.getElementsByClassName('account-btn');
        signInElement.style.display = 'none';
        signUpElement.style.display = 'block';
        accountBtn[1].style.color = '#198754';
        accountBtn[1].style.textDecoration = 'underline';
        accountBtn[1].style.cursor = 'pointer';
        accountBtn[0].style.color = 'black';
        accountBtn[0].style.textDecoration = 'none';
        accountBtn[0].style.cursor = 'pointer';
    }

    function validation() {
        let isValid = validateName(nameInput.current.value) && validateEmail(emailInput.current.value) && validatePassword(passwordInput.current.value) && validateContact(contactInput.current.value);
        return isValid;
    }

    function validateName(name) {
        if (!name) {
            setNameError('Please enter your name');
            return false;
        } else {
            setNameError('');
            return true;
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }

    function validatePassword(password) {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    function validateContact(contact) {
        const contactRegex = /^\d{10}$/;
        if (!contactRegex.test(contact)) {
            setMobileError('Please enter a 10-digit contact number');
            return false;
        } else {
            setMobileError('');
            return true;
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

    const handleSignUp = async () => {
        try {
            if (validation()) {
                let username = nameInput.current.value;
                let email = emailInput.current.value;
                let password = passwordInput.current.value;
                let contact = contactInput.current.value;
                let response = await axios.post(Api.userSignUp, { username, email, password, contact});
                toast.success(response.data.message)
                showSignIn();
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleSignIn=async ()=>{
        try{     
            if(signInValidation()){
                let email=emailSignInInput.current.value;
                let password=passwordSignInInput.current.value;
                let response = await axios.post(Api.userSignIn,{email,password});
                sessionStorage.setItem('user-details',JSON.stringify(response.data.user));
                navigate('/');
                toast.success(response.data.message);
            }
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message)
        }
    }

    return (
        <>
            <Header />
            <div className="container-fluid doctor-account">
                <div className="d-flex justify-content-center align-items-center my-4">
                    <h5>
                        <span onClick={showSignIn} style={{ textDecoration: 'underline', color: '#198754', cursor: 'pointer' }} className="me-5 account-btn">SignIn</span>
                        <span onClick={showSignUp} style={{ cursor: 'pointer' }} className="ms-5 account-btn">SignUp</span>
                    </h5>
                </div>
                <div className="border border-2 m-auto" style={{ width: '280px' }}></div>
                <div className="container-fluid rounded p-5 d-flex justify-content-center align-items-center">
                    <div id="signIn" className="border rounded rounded-5 border-2 p-4 pb-5">
                        <input type='text' onChange={(event) => validateSignInEmail(event.target.value)} ref={emailSignInInput} placeholder="Enter Email" className="form-control my-3 mt-5" />
                        <span className="text-danger">{emailSignInError}</span>
                        <input type='password' onChange={(event) => validateSignInPassword(event.target.value)} ref={passwordSignInInput} placeholder="Enter Password" className="form-control my-3" />
                        <span className="text-danger">{passwordSignInError}</span>
                        <button className="form-control btn btn-success" onClick={handleSignIn} >Sign In As User</button>
                        <span className="mt-5 d-block text-secondary" style={{ fontWeight: '600', cursor: 'pointer' }}>Forget Password ? </span>
                        <span className="mt-3 d-block text-secondary" style={{ fontWeight: '600', cursor: 'pointer' }}>Register As Doctor: <span className="text-success">Register</span> </span>
                    </div>

                    <div id="signUp" style={{ display: 'none' }} className=" border rounded rounded-5 border-2 p-4 pb-5 ">
                        <input type='text' onChange={(event) => validateName(event.target.value)} ref={nameInput} placeholder="Enter Name" className="form-control mt-5" />
                        <span className="text-danger">{nameError}</span>
                        <input type='email' onChange={(event) => validateEmail(event.target.value)} ref={emailInput} placeholder="Enter Email" className="form-control my-3" />
                        <span className="text-danger">{emailError}</span>
                        <input type='password' onChange={(event) => validatePassword(event.target.value)} ref={passwordInput} placeholder="Enter Password" className="form-control my-3" />
                        <span className="text-danger">{passwordError}</span>
                        <input type='text' onChange={(event) => validateContact(event.target.value)} ref={contactInput} placeholder="Mobile no." className="form-control my-3" />
                        <span className="text-danger">{mobileError}</span>
                        <button onClick={handleSignUp} className="form-control btn btn-success">Create Account</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserAccount;