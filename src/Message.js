import React, { Component } from 'react'
import { Button, Modal,} from 'react-bootstrap'

class Message extends Component {

  constructor(props, context) {
    super(props, context);

    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const {
      message: {
        id,
        subject,
        body,
        read,
        starred,
        selected,
        labels
      },
      clickStar,
      checkbox,
      markAsRead
    } = this.props

    return (
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
            <a onClick={() => {this.handleShow(); markAsRead(true, id)}}>
              {subject}
            </a>
          </div>
          <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Subject:
                </Modal.Title>
                <p>{subject}</p>
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
              </Modal.Header>
              <Modal.Body>
                <h4>Message Body:</h4>
                <p>{body}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
    )
  }

}

export default Message
