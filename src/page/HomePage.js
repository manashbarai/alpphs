import React, { useEffect, useState } from 'react'
import { useGlobalSkills } from '../context/skillContext'
import StateCard from './dashboard/state/StateCard'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Clock from '../components/Clock'
import DateDisplay from '../components/DateModule'
import Loader3dot from '../components/loading/Loader3dot'
import formatResult from '../util/NumberFormat'
import axios from 'axios'

const HomePage = () => {
    // mmmmmmmmmm
    const {
      isLoading,
        shillongs,
        khanaparas,
        juwais,
        nights,
        bhutans,
        bhutanTeers,
        updatedObject
    } = useGlobalSkills()

    const [sillongLoading, setSillongLoading] = useState(false);
  const [khanparaLoading, setKhanparaLoading] = useState(false);
  const [jweaiLoading, setJweaiLoading] = useState(false);

  const getLoteryResult = async (url, state) => {
    try {
      if (state === "SILONGS") {
        setSillongLoading(true);
      } else if (state === "KHANPARAS") {
        setKhanparaLoading(true);
      } else if (state === "JUWAIS") {
        setJweaiLoading(true);
      }

      const result = await axios.get(url);
      if (result.status === 200) {
        updatedObject(result.data, state);
      }
    } catch (error) {
      console.error("Error fetching lottery result:", error);
    } finally {
      // Reset loading states after the request finishes, regardless of success or error
      if (state === "SILONGS") {
        setSillongLoading(false);
      } else if (state === "KHANPARAS") {
        setKhanparaLoading(false);
      } else if (state === "JUWAIS") {
        setJweaiLoading(false);
      }
    }
  };

  useEffect(() => {
    getLoteryResult(`${process.env.REACT_APP_API_URL}api/sillong`, "SILONGS");
    getLoteryResult(`${process.env.REACT_APP_API_URL}api/khanpara`, "KHANPARAS");
    getLoteryResult(`${process.env.REACT_APP_API_URL}api/jweai`, "JUWAIS");
  }, []);


   
    return (
        <>
            <Navbar />
            <div className='mt-5'>
                <h1 className='text-5xl text-shadow-sm my-5  font-semibold text-center'>OFFICIAL SHILLONG TEER SPORT'S SCORE</h1>
                <hr className='w-28 m-auto border-black mb-5' />
                <h1 className='text-3xl text-center font-semibold' >Today Result</h1>

                <div className='flex justify-center  flex-wrap items-center gap-5'>
                    <DateDisplay /> <div className='none lg:block'> || </div>    <Clock />

                </div>
            </div>
            <div className='px-2 lg:px-28 grid grid-cols-1 gap-5 lg:gap-20 my-10 '>

                {/* {result_day && state && result_day.map((r, i) => {
                    const singleState = state.find(s => s.id === r.id)
                    const data = {
                        name: singleState.name,
                        id: singleState.id,
                        color: {
                            rotate: singleState.color.rotate,
                            backgroundColor1: singleState.color.backgroundColor1,
                            backgroundColor2: singleState.color.backgroundColor2,
                            textColor: singleState.color.textColor,
                            borderColor: singleState.color.borderColor,
                        },
                        time: {
                            firstResult: singleState.time.firstResult,
                            secondResult: singleState.time.secondResult,
                        },
                        description: singleState.description

                    }
                    const resultData = {
                        day: r.day || new Date().getDate(),
                        result_1: r.result_1 || " Wait For Result ... ",
                        result_2: r.result_2 || " Wait For Result ... ",
                        month: r.month || new Date().getMonth() + 1,
                        year: r.year || new Date().getFullYear()
                    };
                    return <div className='w-full lg:w-3/4 mx-auto'>
                        <StateCard formData={data} key={resultData.day} resultData={resultData} />

                    </div>
                })} */}

                <div className="px-1 lg:px-28">
                    <h2 className="text-3xl capitalize text-center font-semibold mb-3  ">Shillong Teer Results </h2>
                    <div

                        className="  m-0 rounded   bg-[#6b3b3a] p-1  flex flex-col"
                    >
                        <h2 className='text-2xl font-semibold text-center pt-2 pb-3 text-white' > {new Date().toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })} </h2>
                        <div className=''>


                            <table

                                className="w-full border border-gray-300 bg-white rounded-md "
                            >
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 text-xl p-4 font-semibold text-center">
                                            F/R (3:40PM)
                                        </td>
                                        <td className="border border-gray-300 p-4 text-xl font-semibold text-center">
                                            S/R (4:40PM)
                                        </td>

                                    </tr>
                                    <tr>
                                    {sillongLoading ? (
    <td className="border border-gray-300 p-4 font-semibold text-center" colSpan="2">
        <Loader3dot />
    </td>
) : (
    <>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {shillongs.ResultOne !== null && shillongs.ResultOne !== undefined && shillongs.ResultOne !== ""
                ? formatResult(shillongs.ResultOne)
                : "Wait For Result"}
        </td>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {shillongs.ResultTwo !== null && shillongs.ResultTwo !== undefined && shillongs.ResultTwo !== ""
                ? formatResult(shillongs.ResultTwo)
                : "Wait For Result"}
        </td>
    </>
)}

                                    </tr>
                                </tbody>
                            </table>





                        </div>
                    </div>

                    <p className='text-center mt-3 px-1 lg:px-4'>
                        Every day at 4:00 PM and 5:45 PM, respectively, the results of the first and second rounds of the Shillong Teer are announced. A two-digit number is displayed as an outcome. Shillong Teer is officially hosted by Khasi Hills Archery Sports Club in Shillong, Meghalaya. It's a legal and traditional game of archery that is now popular across India and even the United States. The game is held every week from Monday to Saturday at the Polo Ground of Shillong Centre. Tickets are available every day from 6 AM, except on local holidays, January 1, January 26, August 15, and Christian holidays. Results are declared and written on the result board every day. <br /> <br />

                        Stay updated with the latest Shillong Teer result today by checking our page regularly. We provide the Shillong Teer result list for those who want to track past outcomes. Bookmark this page and never miss an update on the Shillong Teer result.
                    </p>

                </div>



                <div className="px-1 lg:px-28">
                    <h2 className="text-3xl capitalize text-center font-semibold mb-3  ">Khanapara Teer Results </h2>
                    <div

                        className="  m-0 rounded   bg-[#6b3b3a] p-1  flex flex-col"
                    >
                        <h2 className='text-2xl font-semibold text-center pt-2 pb-3 text-white' > {new Date().toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}  </h2>
                        <div className=''>


                            <table

                                className="w-full border border-gray-300 bg-white rounded-md "
                            >
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 text-xl p-4 font-semibold text-center">
                                            F/R (4:10PM)
                                        </td>
                                        <td className="border border-gray-300 text-xl p-4 font-semibold text-center">
                                            S/R (4:40PM)
                                        </td>

                                    </tr>
                                    <tr>
                                    {khanparaLoading ? (
    <td className="border border-gray-300 p-4 font-semibold text-center" colSpan="2">
        <Loader3dot />
    </td>
) : (
    <>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {khanaparas.ResultOne !== null && khanaparas.ResultOne !== undefined && khanaparas.ResultOne !== ""
                ? formatResult(khanaparas.ResultOne)
                : "Wait For Result"}
        </td>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {khanaparas.ResultTwo !== null && khanaparas.ResultTwo !== undefined && khanaparas.ResultTwo !== ""
                ? formatResult(khanaparas.ResultTwo)
                : "Wait For Result"}
        </td>
    </>
)}


                                    </tr>
                                </tbody>
                            </table>





                        </div>
                    </div>

                    <p className='text-center mt-3 px-1 lg:px-4'>
                        Every day at 4:30 PM and 5:00 PM, respectively, the results of the first and second rounds of the Khanapara Teer are announced. A two-digit number is displayed as an outcome. The Khanapara Teer game is a legal game based on archery held at the Meghalaya border, East Khanapara of Ri Bhoi district. This Teer game is organized by the ThemMarwet club, where a group of 12 archery clubs from a specific locality participates. The game takes place at Themmarwet near East Khanapara, Ri Bhoi district, Meghalaya. The arrows used in hitting the target cannot be fewer than 30 and more than 50. In each round, 50 archers fire between 300 and 1000 arrows. For example, if 650 arrows hit the target in a round, the score would be 50, the last two digits. <br /> <br />

                        Stay updated with the latest Khanapara Teer result today by visiting our page. We also provide the Khanapara Teer result list for those who want to track past outcomes. You can find the Khanapara Teer previous result to analyze patterns and make informed predictions. Bookmark this page and never miss an update on the Khanapara Teer result.
                    </p>

                </div>











                <div className="px-1 lg:px-28">
                    <h2 className="text-3xl capitalize text-center font-semibold mb-3  ">Juwai Teer Result </h2>
                    <div

                        className="  m-0 rounded   bg-[#6b3b3a] p-1  flex flex-col"
                    >
                        <h2 className='text-2xl font-semibold text-center pt-2 pb-3 text-white' > {new Date().toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}  </h2>
                        <div className=''>


                            <table

                                className="w-full border border-gray-300 bg-white rounded-md "
                            >
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 text-xl p-4 font-semibold text-center">
                                            F/R (2:40PM)
                                        </td>
                                        <td className="border border-gray-300 text-xl p-4 font-semibold text-center">
                                            S/R (2:15PM)
                                        </td>

                                    </tr>
                                    {jweaiLoading ? (
                                        <td className="border border-gray-300 p-4 font-semibold text-center" colSpan="2">
                                            <Loader3dot />
                                        </td>
                                    ) : (
                                        <>
                                            <td className="border border-gray-300 p-4 font-semibold text-center">
                                                {juwais.ResultOne !== null && juwais.ResultOne !== undefined && juwais.ResultOne !== ""
                                                    ? formatResult(juwais.ResultOne)
                                                    : "Wait For Result"}
                                            </td>
                                            <td className="border border-gray-300 p-4 font-semibold text-center">
                                                {juwais.ResultTwo !== undefined
                                                    ? (juwais.ResultTwo !== null && juwais.ResultTwo !== ""
                                                        ? formatResult(juwais.ResultTwo)
                                                        : "Wait For Result")
                                                    : "Result Not Available"}
                                            </td>
                                        </>
                                    )}


                                </tbody>
                            </table>





                        </div>
                    </div>

                    <p className='text-center mt-3 px-1 lg:px-4'>
                        Every day at 2:30 PM and 3:00 PM, respectively, the results of the first and second rounds of the Juwai Teer are announced. A two-digit number is displayed as an outcome. Juwai Teer is an archery game run by a club named Juwai. People who buy tickets for the Juwai Teer game can check the Juwai Teer result for the first and second rounds on our result page. Winners are decided based on the number of arrows shot in a particular round. <br /> <br />

                        Stay updated with the latest Juwai Teer result today by visiting our page regularly. We also provide the Juwai morning Teer result for those interested in the morning outcomes. To analyze past performances, check the Juwai Teer previous result. Our Juwai Teer result list offers a detailed record of past results, helping you track historical outcomes and patterns effectively.
                    </p>

                </div>







                <div className="px-1 lg:px-28">
                    <h2 className="text-3xl capitalize text-center font-semibold mb-3  ">Night Teer Results </h2>
                    <div

                        className="  m-0 rounded   bg-[#6b3b3a] p-1  flex flex-col"
                    >
                        <h2 className='text-2xl font-semibold text-center pt-2 pb-3 text-white' > {new Date().toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}  </h2>
                        <div className=''>


                            <table

                                className="w-full border border-gray-300 bg-white rounded-md "
                            >
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-4 font-semibold text-xl text-center">
                                            F/R (8:15PM)
                                        </td>
                                        <td className="border border-gray-300 p-4 font-semibold text-xl text-center">
                                            S/R (8:15PM)

                                        </td>

                                    </tr>
                                    <tr>
                                        {isLoading ? (
                                            <td className="border border-gray-300 p-4 font-semibold text-center" colSpan="2">
                                                <Loader3dot />
                                            </td>
                                        ) : (
                                            <>
                                                <td className="border border-gray-300 p-4 font-semibold text-center">
                                                    {nights.ResultOne !== null && nights.ResultOne !== undefined && nights.ResultOne !== ""
                                                        ? nights.ResultOne
                                                        : "Wait For Result"}
                                                </td>
                                                <td className="border border-gray-300 p-4 font-semibold text-center">
                                                    {nights.ResultTwo !== null && nights.ResultTwo !== undefined && nights.ResultTwo !== ""
                                                        ? nights.ResultTwo
                                                        : "Wait For Result"}
                                                </td>
                                            </>
                                        )}


                                    </tr>
                                </tbody>
                            </table>





                        </div>
                    </div>

                    <p className='text-center mt-3 px-1 lg:px-4'>
                        Every day at 8:15 PM and 9:00 PM, respectively, the results of the first and second rounds of the Shillong Night Teer are announced. A two-digit number is displayed as an outcome. Some websites used to publish Shillong Night 1, Shillong Night 2, and Shillong Night 3, which are played after the evening, but there is only one Night Teer, and it's not related to Khasi Hills Archery Sports Club. The Shillong Night Teer result is yet to be considered by the Khasi Hills Archery Sports Club. <br /> <br />

                        Stay updated with the latest Shillong night Teer result by visiting our page regularly. We provide the Shillong Teer night result for both rounds each evening. To analyze past performances, check the Shillong night Teer previous result. Our site is your reliable source for all night Teer result updates.
                    </p>

                </div>








                <div className="px-1 lg:px-28">
                    <h2 className="text-3xl capitalize text-center font-semibold mb-3  ">Bhutan Morning Results </h2>
                    <div

                        className="  m-0 rounded   bg-[#6b3b3a] p-1  flex flex-col"
                    >
                        <h2 className='text-2xl font-semibold text-center pt-2 pb-3 text-white' > {new Date().toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}  </h2>
                        <div className=''>


                            <table

                                className="w-full border border-gray-300 bg-white rounded-md "
                            >
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-4 font-semibold text-xl text-center">
                                            F/R (2:41PM)
                                        </td>
                                        <td className="border border-gray-300 p-4 font-semibold text-xl text-center">
                                            S/R (2:43PM)
                                        </td>

                                    </tr>
                                    <tr>
                                    {isLoading ? (
    <td className="border border-gray-300 p-4 font-semibold text-center" colSpan="2">
        <Loader3dot />
    </td>
) : (
    <>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {bhutans.ResultOne !== null && bhutans.ResultOne !== undefined && bhutans.ResultOne !== ""
                ? bhutans.ResultOne
                : "Wait For Result"}
        </td>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {bhutans.ResultTwo !== null && bhutans.ResultTwo !== undefined && bhutans.ResultTwo !== ""
                ? bhutans.ResultTwo
                : "Wait For Result"}
        </td>
    </>
)}

                                    </tr>
                                </tbody>
                            </table>





                        </div>
                    </div>

                    <p className='text-center mt-3 px-1 lg:px-4'>
                        Every day at 10:30 AM and 11:30 AM, respectively, the results of the first and second rounds of the Teer Bhutan are announced, displaying a two-digit number as the outcome. <br /> <br />

                        Stay updated with the latest Bhutan morning Teer result by visiting our page daily. We provide the Bhutan morning Teer result for both rounds each morning. To analyze past performances, check the Bhutan Teer result list. Our site is your reliable source for all Bhutan Teer results and updates, including the Bhutan Teer previous result.
                    </p>

                </div>






                <div className="px-1 lg:px-28">
                    <h2 className="text-3xl capitalize text-center font-semibold mb-3  ">Bhutan Teer Results </h2>
                    <div

                        className="  m-0 rounded   bg-[#6b3b3a] p-1  flex flex-col"
                    >
                        <h2 className='text-2xl font-semibold text-center pt-2 pb-3 text-white' > 10th Octobar 2024 </h2>
                        <div className=''>


                            <table

                                className="w-full border border-gray-300 bg-white rounded-md "
                            >
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-4 font-semibold text-xl text-center">
                                            F/R (2:42PM)
                                        </td>
                                        <td className="border border-gray-300 p-4 font-semibold text-xl text-center">
                                            S/R (2:44PM)
                                        </td>

                                    </tr>
                                    <tr>
                                    {isLoading ? (
    <td className="border border-gray-300 p-4 font-semibold text-center" colSpan="2">
        <Loader3dot />
    </td>
) : (
    <>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {bhutanTeers.ResultOne !== null && bhutanTeers.ResultOne !== undefined && bhutanTeers.ResultOne !== ""
                ? bhutanTeers.ResultOne
                : "Wait For Result"}
        </td>
        <td className="border border-gray-300 p-4 font-semibold text-center">
            {bhutanTeers.ResultTwo !== null && bhutanTeers.ResultTwo !== undefined && bhutanTeers.ResultTwo !== ""
                ? bhutanTeers.ResultTwo
                : "Wait For Result"}
        </td>
    </>
)}

                                    </tr>
                                </tbody>
                            </table>





                        </div>
                    </div>

                    <p className='text-center mt-3 px-1 lg:px-4'>
                        Every day at 2:30 PM and 3:00 PM, respectively, the results of the first and second rounds of the Juwai Teer are announced. A two-digit number is displayed as an outcome. Juwai Teer is an archery game run by a club named Juwai. People who buy tickets for the Juwai Teer game can check the Juwai Teer result for the first and second rounds on our result page. Winners are decided based on the number of arrows shot in a particular round. <br /> <br />

                        Stay updated with the latest Juwai Teer result today by visiting our page regularly. We also provide the Juwai morning Teer result for those interested in the morning outcomes. To analyze past performances, check the Juwai Teer previous result. Our Juwai Teer result list offers a detailed record of past results, helping you track historical outcomes and patterns effectively.
                    </p>

                </div>



            </div>
            <Footer />
        </>
    )
}

export default HomePage
