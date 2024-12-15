



import React, { useState } from 'react'
import State from './dashboard/state/State'
import Result from './result/Result'
import ResultPage from './result/Result'
import { TbBuildingEstate } from "react-icons/tb";
import { VscOutput } from "react-icons/vsc";
import { FaUserCog } from "react-icons/fa";
import AdminBlogPost from './dashboard/adminBlog/AdminBlogPost'
import { FaUserTie } from "react-icons/fa";
import MyUser from './dashboard/user/MyUser';
import VipUser from './dashboard/user/VipUser';
import ClubChart from './dashboard/clubChart/ClubChart';

const Dashboard = () => {

  const [option, setOption] = useState("result")
  const menuItems = [
    {
      label: "Result", value: "result", icon: <VscOutput />
    },
    {
      label: "Blog", value: "blog", icon: <FaUserCog />
    },
   
   
    {
      label: "Club Chart", value: "clubChart", icon: <VscOutput />
    }
   
   
  ];

  return (
    <div>


      <div className='flex'>
        <div className='bg-gradient sticky top-20 h-[100vh]'>


          <div className="w-[300px] h-[100vh] dashBoard-bg flex flex-col justify-between ">
            {/* Top Menu */}
            <ul className="p-5 flex flex-col gap-0">
              <li className="font-semibold rounded text-white text-xl  mb-3">
                <i>Dashboard</i>
              </li>
              <hr className="border mb-3" />

              {menuItems.map((item) => (
                <li
                  key={item.value}
                  className={`flex items-center pl-2  mb-1 font-semibold rounded   transition-all duration-300 delay-110 
              ${option === item.value
                      ? "bg-gradient-to-tr from-red-200 bg-red-900 text-black   shadow-md"
                      : "hover:bg-sky-50 hover:border-sky-200 hover:text-black text-white"
                    }`}
                >
                  {item.icon}
                  <button
                    onClick={() => setOption(item.value)}
                    className="py-1 px-2 w-full text-left flex items-center gap-3"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Bottom Menu */}
            <ul className="p-5 flex flex-col gap-3">
              {["Settings", "Logout"].map((label) => (
                <li
                  key={label}
                  className="font-semibold rounded text-zinc-700 border border-transparent transition-all duration-300 delay-110 hover:bg-sky-50 hover:border-sky-100"
                >
                  <button className="py-1 px-7 w-full text-left">{label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex-1'  >

          {
            option === 'myUser' && <MyUser/>
          }
          {
            option === 'vipUser' && <VipUser/>
          }
          {
            option === 'clubChart' && <ClubChart />
          }
          {
            option === 'result' && <Result />
          }
           {
            option === 'blog' && <AdminBlogPost />
          }


        </div>

      </div>
    </div>
  )
}

export default Dashboard
