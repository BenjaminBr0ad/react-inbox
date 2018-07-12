import React from 'react'

const Toolbar = ({bulkSelect, allSelected, someSelected, markAsRead, deleteMessage, unreadCount, changeLabel, toggleCompose}) => (

  <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{unreadCount()}</span>
        unread messages
      </p>

      <a onClick={toggleCompose} className="btn btn-danger">
        <i className="fa fa-plus"></i>
      </a>

      <button
        onClick={bulkSelect}
        className="btn btn-default"
      >
        <i className={`${someSelected() && !allSelected() ? 'fa fa-minus-square-o' : allSelected() ? 'fa fa-check-square-o' : 'fa fa-square-o'}`}></i>
      </button>

      <button
        onClick={() => markAsRead(true)}
        className="btn btn-default"
        disabled={someSelected() ? '' : 'disabled'}
      >
        Mark As Read
      </button>

      <button
        onClick={() => markAsRead(false)}
        className="btn btn-default"
        disabled={someSelected() ? '' : 'disabled'}
      >
        Mark As Unread
      </button>

      <select
        onChange={(e) => {changeLabel(e, 'apply'); e.target.selectedIndex = 0}}
        className="form-control label-select"
        disabled={someSelected() ? '' : 'disabled'}
      >
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select
        onChange={(e) => {changeLabel(e, 'remove'); e.target.selectedIndex = 0}}
        className="form-control label-select"
        disabled={someSelected() ? '' : 'disabled'}
      >
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button
        onClick={deleteMessage}
        className="btn btn-default"
        disabled={someSelected() ? '' : 'disabled'}
      >
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>

)

export default Toolbar
