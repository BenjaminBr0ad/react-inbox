import React, { Component } from 'react'
import './App.css'
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import ComposeForm from './ComposeForm'

const API = 'http://localhost:8082/api/messages'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      composeForm: false
    }
  }

  async componentDidMount() {
    const response = await fetch(API)
    const json = await response.json()
    console.log(json);
    this.setState({messages:json.reverse()})
  }

  setMessages = async (idArray, command, property, value) => {
    let obj = {
      messageIds: idArray,
      command: command,
      [property]: value,
    }
    const response = await fetch(API, {
      method: 'PATCH',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const messages = await response.json()
    this.setState({messages: messages.reverse()})
  }

  filterMessages = (terms) => {
    return this.state.messages.filter(terms)
  }

  allSelected = () => {
    let value = false
    const selected = this.filterMessages(message => message.selected)
    value = selected.length === this.state.messages.length ? true : false
    return value
  }

  someSelected = () => {
    let value = false
    const selected = this.filterMessages(message => message.selected)
    selected.length > 0 ? value = true : value = false
    return value
  }

  clickStar = (id) => {
    const message = this.filterMessages(message => message.id === id)[0]
    const value = message.starred ? message.starred = false : message.starred = true
    this.setMessages([id], 'star', 'starred', value)
  }

  checkbox = (id) => {
    const message = this.filterMessages(message => message.id === id)[0]
    const value = message.selected ? message.selected = false : message.selected = true
    this.setMessages([id], 'select', 'selected', value)
    this.someSelected()
    this.allSelected()
  }

  bulkSelect = () => {
    const value = this.allSelected() ? false : true
    const idArray = this.filterMessages(message => message.selected !== value)
      .map(message => message.id)
    this.setMessages(idArray, 'select', 'selected', value)
    this.someSelected()
  }

  markAsRead = (value) => {
      const selected = this.filterMessages(message => message.selected)
      let selectedIds = selected.map(message => message.id)
      selected.forEach(message => message.read = value)
      this.setMessages(selectedIds, 'read', 'read', value)
  }

  deleteMessage = () => {
    const deletedIds = this.filterMessages(message => message.selected).map(message => message.id)
    this.setMessages(deletedIds, 'delete', 'selected', false)
  }

  unreadCount = () => {
    const unreadMessages = this.filterMessages(message => !message.read)
    return unreadMessages.length
  }

  changeLabel = (e, value) => {
    const selectedMessages = this.filterMessages(message => message.selected)

    if (value === 'apply') {
      const idArray = selectedMessages
        .filter(message => !message.labels.includes(e.target.value))
        .map(message => message.id)
      this.setMessages(idArray, 'addLabel', 'label', e.target.value)

    } else if (value === 'remove') {
      const idArray = selectedMessages
        .filter(message => message.labels.includes(e.target.value))
        .map(message => message.id)
      this.setMessages(idArray, 'removeLabel', 'label', e.target.value)
    }
  }

  toggleCompose = () => {
    this.setState({composeForm: this.state.composeForm ? false : true})
  }

  composeMessage = async (e) => {
    e.preventDefault()
    let obj = {
      subject: this.state.subject,
      body: this.state.body
    }
    const response = await fetch(API, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const messages = await response.json()
    this.setState({messages: [messages, ...this.state.messages]})
    this.toggleCompose()
  }

  handleFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
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
          toggleCompose={this.toggleCompose}
        />
        {this.state.composeForm ? <ComposeForm composeMessage={this.composeMessage} handleFormChange={this.handleFormChange}/> : <div></div>}
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
