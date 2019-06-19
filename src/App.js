import React, { Component } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import ContactCard from './contactCard';
import AddContact from './addContact';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      contactlist: [],
      id: '',
      edit: false
    };
  }

  componentDidMount = () => {
    this.getContacts();
  };

  getContacts = () => {
    axios.get('/contacts').then(res =>
      this.setState({
        contactlist: res.data
      })
    );
  };
  addContact = () => {
    axios
      .post('/add-contact', {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(this.getContacts);
    this.add();
  };

  editContact = () => {
    axios
      .put('/modify-contact/' + this.state.id, {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      })
      .then(this.getContacts);
    this.add();
  };
  add = () => {
    this.setState({
      edit: false,
      name: '',
      phone: '',
      email: ''
    });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getPerson = (contact, edit) => {
    this.setState({
      id: contact._id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      edit
    });
  };
  render() {
    return (
      <div className="App">
        <div>
          <h1>My Contacts</h1>
          <Link to="/contact-list">
            <button className="button" onClick={this.add}>
              Contact List
            </button>
          </Link>
          <Link to="/new-contact">
            <button className="button" onClick={this.add}>
              Add Contact
            </button>
          </Link>
        </div>
        <Route
          path="/contact-list"
          render={() => (
            <div className="contact-list">
              {this.state.contactlist.map(el => (
                <ContactCard contact={el} getPerson={this.getPerson} />
              ))}
            </div>
          )}
        />
        <Route
          path="/(new-contact|edit-contact)/"
          render={() => (
            <AddContact
              handleChange={this.handleChange}
              action={this.state.edit ? this.editContact : this.addContact}
              edit={this.state.edit}
              contact={this.state}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
