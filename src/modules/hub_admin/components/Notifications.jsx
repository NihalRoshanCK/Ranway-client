import React,{ useEffect,useState } from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Avatar,
    Typography,
    Badge,
  } from "@material-tailwind/react";
  import ReconnectingWebSocket from 'reconnecting-websocket';
function Notifications() {
    const [count, setCount] = useState(0);
    const [action,setAction]=useState({ "action": "see_notification_count" })
    useEffect(() => {
        // Your access token
        const accessToken = localStorage.getItem('access');
        console.log(accessToken,"accessTokenaccessToken")
        // Construct the WebSocket URL with the token as a query parameter
        const wsUrl = `ws://127.0.0.1:8001/ws/notifications/?token=${accessToken}`;
    
    
        // Create a ReconnectingWebSocket connection
    const ws = new ReconnectingWebSocket(wsUrl);

    // Function to send the action message
    const sendActionMessage = () => {
      const actionMessage = JSON.stringify(action);
      ws.send(actionMessage);
    };

    // WebSocket event handlers
    ws.addEventListener('open', () => {
      console.log('WebSocket connected');
      
      // Send the action message immediately when the WebSocket connection is open
      sendActionMessage();

      // Set up an interval to send the action message every second
      const intervalId = setInterval(sendActionMessage, 50000);
      
      // Clean up the interval when the WebSocket is closed
      ws.addEventListener('close', () => {
        console.log('WebSocket closed');
        clearInterval(intervalId);
      });
    });
    ws.addEventListener('message', (event) => {
      console.log('Received message:', event.data);
      const parsedData = JSON.parse(event.data);
      setCount(parsedData.notification_count)
    //   console.log("count",count)
      // Handle incoming messages here
    });

    // Clean up the WebSocket when the component unmounts
    return () => {
      ws.close();
    };

      }, []);
    console.log(count);
    console.log(action);
    function handleAction(){
        console.log("enteredddddddddddddddd");
        setAction({"action":"see_notification"})
    }
  return (
    <>
    <Menu>
      <Badge content={count} withBorder>
      <MenuHandler onClick={handleAction}>
        <IconButton  onClick={handleAction} variant="text">
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
        </IconButton>
      </MenuHandler>
        </Badge>
      <MenuList className="flex flex-col gap-2">
      <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
      <Avatar
            variant="circular"
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-normal">
              <span className="font-medium text-blue-gray-900">Tania</span> send
              you a message
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <ClockIcon />
              13 minutes ago
            </Typography>
          </div>

      </MenuItem>
      </MenuList>
      
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