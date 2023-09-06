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
    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://instagram.fcok6-2.fna.fbcdn.net/v/t51.2885-19/277546360_3108737912697658_4973979873422620599_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcok6-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=naNuIQxA5xgAX_x_MZ6&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCSaNZkzq6e4TTZjXNR7PEfOLojTq3dIKV9eldgJM0HWQ&oe=64D09C88&_nc_sid=8b3546)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
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
