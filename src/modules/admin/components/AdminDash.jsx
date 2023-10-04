import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import { BsFillBox2Fill } from "react-icons/bs";
import ChartLine from "./ChartLine";
import AllOrder from "./AllOrder";
const orderData = {
  "2022-11": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2022-12": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-01": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-02": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-03": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-04": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-05": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-06": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-07": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-08": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  "2023-09": {
    pending: 12,
    in_progress: 0,
    completed: 1,
    return: 0,
  },
  "2023-10": {
    pending: 0,
    in_progress: 0,
    completed: 0,
    return: 0,
  },
  // Add more data for other months as needed
};
function AdminDash() {
  return (
    <div className="" >
     {/* <div className=""> */}
        <div className="my-8 lg:flex justify-evenly gap-2 ">
          <Card className="w-full mt-11 lg:mt-0 ">
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
                <h1 className=" font-black text-xl float-right">281</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+55% </span>than
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
                <BsFillBox2Fill className="h-6 w-6" />
              </CardHeader>
              <div className="m-5">
                <h1 className="text-lg">Orders</h1>
                <h1 className=" font-black text-xl float-right">281</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+55% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
          <Card className="w-full mt-11 lg:mt-0  ">
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
                <h1 className=" font-black text-xl float-right">281</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+55% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
          <Card className="w-full mt-11 lg:mt-0  ">
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
                <h1 className=" font-black text-xl float-right">281</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+55% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-evenly gap-2">
          <div className="my-8 w-full">
            <Card className="w-full">
              <div className="">
                {/* <CardHeader
                  // variant="gradient"
                  // color="gray"
                  className="mb-4 grid w-11/12 h-full justify-items-center align-middle   place-items-center"
                >
                </CardHeader> */}
                  <ChartLine data={orderData} />
              </div>
              <CardFooter></CardFooter>
            </Card>
          </div>
          <div className="my-8 w-full">
            <Card className="">
              <div className="">
                {/* <CardHeader
                  // variant="gradient"
                  // color="gray"
                  className="mb-4 grid w-6/12 h-full place-items-center"
                >
                </CardHeader> */}
                  <ChartLine data={orderData} />
              </div>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
        <AllOrder/>
        
        
      {/* </div> */}
    </div>
  );
}

export default AdminDash;
