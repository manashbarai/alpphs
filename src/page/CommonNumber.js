import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGlobalSkills } from '../context/skillContext';

const CommonNumber = () => {
    const { sillongCommonNumber, buthanCommonNumber } = useGlobalSkills();

    // Helper function to render rows
    const renderRows = (data) => {
        if (!data) return null;

        const directSets = data.direct?.split('@') || [];
        const houseValues = data.house?.split('@') || [];
        const endingValues = data.ending?.split('@') || [];

        return directSets.map((direct, index) => (
            <tr key={index}>
                <td className="border border-[#5b2a29] px-4 py-2">{direct}</td>
                <td className="border border-[#5b2a29] px-4 py-2">{houseValues[index] || ''}</td>
                <td className="border border-[#5b2a29] px-4 py-2">{endingValues[index] || ''}</td>
            </tr>
        ));
    };

    // Check if data is loading
    const isLoading = !sillongCommonNumber?.results || !buthanCommonNumber?.results;

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-8 px-4">
                {/* Show Loading Message if Data is Not Available */}
                {isLoading ? (
                    <div className="text-center my-16">
                        <h2 className="text-3xl font-bold text-gray-600">Loading...</h2>
                    </div>
                ) : (
                    <>
                        {/* Shillong Teer Common Number Section */}
                        <div className="flex justify-center">
                            <div className="w-full lg:w-1/2 bg-white p-2  lg:p-6 shadow-md rounded border">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        Shillong Teer Common Number
                                    </h2>
                                </div>
                                <div className="overflow-x-auto border-4 border-[#5b2a29] rounded">
                                    <h5 className="text-xl font-semibold py-2 text-center text-white bg-[#5b2a29]">
                                        28 October 2024
                                    </h5>
                                    <div className="p-3 text-xl">
                                        <table className="table-auto w-full text-center bg-white">
                                            <thead className="bg-gray-700 text-white">
                                                <tr>
                                                    <th className="border border-[#5b2a29] px-4 py-2">Direct</th>
                                                    <th className="border border-[#5b2a29] px-4 py-2">House</th>
                                                    <th className="border border-[#5b2a29] px-4 py-2">Ending</th>
                                                </tr>
                                            </thead>
                                            <tbody className="font-semibold">
                                                {renderRows(sillongCommonNumber.results)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bhutan Common Number Section */}
                        <div className="container mx-auto my-8 ">
                            <div className="flex justify-center">
                                <div className="w-full lg:w-1/2 bg-white p-2  lg:p-6 shadow-md rounded border">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold text-gray-800">
                                            Bhutan Common Number
                                        </h2>
                                    </div>
                                    <div className="overflow-x-auto border-4 border-[#5b2a29] rounded">
                                        <h5 className="text-xl font-semibold py-2 text-center text-white bg-[#5b2a29]">
                                            28 October 2024
                                        </h5>
                                        <div className="p-3 text-xl">
                                            <table className="table-auto w-full text-center bg-white">
                                                <thead className="bg-gray-700 text-white">
                                                    <tr>
                                                        <th className="border border-[#5b2a29] px-4 py-2">Direct</th>
                                                        <th className="border border-[#5b2a29] px-4 py-2">House</th>
                                                        <th className="border border-[#5b2a29] px-4 py-2">Ending</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="font-semibold">
                                                    {renderRows(buthanCommonNumber.results)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CommonNumber;
