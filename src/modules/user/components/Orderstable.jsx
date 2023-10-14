import {
    Card,
    Typography, 
    Button,
    Chip
  } from "@material-tailwind/react";

import React, { useState, useEffect } from 'react';

// import { CustomerService } from './CustomerService';
import api from "../../../axiosInterceptor";
function Orderstable({orderDetail}) {
    const TABLE_HEAD = ["No.","Product Name","Order_id","From address","To address","Status","Action","Detail"];
    const ITEMS_PER_PAGE = 5;
    const [orderData, setorderData] = useState([]);
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
          const response = await api.get(`product/order/`);
          const responseData = response.data;
    
          if (Array.isArray(responseData)) {
            setorderData(responseData);
          } else {
            console.error('Response data is not an array:', responseData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    const handleReturnOrder= (id)=>{
        api.patch(`product/order/${id}/`,{'status':'return'}).then((response)=>{
            console.log(response.data)
            
          })
          fetchUsers();
          
    }
    // const handleUnblockUser= (id)=>{
    //     api.patch(`/auths/user/${id}/`,{'is_active':true}).then((response)=>{
    //         console.log(response.data)
            
    //     })
    //     fetchUsers();
        
    // }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

// Slice the userData array to display only the items for the current page
const currentOrder = orderData.slice(startIndex, endIndex);
console.log(orderData,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  return (
    <>
    <Card className="h-full w-full overflow-scroll">
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
        {currentOrder.map((order, index) => {
          return (
            <tr 
            
            key={order?.id}
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
                  {order?.booking?.product_name}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {order?.order_id}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {order?.booking.from_address}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {order?.booking.to_address}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {/* <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {order?.status}
                </Typography> */}
                <Chip
                          size="md"
                          variant="ghost"
                          value={order?.status==="transferring" ? "in_progress" : order?.status}
                          color={
                            order?.status === "pending"
                              ? "orange"
                              : order?.status === "in_progress"
                              ? "blue"
                              : order?.status === "completed"
                              ? "green"
                              :order?.status === "return"
                              ?"red"
                              :"blue"
                          }
                          />
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {order?.status ==="return" ? (
                  <Chip
                    className="bg-red-300 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                    value={"Returnd"}
                    />
                    
                    //   </Chip>
                    ) : (
                  <Chip
                  size="sm"
                  onClick={() => handleReturnOrder(order?.id)}
                    className="bg-red-500 hover:bg-orange-500 text-white font-medium py-1 px-2 rounded"
                    value={"Ruturn"}
                  />
                    
                //   </Chip>
                )}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                {/* <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  
                </Typography> */}
                <Chip onClick={()=>orderDetail(order?.id)} value={"view Details"}/>
                  
                
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
            disabled={endIndex >= orderData.length}
            color="indigo"
            size="sm"
          >
            Next
          </Button>
        </div>
</>
  )
}

export default Orderstable

