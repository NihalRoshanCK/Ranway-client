import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import React,{useState,useEffect} from 'react'
import api from "../axiosInterceptor";
import jwt_decode from "jwt-decode";
function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages,setMessages]=useState([])
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));
  const [messageText, setMessageText] = useState(""); 
  let decoded = jwt_decode(accessToken);
  const user=decoded.user_id
  const sendMessage = () => {
    console.log(innerHtml);

    if (messageText.trim() === "") return; // Don't send empty messages
    const messageData = {
      type: "text", // Adjust the message type as needed (text, audio, video, etc.)
      content: messageText,
    };

    // Send the message data to the server via WebSocket
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(messageData));
    }

    // Clear the message input field after sending the message
    setMessageText("");
  };
  const handleKeyPress = (event) => {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

      sendMessage();

    // }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`sockets/message/`);
        setMessages(response.data); // Set the orders array in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);
  useEffect(() => {
    let ws;

    const connectWebSocket = () => {
      ws = new WebSocket(import.meta.env.VITE_BASE_WEB_URL+`ws/messaging/?token=${accessToken}`);

      ws.addEventListener('open', () => {
        console.log('WebSocket connection established');
      });

      ws.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
       

        setMessages((prevMessages) => [...prevMessages, message.message.message_data])
      
        // console.log('Received message from server:', message);
       
      });

      ws.addEventListener('close', async (event) => {
        console.log('WebSocket connection closed:', event);

              
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
 
  const handleInputChange = (innerHtml, textContent, innerText, nodes) => {
    // Update the messageText state with the new message text
    setMessageText(textContent);

  };

  //  Function to handle sending a message
   const handleSend = () => {
    let flag=0;
    for (let i=0;i<messageText.length;i++){
      if (messageText[i] !== ' '&& messageText[i]!=="."){
        flag=1;
      }
    }
    // for(let j=0;j<toDos.length;j++){
    //   if(toDo===toDos[j].text){
    //     flag=0;
    //   }
    // }

    if (flag==1) {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      // Send the message (e.g., via WebSocket) using messageText
      // You can replace this with your actual sending logic
      console.log('Sending message:', messageText);
      const messageData = {
        type: "text", // Adjust the message type as needed (text, audio, video, etc.)
        content: messageText,
      };
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageData));
      }
      // Clear the message input field after sending
      setMessageText('');
    }
  };

  // Function to handle attaching a file
  // const handleAttachClick = () => {
  //   if (messageText.trim() !== '') {
  //     // Send the attached message (e.g., via WebSocket) using messageText
  //     // You can replace this with your actual sending logic
  //     console.log('Attaching and sending message:', messageText);

  //     // Clear the message input field after sending
  //     setMessageText('');
  //   }
  // };
  return (
    <div className="">
  <MainContainer>
    <ChatContainer>
      <MessageList className="mt-5">
      {messages.map((item,index)=>(
        <>
        <Avatar
  className={`${user === item.sender.id ? "float-right" : ""}`}
  active={true}
  size="sm"
  name={item.sender.name}
  src={item.sender?.profile_picture}
/>
        <div className="flex">

        {/* <div className={`${user === item.sender.id ? "float-right" : ""}`}>{item["sender"].name}</div> */}
          <Message 
          // key={index}
          model={{
            message: item.content,  
              sentTime:"",
              sender:item["sender"].name,
              direction: user === item.sender.id ? "outgoing" : "incoming",
              text:"custom",
              // payload:item["sender"].name,
              position:0
            }}
            // color={"red"}
            avatarPosition={"top-left"}
            avatarSpacer={true}
            > 
            </Message>
            </div>
            </>
          ))}
      </MessageList>
      <MessageInput placeholder="Type message here"
      // onChange={(e) => setMessageText(e.target.value)} 
      
      // onSend={handleKeyPress}
      value={messageText}
            onChange={handleInputChange}
            onSend={handleSend}
            // onAttachClick={handleAttachClick}
            sendButton={true}
            attachButton={true}
            attachDisabled={false}

      />
    </ChatContainer>
  </MainContainer>
</div>
  )
}

export default Chat
