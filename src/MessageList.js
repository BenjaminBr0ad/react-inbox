import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  render () {
    return (
      <div>
        {this.props.messages.map(message =>
          <Message
            key={message.id}
            id={message.id}
            subject={message.subject}
            read={message.read}
            starred={message.starred}
            selected={message.selected}
            labels={message.labels}
            clickStar={this.props.clickStar}
            checkbox={this.props.checkbox}
          />
        )}
      </div>
    )
  }
}

export default MessageList
