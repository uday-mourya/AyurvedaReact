import axios from "axios";
import React, { useEffect, useState } from "react";
import Api from "../WebApi/Api";
import { toast } from "react-toastify";
import starGenerate from "./GenerateRating";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux-config/ProductSlice";

function ShowProductToUser() {
    let [user, setUser] = useState([]);
    const { productList, isLoading, error } = useSelector((store) => store.getProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProduct());
        userDetails();
    }, []);

    const userDetails = async () => {
        let userData = JSON.parse(sessionStorage.getItem('user-details'));
        setUser(userData);
    }

    const addToCart = async (productId) => {
        try {
            if (!user) {
                toast.error('Firstly Login');
            }
            else {
                let response = await axios.post(Api.addToCart, { productId, userId: user._id })
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {isLoading ?
                <div className="spinner d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                    <div style={{height:'100px',width:'100px'}} class="spinner-border text-muted"></div>
                </div> :
                <>
                    <h2 className="text-center my-3"><span className="text-secondary">Product</span></h2>
                    <div className="border border-1 border-secondary m-auto mb-4" style={{ width: '300px' }}></div>
                    <div className="row p-4 row-cols-lg-4 row-cols-md-3  row-cols-sm-2 row-cols-1">
                        {productList.map((product, index) => (
                            <div className="col text-center p-3 my-3" style={{ height: '460px' }} key={index}>
                                <div style={{ borderRadius: '20px', boxShadow: '2px 2px 8px gray' }} className="p-3 h-100 position-relative ">
                                    <img src={`http://localhost:3000/images/${product.imageURL}`} onClick={() => navigate('/show-product-details', { state: { product } })} style={{ height: '200px', width: '200px' }} alt={product.title} />
                                    <div className="card-body p-0 m-0 text-center">
                                        <h6 className="card-title text-center">{product.title}</h6>
                                        <p style={{ height: '27px' }} className="text-center">{product.description.substring(0, 39)}...</p>
                                        <span className="card-text text-center d-block pt-2 my-2">{starGenerate(product.averageRating)}</span>
                                        <h5 className="card-text text-center m-auto text-success mb-2 d-inline-block"><span className="text-dark">Price : </span> ₹ {product.price}</h5>
                                    </div>
                                    <div className="d-flex mt-3 justify-content-between px-2" style={{ bottom: '20px' }}>
                                        <button onClick={() => addToCart(product._id)} style={{ width: '', fontSize: '14px' }} className="btn btn-success">Add To Cart</button>
                                        <button style={{ width: '', fontSize: '14px' }} className="btn ms-2 px-4 btn-warning">Buy now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="container">

                    </div>
                </>}
        </>
    );
}

export default ShowProductToUser;
