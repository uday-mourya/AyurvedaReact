import { Outlet, useNavigate } from "react-router-dom"

function Home() {
    const navigate=useNavigate();

    return <>
        <div style={{ width: '100% !important' }} className="container justify-content-center align-items-center">
            <div className='row row-cols-3' style={{ width: '100% !important' }}>
            <div className='col p-3'>
                    <div className='border border-success bg-secondary' style={{ height: '150px', borderRadius: '20px' }}>
                        <h2 className='p-4' style={{ color: 'wheat' }}>
                            Doctors
                        </h2>
                    </div>
                </div>
                <div className='col p-3'>
                    <div className='border border-success bg-secondary'onClick={()=>navigate('pending-doctor-request')} style={{ height: '150px', borderRadius: '20px' }}>
                        <h3 className='p-4' style={{ color: 'wheat' }}>
                            Pending Doctor Request
                        </h3>
                    </div>
                </div>
                <div className='col p-3'>
                    <div className='border border-success bg-secondary' style={{ height: '150px', borderRadius: '20px' }}>
                        <h2 className='p-4' style={{ color: 'wheat' }}>
                            New Users
                        </h2>
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    </>
}
export default Home