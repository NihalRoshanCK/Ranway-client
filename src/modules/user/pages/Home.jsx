import React, { useState, useEffect } from "react";
// import { BsSearch } from 'react-icons/Bs';
// import { FaRegUserCircle } from 'react-icons/Fa';
import image from "../images/home.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
import {
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Dialog,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import Select from "../components/Select";
import Login from "../components/Login";
// import Register from '../components/register';
import Register from "../components/Register";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { open } from "../../../Redux/LoginReduser";
// import { XMarkIcon } from '@heroicons/react/24/solid';
import Navbar from "../components/NavbarUser";
import Forgot from "../components/Forgot";
function Home() {
  const [auth, setAuth] = useState();
  const [login, setLogin] = useState(true);
  const [orders, setOrders] = useState([]);
  const [order, setorder] = useState(false);
  const [forget, setforget] = useState(false);
  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access === null) {
      setLogin(false);
    }
  });
  const on = useSelector((state) => state.login.value);
  const main = {
    // margin:'',
    backgroundImage: `url(${image})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: 'center',
  };
  const overlayStyle = {
    content: "", // Required for the ::before pseudo-element
    position: "absolute", // Position the overlay relative to the parent element
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Set the desired opacity value here
  };
  const handelChange = () => {
    setAuth(!auth);
  };
  const handleForget = (e) => {
    setforget(!forget);
  };

  const text = {
    fontFamily: "monospace",
  };
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpenNav(false)
  //   );
  // }, []);
  const navigate = useNavigate();
  const handlebooking = () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");
    if (role && refresh && access) {
      navigate("/booking");
    } else {
      dispatch(open());
      toast.warning("login for access");
    }
  };
  const handleOpen = () => {
    setorder(!order);
  };

  function formatDate(inputDate) {
    if (inputDate) {
      const date = new Date(inputDate);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = date.getFullYear();
  
      return `${day} ${month} ${year}`;
    } else {
      return ; // Or any other suitable text for null dates
    }
  }

  return (
    <>
      <div  style={main} className=" h-screen">
        <div className="" 
        style={overlayStyle} 
        >

         <Navbar />
            <div className="flex items-center justify-evenly w-full h-5/6 ">
              <div className="space-y-1 p-8">
                <h6 style={text} className="md:text-3xl z-10 text-2xl antialiased font-black   text-white " >
              Logistics made easy through digital solutions
            </h6>
            <p className="antialiased text-white text-sm md:text-base break-after-all lg:text-lg ">
              We make it easy to manage your shipments and logistics online.
              From finding a price and making bookings to submitting documents
              and tracking cargo.
            </p>
            <p className="antialiased text-white text-sm md:text-base lg:text-lg ">
              Register and you will soon be able to manage your logistics
              online.
            </p>
            <div className=" space-x-3">

             {login ? null : (
               <Button
               onClick={() => dispatch(open())}
               color="white"
               className=""
               >
                Login
              </Button>
            )}
            <Button
              onClick={handlebooking}
              className="border-2 "
              color="white"
              variant="text"
              >
              Book New Order
            </Button>
                </div>
              </div>
              <div className="w-full lg:flex hidden justify-center ">
               <Select  setOrders={setOrders} setorder={setorder} order={order} orders={orders}/>
              </div>

        </div>
        <div className="w-full flex lg:hidden ">
               <Select  setOrders={setOrders} setorder={setorder} order={order} orders={orders}/>
              </div>
</div>

      </div>

      <Dialog size="xs" open={on} className=" flex bg-transparent shadow-none">
        {auth ? (
          <Register handelChange={handelChange} />
        ) : forget ? (
          <Forgot handleForget={handleForget} />
        ) : (
          <Login handelChange={handelChange} handleForget={handleForget} />
        )}
        <ToastContainer />
      </Dialog>

      <Dialog
        open={order}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xl"
        className="max-h-screen overflow-y-auto pb-10"
      >
        <DialogHeader>
          Product Name:{orders?.booking?.product_name}
        </DialogHeader>
        <DialogBody divider className="h-full flex  justify-center items-center">

        <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

<div class="relative">
    <div class="md:flex items-center md:space-x-4 mb-3">
        <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                <svg class="fill-emerald-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                </svg>
            </div>
            <time class="font-caveat font-medium text-xl text-indigo-500 md:w-28">Apr 7, 2024</time>
        </div>
        <div class="text-slate-500 ml-14"><span class="text-slate-900 font-bold">Mark Mikrol</span> opened the request</div>
    </div>
    <div class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.</div>
</div>

<div class="relative">
    <div class="md:flex items-center md:space-x-4 mb-3">
        <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path class="fill-slate-300" d="M14.853 6.861C14.124 10.348 10.66 13 6.5 13c-.102 0-.201-.016-.302-.019C7.233 13.618 8.557 14 10 14c.51 0 1.003-.053 1.476-.143L14.2 15.9a.499.499 0 0 0 .8-.4v-3.515c.631-.712 1-1.566 1-2.485 0-.987-.429-1.897-1.147-2.639Z" />
                    <path class="fill-slate-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V11.5a.5.5 0 0 0 .8.4l1.915-1.436c.845.34 1.787.536 2.785.536 3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0Z" />
                </svg>
            </div>
            <time class="font-caveat font-medium text-xl text-indigo-500 md:w-28">Apr 7, 2024</time>
        </div>
        <div class="text-slate-500 ml-14"><span class="text-slate-900 font-bold">John Mirkovic</span> commented the request</div>
    </div>
    <div class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</div>
</div>

<div class="relative">
    <div class="md:flex items-center md:space-x-4 mb-3">
        <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path class="fill-slate-300" d="M14.853 6.861C14.124 10.348 10.66 13 6.5 13c-.102 0-.201-.016-.302-.019C7.233 13.618 8.557 14 10 14c.51 0 1.003-.053 1.476-.143L14.2 15.9a.499.499 0 0 0 .8-.4v-3.515c.631-.712 1-1.566 1-2.485 0-.987-.429-1.897-1.147-2.639Z" />
                    <path class="fill-slate-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V11.5a.5.5 0 0 0 .8.4l1.915-1.436c.845.34 1.787.536 2.785.536 3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0Z" />
                </svg>
            </div>
            <time class="font-caveat font-medium text-xl text-indigo-500 md:w-28">Apr 8, 2024</time>
        </div>
        <div class="text-slate-500 ml-14"><span class="text-slate-900 font-bold">Vlad Patterson</span> commented the request</div>
    </div>
    <div class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">Letraset sheets containing passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Ipsum.</div>
</div>

<div class="relative">
    <div class="md:flex items-center md:space-x-4 mb-3">
        <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path class="fill-slate-300" d="M14.853 6.861C14.124 10.348 10.66 13 6.5 13c-.102 0-.201-.016-.302-.019C7.233 13.618 8.557 14 10 14c.51 0 1.003-.053 1.476-.143L14.2 15.9a.499.499 0 0 0 .8-.4v-3.515c.631-.712 1-1.566 1-2.485 0-.987-.429-1.897-1.147-2.639Z" />
                    <path class="fill-slate-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V11.5a.5.5 0 0 0 .8.4l1.915-1.436c.845.34 1.787.536 2.785.536 3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0Z" />
                </svg>
            </div>
            <time class="font-caveat font-medium text-xl text-indigo-500 md:w-28">Apr 8, 2024</time>
        </div>
        <div class="text-slate-500 ml-14"><span class="text-slate-900 font-bold">Mila Capentino</span> commented the request</div>
    </div>
    <div class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
</div>

<div class="relative">
    <div class="md:flex items-center md:space-x-4 mb-3">
        <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                <svg class="fill-red-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                </svg>
            </div>
            <time class="font-caveat font-medium text-xl text-indigo-500 md:w-28">Apr 9, 2024</time>
        </div>
        <div class="text-slate-500 ml-14"><span class="text-slate-900 font-bold">Mark Mikrol</span> closed the request</div>
    </div>
    <div class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">If you are going to use a passage of Lorem Ipsum!</div>
</div>

</div>
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
    </>
  );
}

export default Home;

{
  /* <Select setOrders={setOrders} setorder={setorder} order={order} orders={orders}/> */
}
