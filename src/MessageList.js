import React from 'react'
import Message from './Message'

const MessageList = ({messages, clickStar, checkbox}) => (

  <div>
    {messages.map(message =>
      <Message
        key={message.id}
        id={message.id}
        subject={message.subject}
        read={message.read}
        starred={message.starred}
        selected={message.selected}
        labels={message.labels}
        body={message.body}
        clickStar={clickStar}
        checkbox={checkbox}
      />
    )}
  </div>

)

export default MessageList
