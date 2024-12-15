import axios from "axios";
import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { useGlobalSkills } from "../../context/skillContext";
import StateCard from "../dashboard/state/StateCard";
import Loader3dot from "../../components/loading/Loader3dot";
import { showToast } from "../../util/toastUtils";
import { toast, ToastContainer } from "react-toastify";

const Result = () => {
    const { isLoading, shillongs, khanaparas, juwais, nights, bhutans, bhutanTeers } = useGlobalSkills(); // Assuming state provides input fields for 'resultList'
    console.log("nights",nights);
    

    const initialState = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    };

    const [sillong, setSillong] = useState({
        day: initialState.day,
        month: initialState.month,
        year: initialState.year,
        ResultOne: shillongs.ResultOne || "",
        ResultTwo: shillongs.ResultTwo || ""
    })

    const [khanpara, setKhanpara] = useState({
        day: initialState.day,
        month: initialState.month,
        year: initialState.year,
        ResultOne: khanaparas.ResultOne || "",
        ResultTwo: khanaparas.ResultTwo || ""
    })
    const [jweai, setJweai] = useState({
        day: initialState.day,
        month: initialState.month,
        year: initialState.year,
        ResultOne: juwais.ResultOne || "",
        ResultTwo: juwais.ResultTwo || ""
    })

    const [night, setNight] = useState({
        day: initialState.day,
        month: initialState.month,
        year: initialState.year,
        ResultOne: nights.ResultOne || "",
        ResultTwo: nights.ResultTwo || ""
    })
    const [bhutan, setBhutan] = useState({
        day: initialState.day,
        month: initialState.month,
        year: initialState.year,
        ResultOne: bhutans.ResultOne || "",
        ResultTwo: bhutans.ResultTwo || ""
    })

    const [bhutanTeer, setBhutanTeer] = useState({
        day: initialState.day,
        month: initialState.month,
        year: initialState.year,
        ResultOne: bhutanTeers.ResultOne || "",
        ResultTwo: bhutanTeers.ResultTwo || ""
    })

    const [post, setPost] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Helper function to send data for a given state
            const sendData = async (stateData, endpoint) => {
                const { day, month, year, ResultOne, ResultTwo } = stateData;

                              

                const payload = {
                    day,
                    month,
                    year,
                    ResultOne: Number(ResultOne) || null,
                    ResultTwo: Number(ResultTwo) || null,
                };
    
                // Send to API with axios
                await axios.post(endpoint, payload, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            };
    
            // Sequentially send data for each state
            const states = [
                { data: sillong, endpoint: `${process.env.REACT_APP_API_URL}api/sillong` },
                { data: khanpara, endpoint: `${process.env.REACT_APP_API_URL}api/khanpara` },
                { data: jweai, endpoint: `${process.env.REACT_APP_API_URL}api/jweai` },
                { data: night, endpoint: `${process.env.REACT_APP_API_URL}api/night` },
                { data: bhutan, endpoint: `${process.env.REACT_APP_API_URL}api/bhutan` },
                { data: bhutanTeer, endpoint: `${process.env.REACT_APP_API_URL}api/bhutanTeer` },
            ];
    
            for (const { data, endpoint } of states) {
                await sendData(data, endpoint);
            }
    
            showToast("Data submitted successfully");
        } catch (error) {
            console.error("Error submitting data:", error);
            showToast("Error submitting data");
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
        <div className="px-28 bg-gray-200 h-full pt-16">

            <ToastContainer className={'custom-toast'} />

            {post === "excelUpload" && (
                <div className="fixed inset-0  flex items-center justify-center  bg-black bg-opacity-60">

                    <div className="text-9xl text-center bg-white w-80 h-72 absolute top-50">

                        <button
                            className="absolute top-2 right-2 text-sm text-red-500"
                            onClick={() => setPost("")}
                        >
                            X
                        </button>

                        Wait..</div>
                </div>
            )}





            <div className="flex items-center justify-center ">
                <form onSubmit={handleSubmit} className=" ">

                    <div className="grid lg:grid-cols-3 gap-5  text-white   ">





                        <div className="  mb-2 relative bg-orange-800/20 bg-red-900 border rounded shadow-md backdrop-blur-md py-1 pb-5 px-3">
                            <h1 className="text-2xl mt-3 text-shadow-sm text-white mb-2">Sillong</h1>


                            <div className="mb-2 relative w-full">


                                <input
                                    id="date"

                                    type="date"
                                    value={`${sillong.year}-${String(sillong.month).padStart(2, '0')}-${String(sillong.day).padStart(2, '0')}`}
                                    className="border rounded w-full px-5 h-[32px] relative z-20 bg-transparent"
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split("-");
                                        setSillong((prev) => ({
                                            ...prev,
                                            year,
                                            month,
                                            day,
                                        }));
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" placeholder="3.46pm Upload time" value={sillong.ResultOne} className="border  bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setSillong((prev) => ({
                                        ...prev,
                                        ResultOne: e.target.value
                                    }));
                                }} />

                                <input type="text" value={sillong.ResultTwo} placeholder="4.41pm Upload time" className="border bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setSillong((prev) => ({
                                        ...prev,
                                        ResultTwo: e.target.value
                                    }));
                                }} />


                            </div>


                        </div>


                        <div className="  mb-2 relative bg-orange-800/20 bg-red-900 border rounded shadow-md backdrop-blur-md py-1 px-3">
                            <h1 className="text-2xl mt-3 text-shadow-sm text-white mb-2">Khanpara</h1>


                            <div className="mb-2 relative w-full ">


                                <input
                                    id="date"
                                    type="date"
                                    value={`${sillong.year}-${String(sillong.month).padStart(2, '0')}-${String(sillong.day).padStart(2, '0')}`}
                                    className="border rounded w-full px-5 h-[32px] relative z-20 bg-transparent"
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split("-");
                                        setKhanpara((prev) => ({
                                            ...prev,
                                            year,
                                            month,
                                            day,
                                        }));
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={khanpara.ResultOne} placeholder="4.00pm Upload time" className="border  bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setKhanpara((prev) => ({
                                        ...prev,
                                        ResultOne: e.target.value
                                    }));
                                }} />

                                <input type="text" value={khanpara.ResultTwo} placeholder="4.40pm Upload time" className="border bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setKhanpara((prev) => ({
                                        ...prev,
                                        ResultTwo: e.target.value
                                    }));
                                }} />


                            </div>




                        </div>



                        <div className="  mb-2 relative bg-orange-800/20 bg-red-900 border rounded shadow-md backdrop-blur-md py-1 px-3">
                            <h1 className="text-2xl mt-3 text-shadow-sm text-white mb-2">Jweai</h1>


                            <div className="mb-2 relative w-full">


                                <input
                                    id="date"
                                    type="date"
                                    value={`${sillong.year}-${String(sillong.month).padStart(2, '0')}-${String(sillong.day).padStart(2, '0')}`}
                                    className="border rounded w-full px-5 h-[32px] relative z-20 bg-transparent"
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split("-");
                                        setJweai((prev) => ({
                                            ...prev,
                                            year,
                                            month,
                                            day,
                                        }));
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={jweai.ResultOne} placeholder="2.01pm Upload time" className="border  bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setJweai((prev) => ({
                                        ...prev,
                                        ResultOne: e.target.value
                                    }));
                                }} />

                                <input type="text" value={jweai.ResultTwo} placeholder="2.46pm Upload time" className="border bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setJweai((prev) => ({
                                        ...prev,
                                        ResultTwo: e.target.value
                                    }));
                                }} />


                            </div>




                        </div>





                        <div className="  mb-2 relative bg-orange-800/20 bg-red-900 border rounded shadow-md backdrop-blur-md py-1 px-3">
                            <h1 className="text-2xl mt-3 text-shadow-sm text-white mb-2">Night</h1>


                            <div className="mb-2 relative w-full">


                                <input
                                    id="date"
                                    type="date"
                                    value={`${night.year}-${String(night.month).padStart(2, '0')}-${String(night.day).padStart(2, '0')}`}
                                    className="border rounded w-full px-5 h-[32px] relative z-20 bg-transparent"
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split("-");
                                        setNight((prev) => ({
                                            ...prev,
                                            year,
                                            month,
                                            day,
                                        }));
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={night.ResultOne} placeholder="2.01pm Upload time" className="border  bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setNight((prev) => ({
                                        ...prev,
                                        ResultOne: e.target.value
                                    }));
                                }} />

                                <input type="text" value={night.ResultTwo} placeholder="2.46pm Upload time" className="border bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setNight((prev) => ({
                                        ...prev,
                                        ResultTwo: e.target.value
                                    }));
                                }} />


                            </div>




                        </div>














                        <div className="  mb-2 relative bg-orange-800/20 bg-red-900 border rounded shadow-md backdrop-blur-md py-1 px-3">
                            <h1 className="text-2xl mt-3 text-shadow-sm text-white mb-2">Bhutan</h1>


                            <div className="mb-2 relative w-full">


                                <input
                                    id="date"
                                    type="date"
                                    value={`${bhutan.year}-${String(bhutan.month).padStart(2, '0')}-${String(bhutan.day).padStart(2, '0')}`}
                                    className="border rounded w-full px-5 h-[32px] relative z-20 bg-transparent"
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split("-");
                                        setBhutanTeer((prev) => ({
                                            ...prev,
                                            year,
                                            month,
                                            day,
                                        }));
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={bhutan.ResultOne} placeholder="2.01pm Upload time" className="border  bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setBhutan((prev) => ({
                                        ...prev,
                                        ResultOne: e.target.value
                                    }));
                                }} />

                                <input type="text" value={bhutan.ResultTwo} placeholder="2.46pm Upload time" className="border bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setBhutan((prev) => ({
                                        ...prev,
                                        ResultTwo: e.target.value
                                    }));
                                }} />


                            </div>




                        </div>









                        <div className="  mb-2 relative bg-orange-800/20 bg-red-900 border rounded shadow-md backdrop-blur-md py-1 px-3">
                            <h1 className="text-2xl mt-3 text-shadow-sm text-white mb-2">Bhutan Teer</h1>


                            <div className="mb-2 relative w-full">


                                <input
                                    id="date"
                                    type="date"
                                    value={`${bhutanTeer.year}-${String(bhutanTeer.month).padStart(2, '0')}-${String(bhutanTeer.day).padStart(2, '0')}`}
                                    className="border rounded w-full px-5 h-[32px] relative z-20 bg-transparent"
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split("-");
                                        setBhutanTeer((prev) => ({
                                            ...prev,
                                            year,
                                            month,
                                            day,
                                        }));
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={bhutanTeer.ResultOne} placeholder="2.01pm Upload time" className="border  bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setBhutanTeer((prev) => ({
                                        ...prev,
                                        ResultOne: e.target.value
                                    }));
                                }} />

                                <input type="text" value={bhutanTeer.ResultTwo} placeholder="2.46pm Upload time" className="border bg-red-900 rounded px-3 py-1" onChange={(e) => {
                                    setBhutanTeer((prev) => ({
                                        ...prev,
                                        ResultTwo: e.target.value
                                    }));
                                }} />


                            </div>




                        </div>





                    </div>
                    <div className="flex flex-wrap gap-2">



                    </div>
                    <div className="flex justify-center ">


                        <button
                            type="submit"
                            className="bg-gradient-to-tl shadow shadow-gray-500 from-red-100 bg-red-300 border border-red-400 py-2 px-4 rounded w-[220px] hover:bg-red-900 hover:text-white font-semibold mt-4 active:scale-110"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>







        </div>
    );
};

export default Result;

// const [formData, setFormData] = useState(initialState);
// const [directUploadData, setDirectUploadData] = useState(createInitialStateDirectUpload(state));
// const [excelData, setExcelData] = useState(null);
// const [excelFileName, setExcelFileName] = useState("");



// const handleDirectUploadChange = (index, field, value) => {
//     setDirectUploadData(prevData =>
//         prevData.map((item, i) =>
//             i === index ? { ...item, [field]: value } : item
//         )
//     );
// };

// const handleFile = (e) => {
//     const file = e.target.files[0];
//     setExcelFileName(file.name);

//     const fileTypes = [
//         'application/vnd.ms-excel',
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         'text/csv'
//     ];

//     if (file && fileTypes.includes(file.type)) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const data = new Uint8Array(event.target.result);
//             const workbook = XLSX.read(data, { type: 'array' });
//             const worksheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[worksheetName];
//             const jsonData = XLSX.utils.sheet_to_json(worksheet);
//             setExcelData(jsonData);
//         };
//         reader.readAsArrayBuffer(file);
//     } else {
//         alert('Please select only Excel file types');
//     }
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const resultList = directUploadData.map((item) => ({
//         result: {
//             id: item.id,
//             result_1: item.result_1,
//             result_2: item.result_2,
//         },
//     }));

//     // Use map instead of forEach to add the year, month, and day
//     const finalData = directUploadData.map((item) => ({
//         id: item.id,
//         year: formData.year,
//         month: Number(formData.month), // Ensure month is a Number
//         resultList: {
//             day: Number(formData.day),  // Ensure day is a Number
//             result_1: item.result_1,
//             result_2: item.result_2,
//         },
//     }));



//     try {
//         const res = await axios.post(
//             `${process.env.REACT_APP_API_URL}api/result/single`,
//             finalData
//         );
//         if (res.status === 200) {
//             alert("Record updated successfully");
//             setFormData(initialState); // Reset form data
//             setDirectUploadData(createInitialStateDirectUpload(state)); // Reset direct input data
//             setPost("");
//         }
//     } catch (error) {
//         console.error(error);
//         alert("Something went wrong");
//     }
// };

{/* <div className="flex border-b pb-7 justify-between   my-5">
   

    <div className="flex gap-2">

        <button style={{
            background: `#fff`,
            color: '#000',
            border: `1px solid #000`,
        }}
            className="px-7 rounded"
            onClick={() => setStates(state)}
        >
            All
        </button>
        {state && state.map((s, i) => {
            return <button style={{
                background: `linear-gradient(${s.color.rotate}deg, ${s.color.backgroundColor1}, ${s.color.backgroundColor2})`,
                color: s.color.textColor,
                border: `1px solid ${s.color.borderColor}`,
            }}
                className="px-7 rounded"
                onClick={() => {
                    const sta = state.find(st => st.id === s.id); // Find the matching object
                    if (sta) {
                        setStates([sta]); // Wrap the object in an array like [{}]
                    }
                }}
            >
                {s.name}
            </button>
        })}
    </div>
    <button
        className="border rounded px-7 py-2 text-black  border-red-600 hover:bg-red-900 font-semibold hover:text-white"
        onClick={() => setPost("directUpload")}
    >
        Upload and Update Result
    </button>
</div> */}

{/* <div className=" gap-5 mt-16">
    {states &&
        states.map((s) => {
            const matchingMonth = result_Month.find((r) => r.id === s.id); // Find matching month by ID
            console.log("matchingMonth", matchingMonth);

            if (!matchingMonth) return null; // Skip if no matching month is found

            return (
                <div key={s.id} className="w-full  grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">


                    {matchingMonth.resultList
                        .sort((a, b) => Number(a.day) - Number(b.day)) // Sort days numerically
                        .map((rs, k) => {
                            console.log("rs", rs);

                            const data = {
                                name: s.name,
                                id: s.id,
                                color: {
                                    rotate: s.color.rotate,
                                    backgroundColor1: s.color.backgroundColor1,
                                    backgroundColor2: s.color.backgroundColor2,
                                    textColor: s.color.textColor,
                                    borderColor: s.color.borderColor,
                                },
                                time: {
                                    firstResult: s.time.firstResult,
                                    secondResult: s.time.secondResult,
                                },
                            };
                            const resultData = {
                                day: rs.day,
                                result_1: rs.result_1,
                                result_2: rs.result_2,
                                month: matchingMonth.month,
                                year: matchingMonth.year
                            };


                            return (
                                <StateCard
                                    key={k}
                                    formData={data}
                                    resultData={resultData}
                                />
                            );
                        })}
                </div>
            );
        })}
</div> */}