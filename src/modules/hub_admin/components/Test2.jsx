import React,{ useEffect,useState } from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Avatar,
    Typography,
    Badge,
  } from "@material-tailwind/react";
function Test2() {
  return (
    <div className='m-2 h-6 w-6 '>
    <Menu>
      <Badge content={0} >        
      <MenuHandler>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            color='black'
            >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
              />
          </svg>
        </div>
      </MenuHandler>
        </Badge>
      <MenuList className="flex flex-col gap-2">
      <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
      <Avatar
            variant="circular"
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-normal">
              <span className="font-medium text-blue-gray-900">Tania</span> send
              you a message
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
            </Typography>
          </div>

      </MenuItem>
      </MenuList>
      
    </Menu>
    </div>
  )
}

export default Test2
