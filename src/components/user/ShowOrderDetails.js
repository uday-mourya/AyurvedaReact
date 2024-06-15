import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "../WebApi/Api";

function ShowOrderDetails() {
    let [user, setUser] = useState({});
    let [currentStar, setCurruntStar] = useState(1);
    let [orderDetails, setOrderDetails] = useState([]);
    let [currentProduct, setCurrentProduct] = useState();
    let [review, setReview] = useState('');
    let [isUpdate, setIsUpdate] = useState(false);
    let [change,setChange]=useState(0);

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user-details')));
        getOrderDetails();
    }, [change]);

    const getOrderDetails = async () => {
        try {
            let response = await axios.post(Api.getOrderDetails, { userId: JSON.parse(sessionStorage.getItem('user-details'))._id });
            setOrderDetails(response.data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    const handleStarRating = async () => {
        try {
            if (isUpdate) {
                const response = await axios.put(Api.updateReviewAndRating, {
                    userId: user._id,
                    productId: currentProduct,
                    rating: currentStar,
                    review: review
                });
                setChange(7);
                console.log(response);
            } else {
                const response = await axios.post(Api.addRateAndReviewUser, {
                    userId: user._id,
                    productId: currentProduct,
                    rating: currentStar,
                    review: review
                });
                setChange(8);
                console.log(response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRatingChange = (rating) => {
        setCurruntStar(rating);
    };

    const openModal = (product) => {
        setCurrentProduct(product.product._id);
        setCurruntStar(product.review ? product.review.rating : 1);
        setReview(product.review ? product.review.review : '');
        setIsUpdate(!!product.review);
    };

    const StarRating = ({ totalStars }) => {
        return (
            <div>
                {[...Array(totalStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={index}
                            onClick={() => handleRatingChange(starValue)}
                            style={{ cursor: 'pointer', fontSize: '30px', color: 'orange' }}
                        >
                            {starValue <= currentStar ? '★' : '☆'}
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            {/* Add or update modal */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{isUpdate ? 'Update' : 'Add'} Rate and Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <StarRating totalStars={5} />
                            Any Comment
                            <textarea
                                id='review'
                                className="my-2"
                                style={{ width: '100%' }}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => { setCurruntStar(1); setReview(''); }} data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary" onClick={handleStarRating} data-dismiss="modal">{isUpdate ? 'Update' : 'Save Changes'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {orderDetails.map((order, index) => {
                    const orderDate = new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    return (
                        <div key={index} className="container p-2 row">
                            {order.products.map((product, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className='col-2 my-4'>
                                            <img style={{ height: '80px', width: '80px' }} src={'http://localhost:3000/images/' + product.product.imageURL} alt={product.product.title} />
                                        </div>
                                        <div className='col-4 my-4'>
                                            <span style={{ fontSize: '21px' }}>{product.product.title}</span><br />
                                            <span>Quantity : {product.quantity}</span>
                                        </div>
                                        <div className="col-2 p-4">
                                            <span>₹ {product.quantity * product.product.price}</span>
                                        </div>
                                        <div className='col-4 my-4'>
                                            <h5 style={{ fontWeight: '600', fontSize: '18px' }}>Order On : {orderDate}</h5>
                                            {!product.review ? (
                                                <>
                                                    <i className="fa fa-star text-warning"></i>
                                                    <button
                                                        onClick={() => openModal(product)}
                                                        className="text-success ms-2 btn"
                                                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                        type="button"
                                                        data-toggle="modal"
                                                        data-target="#exampleModalCenter"
                                                    >
                                                        Rate & Review Product
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa fa-star text-warning"></i>
                                                    <button
                                                        onClick={() => openModal(product)}
                                                        className="text-success ms-2 btn"
                                                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                        type="button"
                                                        data-toggle="modal"
                                                        data-target="#exampleModalCenter"
                                                    >
                                                        Change Rating
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ShowOrderDetails;
