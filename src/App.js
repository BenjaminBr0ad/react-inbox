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
      messages: messages,
      allSelected: false,
      someSelected: true
    }
  }

  clickStar = (id) => {
    for (let elem of this.state.messages) {
      if (elem.id === id) {
        elem.starred ? elem.starred = false : elem.starred = true
        this.setState({
          messages: this.state.messages
        })
      }
    }
  }

  checkbox = (id) => {
    const messages = this.state.messages.filter(message => message.id === id)[0]
    messages.selected ? messages.selected = false : messages.selected = true
    this.setState({messages: this.state.messages})

    const someSelected = this.state.messages.filter(message => message.selected === true)
    if (someSelected.length >=1) {
      this.setState({
        someSelected: true
      })
    } else {
      this.setState({
        someSelected: false
      })
    }

    if (this.state.allSelected === true) {
      this.setState({
        allSelected: false,
        someSelected: true
      })
    }
  }

  bulkSelect = () => {
    if (this.state.allSelected === true) {
      this.state.messages.map(message => message.selected = false)
      this.setState({
        allSelected: false,
        messages: this.state.messages,
        someSelected: false
      })
    } else if (this.state.allSelected === false) {
      this.state.messages.map(message => message.selected = true)
      this.setState({
        allSelected: true,
        messages: this.state.messages,
        someSelected: true
      })
    }
  }

  markAsRead = (value) => {
    if (value === 'read') {
      const readAndSelected = this.state.messages.filter(message => message.read === false && message.selected === true)
      readAndSelected.forEach(message => message.read = true)
      this.setState({
        messages: this.state.messages
      })
    } else if (value === 'unread') {
      const readAndSelected = this.state.messages.filter(message => message.read === true && message.selected === true)
      readAndSelected.forEach(message => message.read = false)
      this.setState({
        messages: this.state.messages
      })
    }
  }

  delete = () => {
    const selected = this.state.messages.filter(message => !message.selected)
    this.setState({
      messages: selected,
      someSelected: false
    })
  }

  unreadCount = () => {
    const unreadMessages = this.state.messages.filter(message => message.read === false)
    return unreadMessages.length
  }

  changeLabel = (e, value) => {
    if (e.target.value === 'Apply label') {

    } else if (value === 'apply') {
      const selectedMessages = this.state.messages.filter(message => message.selected)
      const unlabeledMessages = selectedMessages.filter(message => !message.labels.includes(e.target.value))
      unlabeledMessages.map(message => message.labels.push(e.target.value))
      this.setState({
        messages: this.state.messages
      })
    } else if (value === 'remove') {
      const selectedMessages2 = this.state.messages.filter(message => message.selected)
      const labeledMessages = selectedMessages2.filter(message => message.labels.includes(e.target.value))
      labeledMessages.map(message => message.labels.splice(message.labels.indexOf(e.target.value),1))
      this.setState({
        messages: this.state.messages
      })
    }
  }

  render() {
    return (
      <div className="App container">
        <Toolbar
          bulkSelect={this.bulkSelect}
          allSelected={this.state.allSelected}
          someSelected={this.state.someSelected}
          markAsRead={this.markAsRead}
          delete={this.delete}
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
