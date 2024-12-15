import React from 'react'
import { useGlobalSkills } from '../context/skillContext'
import Loader3dot from '../components/loading/Loader3dot'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ClubChart = () => {

    const { isLoading, clubChartForSillong } = useGlobalSkills()
    console.log(clubChartForSillong);
    
    return (
        <div>
            <Navbar/>
            {isLoading ? <Loader3dot /> : <div>
                <h1 className='text-center text-3xl my-2'> {clubChartForSillong && clubChartForSillong[0].chartName && clubChartForSillong[0].chartName}  </h1>
                <h1 className='text-center text-2xl my-2'> {clubChartForSillong && clubChartForSillong[0].title && clubChartForSillong[0].title}  </h1>
                <hr className='w-2/4 bg-black m-auto lg:mt-16'/>


                {clubChartForSillong && clubChartForSillong[0].imageUrl && <div className='w-2/3 m-auto  h-auto rounded'>
                    <img src={clubChartForSillong[0].imageUrl} alt={clubChartForSillong[0].title} className='w-full h-full object-contain rounded shadow' />

                </div>
                }


            </div>}
                <Footer/>
        </div>
    )
}

export default ClubChart
