import React, { useState } from 'react';
import { useGlobalSkills } from '../../../context/skillContext';
import { toast, ToastContainer } from 'react-toastify';
import Loader3dot from '../../../components/loading/Loader3dot';
import axios from 'axios';

const ClubChartForm = () => {
    const { isLoading,clubChartForSillong } = useGlobalSkills();
        
    const [formData, setFormData] = useState({
        chartName: clubChartForSillong[0].chartName || "",
        title: clubChartForSillong[0].title || "" ,
        imageUrl: clubChartForSillong[0].imageUrl || null, // URL of the uploaded image
    });
    const [loder, setLoder] = useState(false); // Loading indicator for image upload

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            uploadImage(files[0]);
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const uploadImage = async (file) => {
        const data = new FormData();
        data.append('file', file);
        setLoder(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}api/blog/file`,
                data
            );
            if (response.status === 200) {
                setLoder(false);
                setFormData((prev) => ({
                    ...prev,
                    imageUrl: response.data.imageUrl
                }));
                showToast('Image uploaded successfully!');
            }
        } catch (error) {
            setLoder(false);
            showToast('Failed to upload image. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}api/clubChart`,
                formData
            );
            if (response.status === 200) {
                showToast('Club Chart uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading data:', error);
            showToast('Error uploading Club Chart.');
        }
    };

    const showToast = (message) => {
        toast(message, {
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
    };

    return (
        <div className="flex justify-between p-10 bg-gray-100 h-full">
            <ToastContainer className="custom-toast" />
            <form onSubmit={handleSubmit} className="w-1/2 p-4">
                <h1 className="text-4xl font-semibold mb-4">Upload Club Chart</h1>
                <div className="mb-4">
                    <label className="block mb-2">Chart Name</label>
                    <input
                        type="text"
                        name="chartName"
                        value={formData.chartName}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Image</label>
                    <input
                        type="file"
                        name="imageUrl"
                        accept="image/*"
                        onChange={handleChange}
                        className="border rounded w-full p-2"
                    />
                </div>
                <button type="submit" className="bg-red-900 hover:border-red-900 hover:bg-transparent border-2 active:scale-110 text-white hover:text-red-900 font-semibold transition-all duration-100 rounded py-2 px-4">
                    Submit
                </button>
            </form>

            {isLoading ? (
                <Loader3dot />
            ) : (
                <div className="w-1/2 p-4">
                    {formData.chartName && <h1 className="text-2xl text-center">{formData.chartName}</h1>}
                    {formData.title && <h1 className="text-xl text-center">{formData.title}</h1>}
                    {loder ? (
                        <Loader3dot />
                    ) : (
                        <div className="text-center mt-2 border flex justify-center items-center">
                            {formData.imageUrl ? (
                                <div className='w-[400px] h-[500px]'>

                                <img src={formData.imageUrl} alt="Preview" className="rounded shadow-md w-full h-full" />
                                </div>
                            ) : (
                                'No Image Selected'
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClubChartForm;
