import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "./WebApi/Api";
import axios from "axios";

function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    let [user, setUser] = useState({});
    const navigate = useNavigate();

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user-details')));
        getCategory();
    }, []);

    const getCategory = async () => {
        const result = await axios.get(Api.getCategory);
        setCategories(result.data.categories);
    };

    useEffect(() => {
        if (searchValue === '') {
            setFilteredCategories([]);
        } else {
            setFilteredCategories(categories.filter(category =>
                category.name.toLowerCase().startsWith(searchValue.toLowerCase())
            ));
        }
    }, [searchValue, categories]);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleInputBlur = () => {
        if (searchValue === '') {
            setShowSearch(false);
        }
    };

    const handleSuggestionClick = (categoryName) => {
        setSearchValue(categoryName);
        setShowSearch(false);
    };

    const LogOut = () => {
        sessionStorage.clear();
        navigate('/');
        setUser(null);
        toast.info('Logout');
    };

    const showCart = () => {
        if (!user) {
            toast.error('Firstly Login');
            return;
        }
        navigate('/show-cart');
    };

    const handleSearch = ()=>{
        navigate('/diseases',{state:{searchValue}});
    }
    const handleYogaNavigate=()=>{
        if (!user) {
            toast.error('Firstly Login');
            return;
        }
        navigate('/yoga');
    }
    const LinkStyle = { color: 'rgb(87, 86, 86)', textDecoration: 'none' ,cursor:'pointer'};
    const img = 'https://i.postimg.cc/0N4mvQzt/png-transparent-ayurveda-healing-tree-art-ayurveda-therapy-medicine-hospital-panchakarma-herbal-food.png';

    return (
        <>
            <div className='topheader d-flex justify-content-around align-items-center'>
                <div ><img style={{ borderRadius: '50%', height: '60px' }} src={img} className="img-fluid" alt="" /><h4 className="d-inline-block px-2 text-success">The Great Ayurveda</h4></div>
                <div>
                    <div className="input-group me-3 position-relative d-sm-none d-none d-md-block d-lg-block">
                        <input
                            style={{border:'1px solid gray'}}
                            type="search"
                            className="rounded-pill rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={searchValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onFocus={() => setShowSearch(true)}
                        />
                        <button type="button" onClick={handleSearch} style={{ borderRadius: '50rem', right: '0' }} className="seachbtn position-absolute btn btn-success" data-mdb-ripple-init><span>search</span></button>
                        {showSearch && filteredCategories.length > 0 && (
                            <div className="search-suggestions position-absolute bg-white border rounded mt-2" style={{ zIndex: 1, width: '100%' }}>
                                {filteredCategories.map(category => (
                                    <div key={category.id} className="p-2 border-bottom" onMouseDown={() => handleSuggestionClick(category.name)}>
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {user ? (
                        <>
                            <span style={{ cursor: 'pointer', fontWeight: '600' }} className="text-success me-4"><i className="fa fa-user pe-2" style={{ fontSize: '22px' }} aria-hidden="true"></i>Profile</span>
                            <span onClick={LogOut} style={{ cursor: 'pointer', fontWeight: '600' }} className="text-success me-4"><i className="fa fa-sign-out pe-2" style={{ fontSize: '22px' }} aria-hidden="true"></i>LogOut</span>
                        </>
                    ) : (
                        <>
                            <span onClick={() => navigate('user-account')} style={{ cursor: 'pointer', fontWeight: '600' }} className="text-success pe-3"><i className="fa fa-user pe-2" style={{ fontSize: '22px' }} aria-hidden="true"></i>Login</span>
                        </>
                    )}
                    <span onClick={showCart} style={{ cursor: 'pointer', fontWeight: '600' }} className="text-success"><i className="fa fa-shopping-cart pe-2" style={{ fontSize: '22px' }} aria-hidden="true"></i>Cart</span>
                </div>
            </div>
            <nav className="navbar navbar-expand-md position-relative" style={{ backgroundColor: '#186C38'}}>
                <button className="navbar-toggler border-0 " style={{boxShadow:'none'}} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars text-light border-0 ms-5"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ backgroundColor: '#186C38', color: 'white' }}>
                    <ul className="navbar-nav text-dark mr-auto w-100 d-flex justify-content-around align-items-center">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link text-light" style={LinkStyle}>Home</Link>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link dropdown-toggle text-light" style={LinkStyle} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu border-0" style={{ backgroundColor: 'transparent' }} aria-labelledby="navbarDropdown">
                                <div className="row row-cols-2 rounded rounded-3 p-2" style={{ width: '360px', backgroundColor: 'white' }}>
                                    {categories.map((category) => (
                                        <div className="col" key={category.id}>
                                            <span className="dropdown-item">{category.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>
                        <li className="nav-item active">
                            <Link to="/get-all-products" className="nav-link text-light" style={LinkStyle}>Products</Link>
                        </li>
                        <li className="nav-item active">
                            <a onClick={handleYogaNavigate} className="nav-link text-light" style={LinkStyle}>Yoga</a>
                        </li>
                        <li className="nav-item active">
                            <Link to="/homeremedies" className="nav-link text-light" style={LinkStyle}>Home Remedies</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/about" className="nav-link text-light" style={LinkStyle}>About Us</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/doctorconsult" className="nav-link text-light" style={LinkStyle}>Doctor Consult</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/contact" className="nav-link text-light" style={LinkStyle}>Contact</Link>
                        </li>
                        <li className="nav-item w-100 d-md-none d-lg-none">
                            <>
                                <input
                                    style={{height:'38px',border:'1px solid gray'}}
                                    type="search"
                                    className="rounded-pill ps-3 rounded w-100"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    onFocus={() => setShowSearch(true)}
                                />
                                <button type="button" style={{ borderRadius: '50rem', right: '0' }} className="seachbtn position-absolute btn btn-success" data-mdb-ripple-init><span>search</span></button>
                                {showSearch && filteredCategories.length > 0 && (
                                    <div className="search-suggestions position-absolute bg-white border rounded mt-2" style={{ zIndex: 1, width: '100%' }}>
                                        {filteredCategories.map(category => (
                                            <div key={category.id} className="p-2 border-bottom" onMouseDown={() => handleSuggestionClick(category.name)}>
                                                {category.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;
