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
  Input
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from 'react-query';
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
const fetchUserData = async (userId) => {
  const response = await api.get(`auths/user/${userId}/`);
  return response.data;
};
function Profile() {
    // const [user,setUser]=useState([])
    const [open, setOpen] =useState(false);
    const [order,setorder]=useState([]);
    var token=localStorage.getItem('access')
    var decoded = jwt_decode(token);
    const userId = decoded.user_id;
    const { data: user, isLoading, isError } = useQuery(['user', userId], () => fetchUserData(userId));

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

      const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
  });
  const handleEdit = (value) => {
    setData({
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || '',
      phone: user?.phone || '',
    });
    setOpenDialog(value);
  }
  const handleUpdate=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log(data);
    if (!data.name){
      return toast.warning('name  is required')
    }else if (!data.email) {
      return toast.warning('email  is requird')
    }else if (!data.phone) {
      return toast.warning('phone number is requird')
    }

    if (!isValidName(data.name)) {
      return toast.warning('Enter a valid name format')
    }else if (!isValidEmail(data.email)) {
      return toast.warning('Enter a valid email format')
    }else if (!isValidPhone(data.phone)) {
      return toast.warning('Enter a valid phone number format requires 10 digit')
    }
    if (selectedImage){
      const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      data.profile_picture = selectedImage;
      if (!allowedFileTypes.includes(data.profile_picture.type)) {
        return toast.warning("Invalid file type. Please select a .jpg, .jpeg, .png, or .gif file.");
      }else{
        // console.log("ixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        formData.append('profile_picture', selectedImage)
      }
    }
    if (data.password){
      if (!data.current_password) {
        return toast.warning('Current password is requird to update password')
      }
      if (!data.conform_password) {
        return toast.warning('conform password is requird to update password')
      }
      if (!isValidPassword(data.password)) {
        return toast.warning('Password requires at least one uppercase letter, one lowercase letter, and one special character')
      }
      if (data.password !=data.conform_password){
        return toast.warning('password is not matching')
      }
      formData.append('new_password', data.password)
      formData.append('current_password', data.current_password)
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    
    api.patch(`auths/user/${userId}/`,formData)
          .then((response) => {
          console.log("SingleStaffffffffffffffffffffff",response.data);
          })
          .catch((error) => {
            console.error(error);

          });

  }
  const isValidEmail = (email) => {
    // Valid email addresses in the format user@example.com
    //  consisting of non-space characters before the @ symbol
    //  followed by non-space characters, and a valid top-level domain (TLD) after the @ symbol
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidName = (name) => {
    // usernames must start and end with an alphanumeric character (letter or digit)
    //  can contain periods (dots) within, must not have consecutive periods
    //  and be between 1 and 30 characters in length
    const nameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W_][\w.]{3,29}$/;
    return nameRegex.test(name);
  };
  const isValidPhone = (phone) => {
    // Required 10 digit with no six consecutive identical digits
    const numberRegex = /^(?!.*(\d)\1{5})(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return numberRegex.test(phone);
  };
  const isValidPassword = (password) => {
    // Password validation using regular expression
    // Requires at least one uppercase letter, one lowercase letter, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
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
            <div class={` flex  items-center justify-center w-4 h-4 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0  ${order?.returned_at ? 'bg-red-300' :order?.created_at ? 'bg-green-300' : order?.returned_at ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'}   `}>
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

      {isLoading && <div>Loading...</div>}
    {isError && <div>Error loading user data.</div>}
    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://imgs.search.brave.com/b5ZRS813z6S51yTEKSjolrf5sH_VCAvSH6X-sW8ThWU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjUwNTY4MzYwNDEt/N2Y0M2FjMjdkY2I1/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/bGVIQnNiM0psTFda/bFpXUjhPSHg4ZkdW/dWZEQjhmSHg4ZkE9/PSZ3PTEwMDAmcT04/MA.jpeg)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
    </div>
    <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
      <div className='sm:flex justify-between'>

      <CardBody className="p-4  ">

        {user && (
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="sm:flex sm:space-y-3 items-center gap-6">
              <Avatar
                src={user?.profile_picture}
                alt={user.name ? user?.name : user?.email}
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
              <div>
                <Typography variant="h5"  color={user.name ? "blue-gray" : "red"} className="mb-1 break-all">
                  <span className='text-xl'>Name :</span> {user.name ? user?.name : "Edit the name"} 
                </Typography>
                <Typography variant=" " color= "blue-gray"  className="mb-1 break-all">
                <span className=' text-xl'>Phone :</span> {user?.phone}
                </Typography>
                <Typography variant=" " color= "blue-gray"  className="mb-1 break-all">
                <span className=' text-xl'>Email :</span> {user?.email}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600 break-all"
                  >
                  CEO / Co-Founder of Runway.PVT
                </Typography>
              </div>
            </div>
          </div>
        ) }
      
      </CardBody>
      <div className='p-2'>
        <Button color='gray' onClick={handleEdit} >Edit</Button>
      </div>

    </div>
    <Orderstable orderDetail={orderDetail}/>

      
    </Card>


      <Dialog className='max-h-screen overflow-y-auto'
        open={openDialog}
        size= {"md"}
        handler={handleEdit}
      >
        <DialogHeader>Update</DialogHeader>
        <form onSubmit={handleUpdate} encType="multipart/form-data" >

        <DialogBody className='p-2 space-y-4 py-4' divider>
          <Input className=''onChange={(e) =>
            setFormData({
              ...data,
              name: e.target.value,
            })
          } value={data?.name} label='name'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          } value={data?.email} label='email'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              phone: e.target.value,
            })
          } value={data?.phone} label='phone'color='indigo' />
          <Input type='file' color='indigo' onChange={(e) => setSelectedImage(e.target.files[0])}   name='profile_picture' label="Photo"/>
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              current_password: e.target.value,
            })
          } type='password' label='current password'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          } type='password' label='password'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              conform_password: e.target.value,
            })
          }type='password' label='conform password'color='indigo' />
        </DialogBody>
        <DialogFooter className='flex-col space-y-3'>
          <Button
            variant="text"
            color="red"
            onClick={() => handleEdit(null)}
            className="mr-1"
            >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            type='submit'
            // onClick={() => handleOpen(null)}
            >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
            </form>
  <ToastContainer className="z-50" />

      </Dialog>
    </>
  )
}

export default Profile
