import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VipNumber = () => {
  return (
    <div>
      <Navbar/>
      <div className='my-11 flex justify-center items-center w-full h-[100vh]'>
        <button className='bg-red-900 text-white py-3 px-10 text-xl text-shadow-sm rounded shadow'>
            Dwonlod from play Store

        </button>


      </div>
      <Footer/>
    </div>
  )
}

export default VipNumber
