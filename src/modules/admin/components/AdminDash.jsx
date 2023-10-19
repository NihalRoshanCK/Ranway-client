import React,{useEffect,useState} from "react";
import {
  Card,
  // CardBody,
  CardFooter,
  // Typography,
  // Button,
  CardHeader,
} from "@material-tailwind/react";
import { BsFillBox2Fill } from "react-icons/bs";
import ChartLine from "./ChartLine";
import AllOrder from "./AllOrder";
import api from "../../../axiosInterceptor";

import { BiSolidUser } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";




function AdminDash() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async()=>{
        
      
        const response=await api.get(`admins/admindash/`)
        console.log(response.data,"llllllllllllllllllll");
        setData(response.data)
        
    })()
}, []);
  return (
    <div className="mt-10 " >
        <div className="xl:flex  xl:space-y-0 space-y-8 gap-2  justify-evenly mb-8 ">
        <Card className="w-full  mt-11 lg:mt-0 ">
            <div className="flex justify-between ">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4  grid h-16 w-16 justify-center items-center"
              >
                <BsFillBox2Fill className="h-6 w-6" />
              </CardHeader>
              <div className="m-5">
                <h1 className="text-lg">Orders</h1>
                <h1 className=" font-black text-xl float-right">{data?.orders?.total}</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+{data?.orders?.difference}% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
          <Card className="w-full mt-11 lg:mt-0 ">
            <div className="flex justify-between ">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4  grid h-16 w-16 justify-center items-center"
              >
                <MdPayment className="h-6 w-6" />
              </CardHeader>
              <div className="m-5">
                <h1 className="text-lg">Revenue</h1>
                <h1 className=" font-black text-xl float-right">{data?.payment?.total}</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+{data?.payment?.difference}% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <div className="flex justify-between ">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4  grid h-16 w-16 justify-center items-center"
              >
                <BiSolidUser className="h-6 w-6" />
              </CardHeader>
              <div className="m-5">
                <h1 className="text-lg">Users</h1>
                <h1 className=" font-black text-xl float-right">{data?.users?.total}</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+{data?.users?.difference}% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <div className="flex justify-between ">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4  grid h-16 w-16 justify-center items-center"
              >
                <FaHouse className="h-6 w-6" />
              </CardHeader>
              <div className="m-5">
                <h1 className="text-lg">Hubs</h1>
                <h1 className=" font-black text-xl float-right">{data?.hubs?.total}</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+{data?.hubs?.difference}% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
        </div>
        <div className="">
            <Card className="">
                {data?.orders?.order_month_data && <ChartLine data={data?.orders?.order_month_data} />}
              {/* <CardFooter></CardFooter> */}
            </Card>
        </div>
        <div className="mt-8">

        <AllOrder/>
        </div>
        
      </div>
  );
}

export default AdminDash;
