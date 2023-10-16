import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip, 
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";



  const TABLE_HEAD = ["Head", "HubName",  "is Hotspot","Number", ""];
 


import {
  //  MagnifyingGlassIcon, 
   ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import api from '../../../axiosInterceptor';
function Hub() {
    const[TABLE_ROWS,setTABLE_ROWS]=useState([])
    useEffect(() => {
      // Example API request using the api instance
      api.get('admins/hub/')
        .then((response) => {
          
        setTABLE_ROWS(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  console.log(TABLE_ROWS)
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Hubs
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        
      <CardBody className="overflow-scroll px-0">
        <Link to={"/admin/addhub"}>
            <Button className=" flex  " color="blue" size="sm">
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Hub
            </Button>
        </Link>
            <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_ROWS.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((item, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={item.id}>
                  <td className={classes}>
                      <Link 
                      //  to={`/admin/hubadmin/${item.id}`}
                      >
                    <div className="flex items-center gap-3">
                      <Avatar src={item?.hub_head?.user?.profile_picture} alt='name' size="sm" />
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {item?.hub_head?.user?.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                          >
                          {item?.hub_head?.user?.email}
                        </Typography>
                      </div>
                    </div>
                          </Link>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                            {item?.hub_name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {item?.address}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={item?.is_active ? "active" : "inactive"}
                        color={item?.is_active  ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item?.number}
                    </Typography>
                  </td>
                  <Link to={`/admin/hubdetail/${item.id}`}>
                  <td className={classes}>
                    <Tooltip content="Hub Detail">
                      <IconButton variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  </Link>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="sm:flex items-center justify-between border-t border-blue-gray-50 p-4">  
      <div className='sm:block flex justify-center sm:mb-0 mb-4'>
        <Typography variant="small"  color="blue-gray" className=" font-normal">
          Page 1 of 10
        </Typography>
      </div>
        <div className="flex gap-2 justify-center ">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
        </CardBody>
        
      </Card>
    </div>
  )
}

export default Hub



