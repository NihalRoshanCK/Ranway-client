import React from 'react'

import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,    
} from "@material-tailwind/react";

import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/solid";
function AdminProfile() {
  return (
        <>
    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://imgs.search.brave.com/Mm1uoXquVhpY1L8mxinbbjaR8n2oWkfAje6OCxlMqbQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MDM2MTQ0NzItOGM5/M2Q1NmU5MmNlP2l4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVGg4Zkh4bGJu/d3dmSHg4Zkh3PSZ3/PTEwMDAmcT04MA)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full  bg-blue-500/50" />
    </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
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
          </CardBody>
      </Card>
      </>
  )
}

export default AdminProfile
