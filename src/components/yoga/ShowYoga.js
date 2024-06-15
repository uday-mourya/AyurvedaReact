import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import WebApi from '../WebApi/Api.js'
import axios from "axios";
import { toast } from "react-toastify";
import starGenerate from "../product/GenerateRating.js";

function ShowYoga() {
  const [yogaList, setYogaList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadYogas();
  }, []);

  const loadYogas = async () => {
    try {
      let response = await axios.get(WebApi.getAllYoga);
      console.log(response.data.Yogas);
      setYogaList(response.data.Yogas);
    } catch (err) {
      console.log(err);
      toast.error("Something wrong");
    }
  };
  function ShowYogaDetails(yoga) {
    navigate("/ShowYogaDetails", { state: { yoga } });
  }
  return (
    <>
      <h2 className="text-center my-3"><span className="text-secondary">Yoga</span></h2>
            <div className="border border-1 border-secondary m-auto mb-4" style={{width:'300px'}}></div>
            <div className="row p-4 row-cols-lg-4 row-cols-md-3  row-cols-sm-2 row-cols-1">
                {yogaList.map((yoga, index) => (
                    <div className="col text-center p-3 my-3" style={{height:'450px'}} key={index}>
                        <div style={{ borderRadius: '20px', boxShadow: '2px 2px 8px gray' }} className="p-3 h-100 position-relative ">
                            <img src={yoga.imageUrl} style={{ height: '200px', width: '200px' }} className="img-fluid rounded rounded-3" alt={yoga.title} />
                            <div className="card-body p-0 m-0 text-center my-3">
                                <h6 className="card-title text-center">{yoga.yogaName}</h6>
                                <p style={{height:'27px'}} className="text-center">{yoga.Description.substring(0, 39)}...</p>
                                <span  className="card-text text-center d-block pt-2 my-2">{starGenerate(yoga.averageRating)}</span>                            
                             </div>
                             <button onClick={() => ShowYogaDetails(yoga)} className="btn btn-success form-control">Get Start</button>
                        </div>
                    </div>
                ))}
            </div>
    </>
  );
}
export default ShowYoga;
