import React, { Component } from 'react'
import './App.css'
import Toolbar from './Toolbar'
import MessageList from './MessageList'

const messages = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: messages
    }
  }
  // ----- Convenience functions to replace verbose code / called within other functions.
  filterMessages = (terms) => {
    return this.state.messages.filter(terms)
  }

  setMessages = () => {
    this.setState({messages: this.state.messages})
  }
  allSelected = () => {
    let value = false
    const selected = this.filterMessages(message => message.selected === true)
    value = selected.length === this.state.messages.length ? true : false
    return value
  }

  someSelected = () => {
    let value = true
    const selected = this.filterMessages(message => message.selected === true)
    selected.length > 0 ? value = true : value = false
    return value
  }
 // ----- Main functionality of the inbox.
  clickStar = (id) => {
    const message = this.filterMessages(message => message.id === id)[0]
    message.starred ? message.starred = false : message.starred = true
    this.setMessages()
  }

  checkbox = (id) => {
    const message = this.filterMessages(message => message.id === id)[0]
    message.selected ? message.selected = false : message.selected = true
    this.setMessages()
    this.someSelected()
    this.allSelected()
  }

  bulkSelect = () => {
    const value = this.allSelected() ? false : true
      this.state.messages.forEach(message => message.selected = value)
      this.setMessages()
      this.someSelected()
  }

  markAsRead = (value) => {
      const selected = this.filterMessages(message => message.selected === true)
      selected.forEach(message => message.read = value)
      this.setMessages()
  }

  deleteMessage = () => {
    const selected = this.filterMessages(message => !message.selected)
    this.setMessages()
    this.setState({
      messages: selected,
    })
  }

  unreadCount = () => {
    const unreadMessages = this.filterMessages(message => message.read === false)
    return unreadMessages.length
  }

  changeLabel = (e, value) => {
    const selectedMessages = this.filterMessages(message => message.selected)

    if (value === 'apply') {
      selectedMessages
        .filter(message => !message.labels.includes(e.target.value))
        .forEach(message => message.labels.push(e.target.value))
      this.setMessages()

    } else if (value === 'remove') {
      selectedMessages
        .filter(message => message.labels.includes(e.target.value))
        .forEach(message => message.labels.splice(message.labels.indexOf(e.target.value),1))
      this.setMessages()
    }
  }

  render() {
    return (
      <div className="App container">
        <Toolbar
          bulkSelect={this.bulkSelect}
          allSelected={this.allSelected}
          someSelected={this.someSelected}
          markAsRead={this.markAsRead}
          deleteMessage={this.deleteMessage}
          unreadCount={this.unreadCount}
          changeLabel={this.changeLabel}
        />
        <MessageList
          messages={this.state.messages}
          clickStar={this.clickStar}
          checkbox={this.checkbox}
        />
      </div>
    )
  }
}

export default App
