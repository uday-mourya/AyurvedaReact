import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import '../style/productDetails.css'
import axios from "axios";
import Api from "../WebApi/Api";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

function ShowProductDetails() {
    const location = useLocation();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        setProduct(location.state.product);
        getReviewAndRating();
    }, [])
    const getReviewAndRating = async () => {
        try {
            let response = await axios.post(Api.getProductReviewAndRating, { productId: location.state.product._id })
            setReviews(response.data);
        } catch (error) {
            console.log('error', error);
        }
    }
    const starGenerate=(rating)=>{
        const ratingStar=Array.from({length:5},(_,index)=>{
            let number=index+0.5;
            return (<span key={index}>
                {
                    rating>=index+1 ? <FaStar style={{fontSize:'15px'}} color="orange" className="icon"/> : rating >= number ? <FaStarHalf style={{fontSize:'15px'}} color="orange" className="icon"/> : <AiOutlineStar style={{fontSize:'15px'}} color="orange" className="icon"/>
                }
            </span>);
        });
        return (
                <div className="icon-style">
                    {ratingStar}
                </div>
        )
    }
    return <>
        {product &&
            <>
                <div className="container my-5">
                    <div className="card">
                        <div className="container-fliud">
                            <div className="wrapper row">
                                <div className="preview col-md-6">

                                    <div className="preview-pic tab-content">
                                        <div className="tab-pane active" id="pic-1"><img src={'http://localhost:3000/images/' + product.imageURL} /></div>
                                    </div>


                                </div>
                                <div className="details col-md-6">
                                    <h3 className="product-title">{product.title}</h3>
                                    <div className="rating">
                                        <div className="stars">
                                            {starGenerate(product.averageRating)}
                                        </div>
                                        <span className="review-no">{product.rating&&product.ratings.length+" reviews"}</span>
                                    </div>
                                    <p className="product-description">{product.description}</p>
                                    <h4 className="price">current price : <span>₹ {product.price}</span></h4>
                                    <h5 className="sizes">Category :
                                        {product.category && <span className="size" data-toggle="tooltip" style={{ fontSize: '20px', fontWeight: '500' }} title="small">{product.category.name}</span>}
                                    </h5>
                                    <div className="action">
                                        <button className="add-to-cart btn btn-default my-2 me-4" type="button">add to cart</button>
                                        <button className="like btn btn-default" type="button">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='container'>
                    {reviews.map((review, index) => {
                        return <div className="my-4">
                            <div className=" border-secondary rounded d-inline-block pe-4 py-1" >
                                <img height={30} width={30} style={{ borderRadius: '50%' }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAACUCAMAAAD8tKi7AAAAMFBMVEXk5ueutLfh4+SmrbHn6eqrsbXKztC0ubzHy83X2tvr7e7a3d7Q09W7wMPd3+HAxccR9tJrAAAEbElEQVR4nO2cC6+dIAyAEYvIS/7/v73oeV/PA2i1mPgty5ZlS76RWoq0CnFycnJycnLSNJB+Smf8mBi8k9c/ah8Q0gxRq75XC+lXHb2R0Lw+CDOGTqnuBdV3YTRtLz5Yvxa/6isdvG3X3prurfdD31huxw+40H8xX+jDxG35BhDD+2D5v/a+ubCHKWaYL/ZRtiUPRmeqJ3ntWpIHkyt+sW/okQX/8yF9pTetrHyxelp534Y8+OxQf6IJ+cJYv6EnfnmQ+RnmGaW5zZN7bl5fyQfuZAND8XN6o2cOeZCVq77Au8FCQLiryOlelx4fsEZNXY65L3yQbObgUas+FzZs7hIT7ZeFZ3M3SPWUJ7mOUdXb0tPCR6YNCpXbbwvPk2kqSt837jxp0uIS5BWeqgYIlj3BoS4cjTtHircjiXo3MgS81STqLAUZkKjz1DQTjTvLwdXQxEyn939Xg64h7+y/O8FwYHeiFNmpYXd3G4/rTlAA39z3Vk/uNOpnzJRx5Gf10DnywHvTkWsCIWnUUy22u/qha+BDnz0Gmo11/xSZmI571haWZt051IXFvgVe4HkhCYbinR7X7TxevVNM74FhxL/DHrkuWR1+2fkunLBnJxXZ1I98V4a7Gp6jnU89pUmUO0f5+8BiIl5xvL5+BrPwvOaYzZW/4a16g1IDd+9P9cU843X8A3A1ByjFcUxdA1WlgePWvlL+vCr25/SGLWyRVGrif07vFLRht9eIPeVnG9Xa7AGIMTPo+5GvZv9EqstyZib6BvqA14CIX8dsFrjLr49Y99Ve6egayi//ADCj/jibNZq25+Lmab6o+tVMnIpeNjcc9AYQbtT9PIs4L3f6jW59lu8FsFY44xNmErbhMb41cMEm6wvcQjkk3xTxk1mWfJhZ1t64SULLy5/cJjPGEHTimltuz2z6kxCjN+kvcWuusCD9751JpR/aO9GKf4oDOQ0hpZNfW+o9X855R7KPcKeH0Pmo/6fzDP8uDKwj3ABuHiqve0+Q/tk8ws0TPgA+6N/F13d9PU77Zx8rR5T34z8Q9j26gjChOMY/yvfa73YaITVfSPa7nEjmMKeJlmdSgbz9kJmdNjDvlvLeb5syAX3D9A294akKhN9kzW+ofrPxf3CRpvvhi73e6MsLnmQ25Zd93CLjUPVD/pIn/94IyE0j/dWe9kKEpGUjm570tpuovSoXFeiCfsuk/l6e6i036v63Vp5mDp1mbK/cnkKepCusBnzYMATMBXzMU3W5V8mjjiTY7w8g5TGzrUDUelotj2meZDXvMJ8HQnZUUVD7vNJNRdRT2e0BE9FQBArlq+TxXackVCRKZAseGTVzCUxlzJryi/B9TxvfKN+hiCZRKFCFebKVaF8Ihe6BW/gJXdTxXNd7txVlvbd0Q5IUlI2eoT+kREzB1UhbIVM20s175FhTFDSNlDIP8t1bC/euz+/ApRqrJaOgEmY+pr4h/+0qxce3aNHZ9Vhzj2rB2F/smyN7c5Ltkat+cnLSHn/aNkF7z5jI4AAAAABJRU5ErkJggg==' />
                                <span className="ms-3">{review.user.username}</span>
                            </div>
                            <div>
                                <small>{review.review}</small>
                                <i>{starGenerate(review.rating)}</i>
                            </div>
                        </div>
                    })

                    }
                </div>
            </>
        }
    </>
}
export default ShowProductDetails;