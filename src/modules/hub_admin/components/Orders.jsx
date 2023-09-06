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
    Chip,
    CardFooter,
    IconButton,
    Tooltip,

} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/solid";
import api from '../axiosInterceptor';
// import NavbarUser from '../components/NavbarUser';
import jwt_decode from "jwt-decode";
const TABLE_HEAD = ["Product Name", "Order_id",  "from_address","to_address", "status"];
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';

function Orders() {
    const[TABLE_ROWS,setTABLE_ROWS]=useState([])

    useEffect(() => {
        var token=localStorage.getItem('access')
        var decoded = jwt_decode(token);
        console.log(decoded.user_id
            );
        // Example API request using the api instance
        // api.get(`auths/user/${decoded.user_id}/`)
        //   .then((response) => {
            
        // //   setTABLE_ROWS(response.data);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
        api.get(`product/order/`).then((response)=>{
            console.log(response.data)
            setTABLE_ROWS(response.data);
        })
      }, []);
  return (
    <>
     <div className="relative h-72 w-full overflow-hidden rounded-xl bg-[url(https://instagram.fcok6-2.fna.fbcdn.net/v/t51.2885-19/277546360_3108737912697658_4973979873422620599_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcok6-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=naNuIQxA5xgAX_x_MZ6&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCSaNZkzq6e4TTZjXNR7PEfOLojTq3dIKV9eldgJM0HWQ&oe=64D09C88&_nc_sid=8b3546)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
    </div>  
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              /> */}
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Order page
                </Typography>
                {/* <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography> */}
              </div>
            </div>
            <div className="w-96">
              {/* <Tabs value="app">
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
              </Tabs> */}
            </div>
          </div>
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
                      <Link to={`hubadmin/${item.id}`}>
                    <div className="flex items-center gap-3">
                      {/* <Avatar src={item?.hub_head?.user?.profile_picture} alt='name' size="sm" /> */}
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item?.["booking"].product_name}
                      </Typography>
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
                        {item?.created_at}
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
                      {/* <Chip
                        variant="ghost"
                        size="sm"
                        value={item?.is_active ? "active" : "inactive"}
                        color={item?.is_active  ? "green" : "blue-gray"}
                      /> */}
                      {item?.["booking"]?.from_address}-{item?.["booking"]?.to_address}
                        
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item?.number}
                    </Typography>
                  </td>
                  <Link to={`hubdetail/${item.id}`}>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      {/* <IconButton variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton> */}
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={item?.collected ? "Onproccess" : "Pending"}
                        color={item?.collected  ? "green" : "red"}
                      />
                    </Tooltip>
                  </td>
                  </Link>
                </tr>
              );
            })}
          </tbody>
        </table>
          </CardBody>
      </Card>
    </>
  )
}

export default Orders
