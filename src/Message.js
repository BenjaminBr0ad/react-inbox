import React from 'react'

const Message = ({id, subject, read, starred, selected, labels, clickStar, checkbox}) => (

  <div className={`row message ${read ? 'read' : 'unread'} ${selected ? 'selected' : ''}`}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox"
            onChange={() => checkbox(id)}
            checked={`${selected ? 'checked' : ''}`}
          />
        </div>
        <div className="col-xs-2">
          <i
            onClick={() => clickStar(id)}
            className={`star fa ${starred ? 'fa-star' : 'fa-star-o'}`}>
          </i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      {labels.map((label, i) => {
        return (
          <span
            key={i}
            className="label label-warning"
          >
            {label}
          </span>
        )
      })}
      <a href="#">
        {subject}
      </a>
    </div>
  </div>

)

export default Message
