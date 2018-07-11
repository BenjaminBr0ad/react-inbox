import React, { Component } from 'react'
import './App.css'
import Toolbar from './Toolbar'
import MessageList from './MessageList'


const API = 'http://localhost:8082/api/messages'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const response = await fetch(API)
    const json = await response.json()
    this.setState({messages:json})
  }

  // ----- Convenience functions to replace verbose code / called within other functions.
  filterMessages = (terms) => {
    return this.state.messages.filter(terms)
  }

  setMessages = async (message, id, command, property) => {
    console.log(message);
    let obj = {
      messageIds: [id],
      command: command,
      [property]: message
    }
    console.log(obj);
    const response = await fetch(API, {
      method: 'PATCH',
      body: JSON.stringify(obj),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const messages = await response.json()
    console.log(messages);
    this.setState({messages: messages})
  }

  allSelected = () => {
    let value = false
    const selected = this.filterMessages(message => message.selected)
    value = selected.length === this.state.messages.length ? true : false
    return value
  }

  someSelected = () => {
    let value = true
    const selected = this.filterMessages(message => message.selected)
    selected.length > 0 ? value = true : value = false
    return value
  }
 // ----- Main functionality of the inbox.
  clickStar = (id) => {
    const message = this.filterMessages(message => message.id === id)[0]
    const newMessage = message.starred ? message.starred = false : message.starred = true

    this.setMessages(newMessage, id, 'star', 'starred')
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
      const selected = this.filterMessages(message => message.selected)
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
    const unreadMessages = this.filterMessages(message => !message.read)
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
