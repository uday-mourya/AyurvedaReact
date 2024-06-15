import Carousel from "./Carousel";


function HomeData(){
    return <>
        <Carousel/>
        <div className="text-center my-4">
            <h2>OUR <span className="text-success">SERVICES</span></h2>
            <div className="container-fluid row row-cols-lg-4 row-cols-md-2 row-cols-sm-2 row-cols-1">
                <div className="col my-4">
                    <div className="p-3 h-100 border border-success" style={{ borderRadius: '20px' }}>
                        <img style={{ height: '60px', width: '60px' }} alt="" src='https://i.ibb.co/YpPZKvF/imageedit-2-2668142629-removebg-preview.png' />
                        <h4>Causes</h4>
                        <p className="text-start">You Have Yo Just Search Your Disease That We Will Give You What Is The Cause Of Your Disease</p>
                    </div>
                </div>
                <div className="col my-4">
                    <div className="p-3 h-100 border border-success" style={{ borderRadius: '20px' }}>
                        <img style={{ height: '60px', width: '60px' }} alt="" src='https://i.ibb.co/hY4T19z/171430873828214493-removebg-preview.png' />
                        <h4>Expert Doctors</h4>
                        <p className="text-start">You Can Take Appointment From Doctor Page</p>
                    </div>
                </div>
                <div className="col my-4">
                    <div className="p-3 h-100 border border-success" style={{ borderRadius: '20px' }}>
                        <img style={{ height: '60px', width: '60px' }} alt="" src='https://i.ibb.co/ZNB6jDz/ayurvedic-bowl.png' />
                        <h4>Medicines</h4>
                        <p className="text-start">You Can Shop Medicines From Medicines page</p>
                    </div>
                </div>
                <div className="col my-4">
                    <div className="p-3 border h-100 border-success" style={{ borderRadius: '20px' }}>
                        <img style={{ height: '60px', width: '60px' }} alt="" src='https://i.ibb.co/kSn83hn/hinduist-yoga-position.png' />
                        <h4>Yoga Videos</h4>
                        <p className="text-start">We Will Provide You Yoga Related Your Disease To Cure Your Disease Permanently</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center my-4">
            <h2><span className="text-success">DISEASE</span> WE TREAT</h2>
            <div className="row row-cols-lg-6 mx-0 row-cols-md-4 p-4 row-cols-sm-3 row-cols-2">
                <div className="col">
                    <div className="p-3 h-100 bg-success">
                        <img src="https://i.ibb.co/yhgv0gy/human.png" className="img-fluid" alt="" />
                        <span style={{ fontSize: '22px' }} className="text-light my-3 d-block">Digestive</span>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 h-100 bg-success">
                        <img src="https://i.ibb.co/tDZJPpD/endocrine-system.png" className="img-fluid" alt="" />
                        <span style={{ fontSize: '22px' }} className="text-light my-3 d-block">Endocrine</span>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 h-100 bg-success">
                        <img src="https://i.ibb.co/GxmgJFK/skin.png" className="img-fluid" alt="" />
                        <span style={{ fontSize: '22px' }} className="text-light my-3 d-block">Hair and Skin</span>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 h-100 bg-success">
                        <img src="https://i.ibb.co/KKSrRc7/broken-bone.png" className="img-fluid" alt="" />
                        <span style={{ fontSize: '22px' }} className="text-light my-3 d-block">Joint Pain</span>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 h-100 bg-success">
                        <img src="https://i.ibb.co/WkwbN8Q/mental-health.png" className="img-fluid" alt="" />
                        <span style={{ fontSize: '22px' }} className="text-light my-3 d-block">Mental Pain</span>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 h-100 bg-success">
                        <img src="https://i.ibb.co/PM1T48x/lungs.png" className="img-fluid" alt="" />
                        <span style={{ fontSize: '22px' }} className="text-light my-3 d-block">Breathing</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='container-fluid p-4 my-5' style={{ backgroundColor: '#b8e78e' }}>
            <h2 style={{ textShadow: '3px 3px 1px white' }} className="my-2 text-center"><span style={{ textShadow: '3px 3px 1px white' }} className="text-success py-4">ABOUT </span>US</h2>
            <div className="row row-cols-lg-2 row-cols-sm-1 row-cols-1 my-3 mt-5">
                <div className="col d-flex justify-content-center align-items-center">
                    <img src='https://t3.ftcdn.net/jpg/02/45/77/62/360_F_245776292_KjTmy7E9bYhpZxfikW1YLbZrG2EPoRay.jpg' className="img-fluid" alt="" />
                </div> 
                <div className="col d-flex justify-content-center align-items-center">
                   <div>
                    <h4 className="my-4">We Can Take of Your Healthy Life</h4>
                   <p>
                    At The Great Ayurveda, we merge ancient wisdom with modern solutions for holistic well-being. Our experienced Ayurvedic doctors offer personalized consultations and recommend authentic medicines to address diverse health concerns.
                    </p>
                    <p>. Additionally, we promote yoga practices that enhance physical and mental wellness, tailored to individual needs. Complementing these efforts, our natural home remedies provide simple yet effective solutions for common ailments, empowering you to take charge of your health naturally.</p>
                   </div>
                </div>
            </div>
        </div>
        <div className="container row row-cols-lg-4 text-center m-auto">
            <div className="col">
                <div className="p-4">
                    <img src='https://i.ibb.co/RgdmxT1/doctor.png' style={{height:'70px',width:'70px'}} className="img-fluid" alt=""/>
                    <h2 className="text-secondary">28+</h2>
                    <span className="text-secondary">Doctor At Work</span>
                </div>
            </div>
            <div className="col">
                <div className="p-4">
                    <img src='https://i.ibb.co/WsFNW1Q/multiple-users-silhouette.png' style={{height:'70px',width:'70px'}} className="img-fluid" alt=""/>
                    <h2 className="text-secondary">12+</h2>
                    <span className="text-secondary">Satisfied Patients</span>
                </div>
            </div>
            <div className="col">
                <div className="p-4">
                    <img src='https://i.ibb.co/wWH2T6P/medicine.png' style={{height:'70px',width:'70px'}} className="img-fluid" alt=""/>
                    <h2 className="text-secondary">128+</h2>
                    <span className="text-secondary">Medicines</span>
                </div>
            </div>
            <div className="col">
                <div className="p-4">
                    <img src='https://i.ibb.co/hHp7R6Q/virus.png' style={{height:'70px',width:'70px'}} className="img-fluid" alt=""/>
                    <h2 className="text-secondary">55+</h2>
                    <span className="text-secondary">Disease We Treat</span>
                </div>
            </div>
        </div>
    </>
}
export default HomeData;