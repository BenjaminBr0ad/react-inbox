import React from 'react'
import Message from './Message'

const MessageList = ({messages, clickStar, checkbox, markAsRead}) => (

  <div>
    {messages.map(message =>
      <Message
        message={message}
        key={message.id}
        clickStar={clickStar}
        checkbox={checkbox}
        markAsRead={markAsRead}
      />
    )}
  </div>

)

export default MessageList
