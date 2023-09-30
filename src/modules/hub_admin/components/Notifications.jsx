import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import {
    Button ,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
    Badge,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
function Notifications() {
  function calculateTimeDifference(createdDate) {
    const currentDate = new Date();
    const timeDifference = currentDate - new Date(createdDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    
    if (minutesDifference < 1) {
      return "Just now";
    } else if (minutesDifference === 1) {
      return "1 minute ago";
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    }
  }
  const [socket, setSocket] = useState(null);
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState([]);

  // Define your initial access and refresh tokens (or retrieve from local storage)
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh"));

  useEffect(() => {
    let ws;

    const connectWebSocket = () => {
      ws = new WebSocket(`ws://127.0.0.1:8001/ws/notifications/?token=${accessToken}`);

      ws.addEventListener('open', () => {
        console.log('WebSocket connection established');
        ws.send(JSON.stringify({ action: "see_notification_count" }));
        ws.send(JSON.stringify({ action: 'see_notification' }));
      });

      ws.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        // console.log('Received message from server:', message);
        console.log(message.notification_count ,"logggggg");
        if (message.action === 'notification_count') {
          // const parsedData = JSON.parse(event.data);
          setCount(message.notification_count)
        } else if (message.action === 'new_notification') {
          // console.log(message.notifications.slice(message.notifications.lenght-3,message.notifications.lenght));
          // let new_Notification=message.notifications.slice(message.notifications.length-3,message.notifications.length);
          setNotification(message.notifications);
        }
      });

      ws.addEventListener('close', async (event) => {
        console.log('WebSocket connection closed:', event);

        if (event.code === 1006) {
          // Unauthorized status (customize the code based on your server's response)
          try {
            // Call your token refresh API with Axios
            const response = await axios.post('http://127.0.0.1:8000/auths/token/refresh/', {
              refresh: refreshToken,
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.status === 200) {
              const data = response.data;
              // Update the access token and refresh token in state and local storage
              setAccessToken(data.access);
              setRefreshToken(data.refresh);
              localStorage.setItem('access', data.access);
              localStorage.setItem('refresh', data.refresh);

              // Reconnect the WebSocket with the new access token
              connectWebSocket();
            } else {
              console.error('Failed to refresh tokens:', response);
            }
          } catch (error) {
            console.error('Error refreshing tokens:', error);
          
          // Attempt to reconnect after a delay (e.g., 30 seconds)
        }
              }else{

                setTimeout(connectWebSocket, 30000);

              }        
      });
    };

    connectWebSocket();

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  return (  
    <>
    <Menu>
      <Badge content={count}  >
        {/* <Link></Link> */}
      <div  className=' m-2 h-6 w-6  '>
      <MenuHandler   >
        <div     >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            color='black'
            >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
              />
          </svg>
        </div>
      </MenuHandler>
              </div>
        </Badge>
<Link to="notifications" >
      <MenuList className="flex flex-col gap-2">
        {notification.map((item,index)=>(
        <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2" key={index}>
          <>
          {/* <Avatar
            variant="circular"
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          /> */}
          <div className="flex flex-col gap-1" >
            <Typography variant="small" color="gray" className="font-medium max-w-xs">
              {item?.message}
              {/* <span className="font-medium text-blue-gray-900">Tania</span> send
              you a message */}
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <ClockIcon />
              {calculateTimeDifference(item?.created)}
            </Typography>
          </div>
          </>
      </MenuItem>
        ))}
         <Button variant="text" className="flex items-center gap-2">
        See all{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
      </MenuList>
      </Link>

    </Menu>
    
    </>
  )
}

export default Notifications

function ClockIcon() {
    return (

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }