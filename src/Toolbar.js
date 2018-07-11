import React, { Component } from 'react'

class Toolbar extends Component {
  render () {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadCount()}</span>
            unread messages
          </p>

          <button onClick={this.props.bulkSelect} className="btn btn-default">
            <i className={`${this.props.someSelected && !this.props.allSelected ? 'fa fa-minus-square-o' : this.props.allSelected ? 'fa fa-check-square-o' : 'fa fa-square-o'}`}></i>
          </button>

          <button onClick={() => this.props.markAsRead(true)} className="btn btn-default" disabled={this.props.someSelected ? '' : 'disabled'}>
            Mark As Read
          </button>

          <button onClick={() => this.props.markAsRead(false)} className="btn btn-default" disabled={this.props.someSelected ? '' : 'disabled'}>
            Mark As Unread
          </button>

          <select onChange={(e) => this.props.changeLabel(e, 'apply')} className="form-control label-select" disabled={this.props.someSelected ? '' : 'disabled'}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select onChange={(e) => this.props.changeLabel(e, 'remove')} className="form-control label-select" disabled={this.props.someSelected ? '' : 'disabled'}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={this.props.delete} className="btn btn-default" disabled={this.props.someSelected ? '' : 'disabled'}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar
