import axios from "axios";
import React, { useEffect, useState } from "react";
import Api from "../WebApi/Api";
import { useNavigate } from "react-router-dom";

function ShowCart() {
    let [user, setUser] = useState({});
    let [cartItems, setCartItems] = useState([]);
    let [totalPrice, setTotalPrice] = useState(0);
    const navigate=useNavigate();
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user-details')));
        showCart();
        getTotalPrice();
    }, []);
    const showCart = async () => {
        try {
            let response = await axios.post(Api.getCart, { userId: JSON.parse(sessionStorage.getItem('user-details'))._id });
            setCartItems(response.data.cart.cartItems)
        } catch (error) {
            console.log(error)
        }
    }
    const handleQuantity = async (productId, quantity) => {
        try {
            let userId = user._id;
            let response = await axios.put(Api.updateQuantiy, { quantity, productId, userId })
            console.log(response);
            const updatedCartItems = cartItems.map(item => {
                if (item.productId._id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    };
                }
                return item;
            }).filter(item => item.quantity > 0);
            setCartItems(updatedCartItems);
            getTotalPrice();
        } catch (error) {
            console.log(error)
        }
    }
    const removeCart = async (productId, index) => {
        try {
            let userId = user._id;
            let response = await axios.post(Api.removeFromCart, { userId, productId });
            const cartList = [...cartItems];
            cartList.splice(index, 1);
            setCartItems([...cartList]);
            getTotalPrice();
        } catch (error) {
            console.log(error);
        }
    }
    const getTotalPrice = async () => {
        try {
            let response = await axios.post(Api.getCart, { userId: JSON.parse(sessionStorage.getItem('user-details'))._id });
            let cartItems = response.data.cart.cartItems;
            let totalPrice = 0;
            for (let cart of cartItems) {
                let price = cart.productId.price * 1;
                let quantity = cart.quantity * 1;
                totalPrice = totalPrice + (price * quantity);
            }
            setTotalPrice(totalPrice.toFixed(2))
        } catch (error) {

        }
    }
    const handleAddOrder = async () => {
        try {
            let userId = user._id;
            let response = await axios.post(Api.addOrder, { userId, products: cartItems });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h2 className="text-center my-3"><span className="text-secondary">Cart</span></h2>
            <div className="border border-1 border-secondary m-auto mb-4" style={{ width: '300px' }}></div>
            <div className="row mb-5">
                <div className="row row-cols-5 p-3 col-9">
                    <div style={{ backgroundColor: '#2FC15F', color: 'white', fontWeight: '600', height: '40px' }} className=" d-flex justify-content-center align-items-center"><span>Product</span></div>
                    <div style={{ backgroundColor: '#2FC15F', color: 'white', fontWeight: '600', height: '40px' }} className=" d-flex justify-content-center align-items-center"><span>Price</span></div>
                    <div style={{ backgroundColor: '#2FC15F', color: 'white', fontWeight: '600', height: '40px' }} className=" d-flex justify-content-center align-items-center"><span>Quantity</span></div>
                    <div style={{ backgroundColor: '#2FC15F', color: 'white', fontWeight: '600', height: '40px' }} className=" d-flex justify-content-center align-items-center"><span>Total</span></div>
                    <div style={{ backgroundColor: '#2FC15F', color: 'white', fontWeight: '600', height: '40px' }} className=" d-flex justify-content-center align-items-center"><span>Delete</span></div>
                    {cartItems.map((cart, index) => {
                        return <React.Fragment key={index}>
                            <div style={{ borderBottom: '1px solid black' }} className="col py-2 text-center">
                                <img src={'http://localhost:3000/images/' + cart.productId.imageURL} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%' }} className="img-fluid m-auto d-block" />
                                <span style={{ fontWeight: '600' }}>{cart.productId.title}</span>
                            </div>
                            <div style={{ borderBottom: '1px solid black' }} className="col py-2  d-flex justify-content-center align-items-center">
                                <span>₹{cart.productId.price}</span>
                            </div>
                            <div style={{ borderBottom: '1px solid black' }} className="col py-2 d-flex justify-content-center align-items-center">
                                <span>
                                    <button style={{ fontWeight: 'bold', backgroundColor: '#2FC15F' }} onClick={() => handleQuantity(cart.productId._id, -1)} className="btn-sm text-light border-0">-</button>
                                    <span className="px-2" style={{ display: 'inline-block' }}>{cart.quantity}</span>
                                    <button onClick={() => handleQuantity(cart.productId._id, 1)} style={{ fontWeight: 'bold', backgroundColor: '#2FC15F' }} className="btn-sm text-light border-0">+</button>
                                </span>
                            </div>
                            <div style={{ borderBottom: '1px solid black' }} className="col py-2 d-flex justify-content-center align-items-center">
                                <span>₹ {(Number.parseFloat(cart.quantity) * Number.parseFloat(cart.productId.price)).toFixed(2)}</span>
                            </div>
                            <div style={{ borderBottom: '1px solid black', borderRight: '1px solid black' }} className="col py-2 d-flex justify-content-center align-items-center">
                                <button className=" btn" onClick={() => removeCart(cart.productId._id, index)} style={{ backgroundColor: '#2FC15F', color: 'white' }}>Remove</button>
                            </div>
                        </React.Fragment>
                    })}
                </div>
                <div className="py-4 text-light position-fixed p-2 col-3" style={{ right: '0', top: '40%' }}>
                    <div onClick={()=>navigate('/order-details')} className="btn-lg my-3 rounded-pill text-center" style={{ backgroundColor: '#2FC15F',cursor:'pointer'}}>Old Order Details</div>
                    <div style={{ border: '1px solid grey', borderRadius: '10px', backgroundColor: '#2FC15F' }} className="p-3">
                        <h4 className="text-center">Order Summary</h4>
                        <div className="border border-1 border-light m-auto mb-4" style={{ width: '90%' }}></div>
                        <h5>Total Product <span className="float-end"> {cartItems.length}  (Items)</span></h5>
                        <h4>Total Price  <sapn className="text-light float-end">₹ {totalPrice}</sapn></h4>
                        <button className="btn btn-light py-1 m-auto " onClick={handleAddOrder}>Procees To Pay</button>
                    </div>
                </div>
            </div>
        </>)
}
export default ShowCart;
