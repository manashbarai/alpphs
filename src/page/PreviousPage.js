import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useGlobalSkills } from '../context/skillContext';
import Loader3dot from '../components/loading/Loader3dot';
import Footer from '../components/Footer';

const PreviousPage = () => {
  const { isLoading, shillong, khanapara, juwai, night, bhutan, bhutanTeer } = useGlobalSkills();

  // Initial state for selected result and button text
  const [selectResultState, setSelectResultState] = useState(null);
  const [buttonText, setButtonText] = useState('shillong');

  
  
  
  const handleButtonClick = (stateData, text) => {
    setSelectResultState(stateData);
    setButtonText(text);
  };

  return (
    <>
      <Navbar />

      <div className="px-2 lg:px-52 mb-11">
        <div className="flex justify-between mt-11 gap-5 overflow-auto  lg:overflow-visible ">
          <button
            onClick={() => handleButtonClick(shillong, 'shillong')}
            className={`capitalize shadow border border-[#5b2a29] px-2 py-2 flex-1 text-black rounded 
              ${buttonText === 'shillong' ? 'bg-[#5b2a29] text-white' : 'bg-red-200'} 
              text-lg font-semibold hover:scale-110  transition-transform duration-200`}
          >
            shillong
          </button>
          <button
            onClick={() => handleButtonClick(khanapara, 'khanapara')}
            className={`capitalize shadow border border-[#5b2a29] px-2 py-2 flex-1 text-black rounded 
              ${buttonText === 'khanapara' ? 'bg-[#5b2a29] text-white' : 'bg-red-200'} 
              text-lg font-semibold hover:scale-110  transition-transform duration-200`}
          >
            khanapara
          </button>
          <button
            onClick={() => handleButtonClick(juwai, 'juwai')}
            className={`capitalize shadow border border-[#5b2a29] px-2 py-2 flex-1 text-black rounded 
              ${buttonText === 'juwai' ? 'bg-[#5b2a29] text-white' : 'bg-red-200'} 
              text-lg font-semibold hover:scale-110  transition-transform duration-200`}
          >
            juwai
          </button>
          <button
            onClick={() => handleButtonClick(night, 'night')}
            className={`capitalize shadow border border-[#5b2a29] px-2 py-2 flex-1 text-black rounded 
              ${buttonText === 'night' ? 'bg-[#5b2a29] text-white' : 'bg-red-200'} 
              text-lg font-semibold hover:scale-110  transition-transform duration-200`}
          >
            night
          </button>
          <button
            onClick={() => handleButtonClick(bhutan, 'bhutan')}
            className={`capitalize shadow border border-[#5b2a29] px-2 py-2 flex-1 text-black rounded 
              ${buttonText === 'bhutan' ? 'bg-[#5b2a29] text-white' : 'bg-red-200'} 
              text-lg font-semibold hover:scale-110  transition-transform duration-200`}
          >
            bhutan
          </button>
          <button
            onClick={() => handleButtonClick(bhutanTeer, 'bhutanTeer')}
            className={`capitalize shadow border border-[#5b2a29] px-2 py-2 flex-1 text-black rounded 
              ${buttonText === 'bhutanTeer' ? 'bg-[#5b2a29] text-white' : 'bg-red-200'} 
              text-lg font-semibold hover:scale-110  transition-transform duration-200`}
          >
            bhutanTeer
          </button>
        </div>

        <div className="border border-[#5b2a29] mt-4 rounded h-[70vh] overflow-auto">
          <table className="min-w-full rounded table-auto border-collapse">
            <thead>
              <tr className="bg-[#5b2a29] text-white">
                <th className="border border-gray-300 px-6 py-4 text-center text-lg">Date</th>
                <th className="border border-gray-300 px-6 py-4 text-center text-lg">F/R</th>
                <th className="border border-gray-300 px-6 py-4 text-center text-lg">S/R</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="text-center py-5">
                    <Loader3dot />
                  </td>
                </tr>
              ) : (
                <>
                {selectResultState===null ? shillong?.data?.map((result, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-red-50' : 'bg-white'} hover:bg-blue-50`}
                  >
                    <td className="border border-gray-300 px-6 py-4 text-center text-lg font-bold">
                      {new Date(result.updated_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-lg font-bold">
                      {result.frvalue}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-lg font-bold">
                      {result.srvalue}
                    </td>
                  </tr>
                )):
                selectResultState?.data?.map((result, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-red-50' : 'bg-white'} hover:bg-blue-50`}
                  >
                   <td className="border border-gray-300 px-6 py-4 text-center text-lg font-bold">
  {new Date(result.updated_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-lg font-bold">
                      {result.frvalue}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-lg font-bold">
                      {result.srvalue}
                    </td>
                  </tr>
                ))
                
                
                }
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PreviousPage;
