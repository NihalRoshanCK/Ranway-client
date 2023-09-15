import React ,{useEffect,useState} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
function SeeAllNotifications() {
  const [socket, setSocket] = useState(null);
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState([]);

  // Define your initial access and refresh tokens (or retrieve from local storage)
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh"));

  // useEffect(() => {
  //   let ws;

  //   const connectWebSocket = () => {
  //     ws = new WebSocket(`ws://127.0.0.1:8001/ws/notifications/?token=${accessToken}`);

  //     ws.addEventListener('open', () => {
  //       console.log('WebSocket connection established');
  //       ws.send(JSON.stringify({ action: "see_all_notifications" }));
  //       // ws.send(JSON.stringify({ action: 'see_notification' }));
  //     });

  //     ws.addEventListener('message', (event) => {
  //       const message = JSON.parse(event.data);
  //       // console.log('Received message from server:', message);
  //       console.log(message.notifications ,"logggggg");
  //       if (message.action === 'all_notification') {
  //         // const parsedData = JSON.parse(event.data);
  //         setNotification(message.notifications)
  //       }
  //     });

  //     ws.addEventListener('close', async (event) => {
  //       console.log('WebSocket connection closed:', event);

  //       setTimeout(connectWebSocket, 30000);

  //     });
  //   };

  //   connectWebSocket();

  //   setSocket(ws);

  //   return () => {
  //     if (ws) {
  //       ws.close();
  //     }
  //   };
  // }, []);
  console.log(notification,"nnn");
  return (
    <>
    {/* {
      notification.map((item,index)=>(  
      <div className='flex'>
      <Card color="white " shadow={false} className=" p-5 w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <div className="5 flex items-center gap-0">
              
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>
          {item.message}
     
        </Typography>
      </CardBody>
    </Card>

    </div>

        ))
    }


  */}
    </> 
  )
}

export default SeeAllNotifications
