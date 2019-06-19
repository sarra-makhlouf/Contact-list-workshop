import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

class ContactCard extends Component {
  render() {
    const { contact, getPerson } = this.props;
    return (
      <div className="contact-card">
        <p className="card-title">{contact.name}</p>
        <div className="card-text">
          <h4>
            <FontAwesomeIcon icon={faMobileAlt} /> Phone:
          </h4>
          <p>{contact.phone}</p>
          <h4>
            <FontAwesomeIcon icon={faEnvelope} /> Email:
          </h4>
          <p>{contact.email}</p>
        </div>
        <div className="buttons">
          <Link to="/edit-contact">
            <input
              type="button"
              value="Edit"
              className="edit-button"
              onClick={() => getPerson(contact, true)}
            />
          </Link>
          <input type="button" value="Delete" className="edit-button" />
        </div>
      </div>
    );
  }
}
export default ContactCard;
