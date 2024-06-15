import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Api from '../WebApi/Api';
import { toast } from 'react-toastify';

function AddProduct() {
    const titleRef = useRef(null);
    const brandRef = useRef(null);
    const priceRef = useRef(null);
    const descriptionRef = useRef(null);
    const stockRef = useRef(null);
    const fileInputRef = useRef(null);
    const CategoryRef = useRef(null);
    const [categorys, setCategorys] = useState([]);
    const emptyAllRef=()=>{
        titleRef.current.value='';
        brandRef.current.value='';
        priceRef.current.value='';
        descriptionRef.current.value='';
        stockRef.current.value='';
        fileInputRef.current.files[0]=null;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('brand', brandRef.current.value);
        formData.append('price', priceRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('stock', stockRef.current.value);
        formData.append('category', CategoryRef.current.value);
        formData.append('image', fileInputRef.current.files[0]);

        try {
            const response = await axios.post(Api.addOneProduct, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            emptyAllRef();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const getCategory = async () => {
        try {
            let response = await axios.get(Api.getCategory);
            console.log(response.data.categories)
            setCategorys(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategory();
    }, [])
    return (
        <>
            <div className="container p-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" name="title" ref={titleRef} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="brand" className="form-label">Brand:</label>
                        <input type="text" className="form-control" id="brand" name="brand" ref={brandRef} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price:</label>
                        <input type="number" className="form-control" id="price" name="price" step="0.01" ref={priceRef} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">Stock:</label>
                        <input type="number" className="form-control" id="stock" name="stock" ref={stockRef} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" id="description" name="description" rows="4" ref={descriptionRef} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productImage" className="form-label">Product Image:</label>
                        <input type="file" className="form-control" id="productImage" ref={fileInputRef} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productImage" className="form-label">Category</label>
                        <select ref={CategoryRef} className="form-select">
                            {categorys.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
