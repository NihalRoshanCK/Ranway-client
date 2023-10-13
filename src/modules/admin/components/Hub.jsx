import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    // Input,
    Typography,
    Button,
    CardBody,
    Chip, 
    CardFooter,
    // Tabs,
    // TabsHeader,
    // Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";

  // const TABS = [
  //   {
  //     label: "All",
  //     value: "all",
  //   },
  //   {
  //     label: "Monitored",
  //     value: "monitored",
  //   },
  //   {
  //     label: "Unmonitored",
  //     value: "unmonitored",
  //   },
  // ];

  const TABLE_HEAD = ["Head", "HubName",  "is Hotspot","Number", ""];
 
// const TABLE_ROWS = [
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
//     name: "John Michael",
//     email: "john@creative-tim.com",
//     job: "Manager",
//     org: "Organization",
//     online: true,
//     date: "23/04/18",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
//     name: "Alexa Liras",
//     email: "alexa@creative-tim.com",
//     job: "Programator",
//     org: "Developer",
//     online: false,
//     date: "23/04/18",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
//     name: "Laurent Perrier",
//     email: "laurent@creative-tim.com",
//     job: "Executive",
//     org: "Projects",
//     online: false,
//     date: "19/09/17",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
//     name: "Michael Levi",
//     email: "michael@creative-tim.com",
//     job: "Programator",
//     org: "Developer",
//     online: true,
//     date: "24/12/08",
//   },
//   {
//     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
//     name: "Richard Gran",
//     email: "richard@creative-tim.com",
//     job: "Manager",
//     org: "Executive",
//     online: false,
//     date: "04/10/21",
//   },
// ];

import {
  //  MagnifyingGlassIcon, 
   ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
//   import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
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
        {/* <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Hub list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Hubs
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" color="blue-gray" size="sm">
              view all
            </Button> */}
            {/* <Button className="flex items-center gap-3" color="blue" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Hub
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
        </div>
      </CardHeader> */} 
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
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



