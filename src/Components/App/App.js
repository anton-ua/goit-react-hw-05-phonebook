import React, { Component } from "react";
import styles from "./App.module.css";
import { v4 as uuidv4 } from "uuid";
import AddContact from "../AddContact/AddContact";
import ContactsList from "../Contacts/ContactsList";
import Filter from "../Filter/Filter";
import Alert from "../Alert/Alert";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    isAlert: false,
  };

  componentDidMount = async () => {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
    } else {
      this.setState({
        contacts: [
          { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
          { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
          { id: "id-3", name: "Eden Clements", number: "645-17-79" },
          { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ],
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    const id = uuidv4();
    const contactToAdd = { ...contact, id };

    if (
      this.state.contacts
        .map(({ name }) => name.toLowerCase())
        .includes(contact.name.toLowerCase())
    ) {
      this.setState({ isAlert: true });
      setTimeout(() => {
        this.setState({ isAlert: false });
      }, 3000);
    } else {
      this.setState((state) => ({
        contacts: [contactToAdd, ...state.contacts],
      }));
    }
  };

  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };

  filterValue = (input) => {
    this.setState(() => ({ filter: input }));
  };

  filterContacts = (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter, isAlert } = this.state;

    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={styles.container}>
        <AddContact onAddContact={this.addContact} isAlert={isAlert} />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          filterValue={this.filterValue}
          isFilter={contacts.length >= 2}
        />
        <ContactsList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
          addContact={this.addContact}
        />
        <Alert isAlert={isAlert} />
      </div>
    );
  }
}
