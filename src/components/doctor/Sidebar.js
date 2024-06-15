import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import '../style/doctor.css'
import { useNavigate } from 'react-router-dom';
function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate=useNavigate();
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img width={80} height={80} src='https://i.postimg.cc/0N4mvQzt/png-transparent-ayurveda-healing-tree-art-ayurveda-therapy-medicine-hospital-panchakarma-herbal-food.png'/>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <span onClick={()=>navigate('/doctor-dashboard')}>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </span>
            </li>
            <li className='sidebar-list-item'>
                <span>
                    <BsFillArchiveFill className='icon'/> Products
                </span>
            </li>
            <li className='sidebar-list-item'>
                <span>
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </span>
            </li>
            <li className='sidebar-list-item'>
                <span>
                    <BsPeopleFill className='icon'/> Customers
                </span>
            </li>
            <li className='sidebar-list-item'>
                <span>
                    <BsListCheck className='icon'/> Inventory
                </span>
            </li>
            <li className='sidebar-list-item'>
                <span>
                    <BsMenuButtonWideFill className='icon'/> Reports
                </span>
            </li>
            <li className='sidebar-list-item'>
                <span>
                    <BsFillGearFill className='icon'/> Setting
                </span>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
