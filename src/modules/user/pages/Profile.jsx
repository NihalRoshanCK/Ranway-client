import React,{useEffect,useState} from 'react'
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,    
    Button,
   
    Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
  
  } from "@heroicons/react/24/solid";
import api from '../useraxiosInterceptor';
import NavbarUser from '../components/NavbarUser';
import jwt_decode from "jwt-decode";
// const TABLE_HEAD = ["Product Name", "Order_id",  "from_address","to_address", "status"];

import Orderstable from '../components/Orderstable';

function Profile() {
    const [user,setUser]=useState([])
    const [open, setOpen] =useState(false);
    const [order,setorder]=useState([]);
    useEffect(() => {
        var token=localStorage.getItem('access')
        var decoded = jwt_decode(token);
        console.log(decoded.user_id
            );
        // Example API request using the api instance
        api.get(`auths/user/${decoded.user_id}/`)
          .then((response) => {
            setUser(response.data)
        //   setTABLE_ROWS(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    
      }, []);
      console.log(user);

      const orderDetail = async (id) => {
        console.log(id,"ggggggggggggggggggggggggggggggggggggggggggg");
        const response=await api.get(`product/order/${id}/`)
        console.log(response.data,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        setorder(response.data)
        setOpen(!open);
      }
      const handleOpen=()=>{
        setOpen(!open);
      }
  return (

    <>
    <NavbarUser/>

    <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size='xl'
      >
        <DialogHeader>Product Name:{order?.booking?.product_name}</DialogHeader>
        <DialogBody divider className=''>

        {/* <Timeline  >
        <TimelineItem  className='flex'>
          <TimelineConnector className='flex'/>
          <TimelineHeader className="h-3">
            <TimelineIcon color={order.created_at ? 'green' : 'gray'} /> 
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Order conformed
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
              {order?.created_at}
            </Typography>
          </TimelineBody>
        </TimelineItem>
       
      </Timeline> */}
      
          <ol class="items-center  sm:flex w-full">
    <li class={`relative mb-5  w-2/12 ${ order?.created_at  ? "sm:mb-0"  : "sm:mb-5"}`}>
            <h3  color='' className={`text-sm mb-1 font-semibold ${order?.out_for_delivery ? 'text-green-300' : order?.returned_at ? 'text-red-300' : 'text-gray dark:text-white '}`}>Order conformed</h3>
        <div class="flex items-center ">
            <div class={` flex items-center justify-center w-4 h-4 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0  ${order?.returned_at ? 'bg-red-300' :order?.created_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'}   `}>
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class={`hidden sm:flex w-full bg-gray-200 h-0.5 ${order?.returned_at ? 'bg-red-300' :order?.created_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-500 dark:bg-gray-700'}`}></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block ml-4 mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{order?.created_at}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>

    <li class={`relative mb-5  w-2/12 ${ order?.collected_at  ? "sm:mb-0"  : "sm:mb-5"}`}>
            <h3  color='' className={`text-sm mb-1 font-semibold ${order?.out_for_delivery ? 'text-green-300' : order?.returned_at ? 'text-red-300' : 'text-gray dark:text-white '}`}>Order Collected</h3>
        <div class="flex items-center">
            <div class={` flex items-center justify-center w-4 h-4 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0  ${order?.returned_at ? 'bg-red-300' :order?.nearest_hub_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'}   `}>
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class={`hidden sm:flex w-full bg-gray-200 h-0.5 ${order?.returned_at ? 'bg-red-300' :order?.collected_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-500 dark:bg-gray-700'}`}></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{order?.collected_at}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>

    <li class={`relative mb-5  w-2/12 ${ order?.nearest_hub_at  ? "sm:mb-0"  : "sm:mb-5"}`}>
            <h3  color='' className={`text-sm mb-1 font-semibold ${order?.out_for_delivery ? 'text-green-300' : order?.returned_at ? 'text-red-300' : 'text-gray dark:text-white '}`}>Reached nearest hub</h3>
        <div class="flex items-center">
            <div class={` flex items-center justify-center w-4 h-4 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0  ${order?.returned_at ? 'bg-red-300' :order?.nearest_hub_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'}   `} >
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class={`hidden sm:flex w-full bg-gray-200 h-0.5 ${order?.returned_at ? 'bg-red-300' :order?.nearest_hub_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-500 dark:bg-gray-700'}`}></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{order?.nearest_hub_at}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>

    <li class={`relative mb-5  w-2/12 ${ order?.out_for_delivery  ? "sm:mb-0"  : "sm:mb-5"}`}>
            <h3  color='' className={`text-sm mb-1 font-semibold ${order?.out_for_delivery ? 'text-green-300' : order?.returned_at ? 'text-red-300' : 'text-gray dark:text-white '}`}>Out for Delivery</h3>
        <div class="flex items-center">
            <div class={` flex items-center justify-center w-4 h-4 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0  ${order?.returned_at ? 'bg-red-300' :order?.out_for_delivery ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'}   `}>
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            <div class={`hidden sm:flex w-full bg-gray-200 h-0.5 ${order?.returned_at ? 'bg-red-300' :order?.out_for_delivery ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-500 dark:bg-gray-700'}`}></div>
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{order?.out_for_delivery}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>
    {order?.delivered_at ?
    <li class={`relative mb-5  w-2/12 ${ order?.delivered_at  ? "sm:mb-0"  : "sm:mb-5"}`}>
            <h3  color='' className={`text-sm mb-1 font-semibold ${order?.delivered_at ? 'text-green-300' :  'text-gray dark:text-white '}`}>Delivery</h3>
        <div class="flex items-center">
            <div class={` flex items-center justify-center w-4 h-4 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0  ${order?.returned_at ? 'bg-red-300' :order?.delivered_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'}   `}>
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            {/* <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div> */}
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{order?.delivered_at}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>
:
order?.returned_at ?
  <li class={`relative mb-0  w-2/12 ${ order?.returned_at  ? "sm:mb-0"  : "sm:mb-5"}`}>
            <h3  color='' className={`text-sm mb-1 font-semibold ${order?.returned_at ? 'text-red-300' : 'text-gray dark:text-white '}`}>Returnd</h3>
        <div class="flex items-center">
            <div class=" flex items-center justify-center w-4 h-4 bg-red-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            {/* <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div> */}
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-red-200 dark:text-gray-500">{order?.returned_at}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>
:
    <li class="relative mb-0 sm:mb-0 w-2/12 ">
            <h3  color='' className={`text-sm mb-1 font-semibold ${order?.delivered_at ? 'text-green-300' : 'text-gray dark:text-white '}`}>Delivery</h3>
        <div class="flex items-center">
            <div class={` flex items-center justify-center w-4 h-4 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0  ${order?.returned_at ? 'bg-red-300' :order?.delivered_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'}   `} >
                {/* <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg> */}
            </div>

            {/* <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div> */}
        </div>
        <div class="mt-3 sm:pr-8">
            {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3> */}
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Expected {order?.booking?.cpd}</time>
            {/* <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>
    }
    
</ol>


        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://imgs.search.brave.com/b5ZRS813z6S51yTEKSjolrf5sH_VCAvSH6X-sW8ThWU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjUwNTY4MzYwNDEt/N2Y0M2FjMjdkY2I1/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/bGVIQnNiM0psTFda/bFpXUjhPSHg4ZkdW/dWZEQjhmSHg4ZkE9/PSZ3PTEwMDAmcT04/MA.jpeg)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
    </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={user.profile_picture}
                alt={user.name}
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user.name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                 {user.email}
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className='h-60'>

          <Orderstable orderDetail={orderDetail}/>
          </div>
          </CardBody>
      </Card>
    </>
  )
}

export default Profile
