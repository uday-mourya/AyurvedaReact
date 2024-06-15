import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
function Home() {
    let [user,setUser]=useState({});
    useEffect(()=>{
        setUser(JSON.parse(sessionStorage.getItem('user-details')));
    },[]);
    return <>
        <Header />
        <Outlet/>
        <Footer />
    </>
}
export default Home;