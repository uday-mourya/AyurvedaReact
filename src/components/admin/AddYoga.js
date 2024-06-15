// AddYogaAdmin.js

import { useEffect, useRef, useState } from "react";
import Api from "../WebApi/Api";
import axios from "axios";
import { toast } from "react-toastify";

function AddYogaAdmin() {
    const YogaName = useRef(null);
    const DescriptionRef = useRef(null);
    const BenefitsRef = useRef(null);
    const InstructionsRef = useRef(null);
    const imageUrlRef = useRef(null);
    const videoUrlRef = useRef(null);
    const CategoryRef = useRef(null);
    const [categorys, setCategorys] = useState([]);

    const emptyAllRef = () => {
        YogaName.current.value = '';
        DescriptionRef.current.value = '';
        BenefitsRef.current.value = '';
        InstructionsRef.current.value = '';
        imageUrlRef.current.value = '';
        videoUrlRef.current.value = '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            yogaName: YogaName.current.value,
            Description: DescriptionRef.current.value,
            benefits: BenefitsRef.current.value.split(',').map(benefit => benefit.trim()),
            instructions: InstructionsRef.current.value,
            imageUrl: imageUrlRef.current.value,
            videoUrl: videoUrlRef.current.value,
            categoryId: CategoryRef.current.value
        };

        try {
            const response = await axios.post(Api.AddYoga, formData);
            toast.success(response.data.message);
            emptyAllRef();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getCategory = async () => {
        try {
            let response = await axios.get(Api.getCategory);
            setCategorys(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <div className="container p-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Yoga Name:</label>
                        <input type="text" className="form-control" id="title" name="yogaName" ref={YogaName} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" id="description" name="description" rows="4" ref={DescriptionRef} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="benefits" className="form-label">Benefits (comma-separated):</label>
                        <input type="text" className="form-control" id="benefits" name="benefits" ref={BenefitsRef} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="instructions" className="form-label">Instructions:</label>
                        <textarea className="form-control" id="instructions" name="instructions" rows="4" ref={InstructionsRef} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                        <input type="text" className="form-control" id="imageUrl" name="imageUrl" ref={imageUrlRef} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="videoUrl" className="form-label">Video URL:</label>
                        <input type="text" className="form-control" id="videoUrl" name="videoUrl" ref={videoUrlRef} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
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

export default AddYogaAdmin;
