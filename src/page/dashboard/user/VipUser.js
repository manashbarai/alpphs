import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useGlobalSkills } from '../../../context/skillContext';

const VipUser = () => {
  const { isLoading, createdUser, updatedArray } = useGlobalSkills()
 

  return (
    <>
      

      <div className="px-4 lg:px-28 mt-11  ">
       

        <table className="min-w-full rounded table-auto  border-red-600 border border-red-600-gray-300">
          <thead>
            <tr className="bg-red-50 text-zinc-700">
              <th className="border border-red-600 px-4 py-2">Name</th>
              <th className="border border-red-600 px-4 py-2">Joined Date</th>
              <th className="border border-red-600 px-4 py-2"> Subscription </th>
              <th className="border border-red-600 px-4 py-2">Number</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <>Loading...</> : createdUser && createdUser.users.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="border border-red-600  px-4 py-2">Ratan Barik</td>
                
                <td className="border border-red-600 px-4 py-2 rounded-full">
                
                  21th October 2024
                   
                </td>
                <td className="border border-red-600 px-4 py-2">
                One Month
                </td>
               
               
                <td className="border border-red-600 px-4 py-2">
                +91 9865758475
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default VipUser;