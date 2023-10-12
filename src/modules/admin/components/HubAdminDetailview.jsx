import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../axiosInterceptor';
import {
    Card,
    CardBody,
    Avatar,
    Typography,
} from "@material-tailwind/react";


// import {
//     HomeIcon,
//     ChatBubbleLeftEllipsisIcon,
//     Cog6ToothIcon,
//   } from "@heroicons/react/24/solid";
function HubAdminDetailview() {
// const [admin,Setadmin]=useState([])
  const {id}=useParams();
  console.log(id)
  useEffect(() => {
    // Example API request using the api instance
    api.get(`admins/hub/${id}`)
      .then((response) => {
        console.log(response.data);
        // Setadmin(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  },[] );
    return (
        <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
            <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    // src={admin.hub_head.user.profile_picture}
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {/* Richard Davis */}
                      {/* {admin.hub_head.user.name} */}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                        {/* {admin.hub_name} */}
                    </Typography>
                  </div>
                </div>
                {/* <div className="w-96">
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
                </div> */}
              </div>
              </CardBody>
          </Card>
          </>
  )
}

export default HubAdminDetailview
