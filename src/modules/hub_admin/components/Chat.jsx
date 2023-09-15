import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import React from 'react'

function Chat() {
  return (
    <div className="h-5/6">
  <MainContainer>
    <ChatContainer>
      <MessageList>
        <Message
          model={{
            message: "Hello my friend",
            sentTime: "just now",
            sender: "Joe",
          }}
        />
      </MessageList>
      <MessageInput placeholder="Type message here" />
    </ChatContainer>
  </MainContainer>
</div>
  )
}

export default Chat
