import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function DiseasesSearch(){
    const location=useLocation();
    useEffect(()=>{
        console.log('Hello');
        console.log(location.state.searchValue);
    },[])
   return <>
        <h2>Hello</h2>
   </> 
}
export default DiseasesSearch;