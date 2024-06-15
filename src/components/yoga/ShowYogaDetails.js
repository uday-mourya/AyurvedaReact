import { useLocation } from "react-router-dom";
import starGenerate from "../product/GenerateRating";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../WebApi/Api";
import { toast } from "react-toastify";

function ShowYogaDetails() {
  let [user, setUser] = useState({});
  let [currentStar, setCurruntStar] = useState(1);
  let [review, setReview] = useState('');
  let [userReview, setUserReview] = useState(0);
  let [change, setChange] = useState(0);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const yoga = location.state.yoga;
  function getYouTubeVideoId(url) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
    return match && match[1] ? match[1] : '';
  }
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user-details')));
    console.log("sas", location.state.yoga);
    getReviewAndRating();
  }, [change])
  const handleRatingChange = (rating) => {
    setCurruntStar(rating);
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
              style={{ cursor: 'pointer', fontSize: '31px', color: 'orange' }}
            >
              {starValue <= currentStar ? '★' : '☆'}
            </span>
          );
        })}
      </div>
    );
  };

  const addYogaRatingReview = async () => {
    await axios.post(Api.addRateAndReviewUserYoga, { userId: user._id, yogaId: yoga._id, rating: currentStar, review });
    setChange(8);
  }
  const updateReviewAndRating = async () => {
    try {
      let response = await axios.put(Api.updateYogaReviewAndRating, { userId: user._id, yogaId: yoga._id, rating: currentStar, review });
      setChange(5);
      console.log(response);
      toast.info('Review Changed');
    } catch (error) {
      toast.error('Someting wen\'s wrong')
    }
  }
  const getReviewAndRating = async () => {
    try {
      setReviews((await axios.get(Api.getReviewForYoga + "/" + yoga._id)).data);
      let response = await axios.get(Api.getReviewForYogaByUser + "/" + yoga._id + "/" + (JSON.parse(sessionStorage.getItem('user-details')))._id);
      setUserReview(response.data);
      setCurruntStar(response.data.rating);
      setReview(response.data.review);
      console.log(response.data);
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <>
      <div className="container-fluid p-3 my-5">
        <div className="row position-relative">
          <div className="position-fixed-top col-md-5 d-flex justify-content-center align-items-center p-3">
            <div className="m-2">
              <div className="p-1">
                <iframe
                  width="520"
                  height="345"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(yoga.videoUrl)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="m-2">
              <div className="p-1">
                <span className="card-text text-start d-block pt-2 my-2">{starGenerate(yoga.averageRating)}</span>
                <h5>What is {yoga.yogaName}</h5>
                <p>{yoga.Description}</p>
                <h5>Instruction:</h5>
                <p>{yoga.instructions}</p>
                <h5>Benefits:</h5>
                {yoga.benefits.map((dene, index) => (
                  <p key={index}>
                    {index + 1}. {dene}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        {userReview ? <div>
          <h3 onLoad={() => setCurruntStar(userReview.rating)}>Your Review</h3>
          <StarRating totalStars={5} />
          <textarea className="p-2" style={{ width: '341px' }} value={review}
            onChange={(e) => setReview(e.target.value)}></textarea>
          <button onClick={updateReviewAndRating} className="btn-sm btn-success d-block border-0">Save Changes</button>
        </div> : <div className="container">
          <StarRating totalStars={5} />
          <textarea style={{ width: '341px' }} value={review}
            onChange={(e) => setReview(e.target.value)} id='review'></textarea>
          <button onClick={addYogaRatingReview} className="btn-sm d-block border-0 btn-success">Submit</button>
        </div>}
      </div>
      <div className='container'>
        {reviews.map((review, index) => {
          {
            return review.user._id == user._id ? <div></div> : <div className="my-4">
              <div className=" border-secondary rounded d-inline-block pe-4 py-1" >
                <img height={30} width={30} style={{ borderRadius: '50%' }} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAACUCAMAAAD8tKi7AAAAMFBMVEXk5ueutLfh4+SmrbHn6eqrsbXKztC0ubzHy83X2tvr7e7a3d7Q09W7wMPd3+HAxccR9tJrAAAEbElEQVR4nO2cC6+dIAyAEYvIS/7/v73oeV/PA2i1mPgty5ZlS76RWoq0CnFycnJycnLSNJB+Smf8mBi8k9c/ah8Q0gxRq75XC+lXHb2R0Lw+CDOGTqnuBdV3YTRtLz5Yvxa/6isdvG3X3prurfdD31huxw+40H8xX+jDxG35BhDD+2D5v/a+ubCHKWaYL/ZRtiUPRmeqJ3ntWpIHkyt+sW/okQX/8yF9pTetrHyxelp534Y8+OxQf6IJ+cJYv6EnfnmQ+RnmGaW5zZN7bl5fyQfuZAND8XN6o2cOeZCVq77Au8FCQLiryOlelx4fsEZNXY65L3yQbObgUas+FzZs7hIT7ZeFZ3M3SPWUJ7mOUdXb0tPCR6YNCpXbbwvPk2kqSt837jxp0uIS5BWeqgYIlj3BoS4cjTtHircjiXo3MgS81STqLAUZkKjz1DQTjTvLwdXQxEyn939Xg64h7+y/O8FwYHeiFNmpYXd3G4/rTlAA39z3Vk/uNOpnzJRx5Gf10DnywHvTkWsCIWnUUy22u/qha+BDnz0Gmo11/xSZmI571haWZt051IXFvgVe4HkhCYbinR7X7TxevVNM74FhxL/DHrkuWR1+2fkunLBnJxXZ1I98V4a7Gp6jnU89pUmUO0f5+8BiIl5xvL5+BrPwvOaYzZW/4a16g1IDd+9P9cU843X8A3A1ByjFcUxdA1WlgePWvlL+vCr25/SGLWyRVGrif07vFLRht9eIPeVnG9Xa7AGIMTPo+5GvZv9EqstyZib6BvqA14CIX8dsFrjLr49Y99Ve6egayi//ADCj/jibNZq25+Lmab6o+tVMnIpeNjcc9AYQbtT9PIs4L3f6jW59lu8FsFY44xNmErbhMb41cMEm6wvcQjkk3xTxk1mWfJhZ1t64SULLy5/cJjPGEHTimltuz2z6kxCjN+kvcWuusCD9751JpR/aO9GKf4oDOQ0hpZNfW+o9X855R7KPcKeH0Pmo/6fzDP8uDKwj3ABuHiqve0+Q/tk8ws0TPgA+6N/F13d9PU77Zx8rR5T34z8Q9j26gjChOMY/yvfa73YaITVfSPa7nEjmMKeJlmdSgbz9kJmdNjDvlvLeb5syAX3D9A294akKhN9kzW+ofrPxf3CRpvvhi73e6MsLnmQ25Zd93CLjUPVD/pIn/94IyE0j/dWe9kKEpGUjm570tpuovSoXFeiCfsuk/l6e6i036v63Vp5mDp1mbK/cnkKepCusBnzYMATMBXzMU3W5V8mjjiTY7w8g5TGzrUDUelotj2meZDXvMJ8HQnZUUVD7vNJNRdRT2e0BE9FQBArlq+TxXackVCRKZAseGTVzCUxlzJryi/B9TxvfKN+hiCZRKFCFebKVaF8Ihe6BW/gJXdTxXNd7txVlvbd0Q5IUlI2eoT+kREzB1UhbIVM20s175FhTFDSNlDIP8t1bC/euz+/ApRqrJaOgEmY+pr4h/+0qxce3aNHZ9Vhzj2rB2F/smyN7c5Ltkat+cnLSHn/aNkF7z5jI4AAAAABJRU5ErkJggg==' />
                <span className="ms-3">{review.user.username}</span>
              </div>
              <div>
                <small>{review.review}</small>
                <i>{starGenerate(review.rating)}</i>
              </div>
            </div>
          }
        })

        }
      </div>
    </>
  );
}

export default ShowYogaDetails;
