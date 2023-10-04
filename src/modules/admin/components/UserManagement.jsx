import {
    Card,
    Typography, 
    Button
  } from "@material-tailwind/react";

import React, { useState, useEffect } from 'react';

// import { CustomerService } from './CustomerService';
import api from "../../../axiosInterceptor";
function UserManagement() {
    const TABLE_HEAD = ["No.", "Name", "Email", "Contact", "Action"];
    const ITEMS_PER_PAGE = 5;
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        // (async()=>{
            
          
        //     api.get(`/auths/user/get_users/`).then((response)=>{
        //         console.log(response.data)
        //         setUserData(response.data)
        //     })
            
        // })()
        fetchUsers();

    }, []);
    async function fetchUsers() {
        try {
          const response = await api.get(`/auths/user/get_users/`);
          const responseData = response.data;
      
          if (Array.isArray(responseData)) {
            setUserData(responseData);
          } else {
            console.error('Response data is not an array:', responseData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    const handleBlockUser= (id)=>{
        api.patch(`/auths/user/${id}/`,{'is_active':false}).then((response)=>{
            console.log(response.data)
            // setUserData(response.data)
            fetchUsers();
            
        })
        
    }
    const handleUnblockUser= (id)=>{
        api.patch(`/auths/user/${id}/`,{'is_active':true}).then((response)=>{
            console.log(response.data)
            // setUserData(response.data)
            
        })
        fetchUsers();
        
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

// Slice the userData array to display only the items for the current page
const currentUsers = userData.slice(startIndex, endIndex);
console.log(userData,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  return (
    <>
    <Card className="h-fit w-full overflow-scroll">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user, index) => {
          return (
            <tr 
            key={user.id}
            >
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {startIndex + index + 1}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {user.name}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {user.email}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {user.phone}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {user.is_active ? (
                  <button
                    onClick={() => handleBlockUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnblockUser(user.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-2 rounded"
                  >
                    Unblock
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
   
  </Card>
  <div className="flex justify-end mt-4">
      <div className="mr-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            color="indigo"
            size="sm"
          >
            Previous
          </Button>
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= userData.length}
            color="indigo"
            size="sm"
          >
            Next
          </Button>
        </div>
</>
  )
}

export default UserManagement

