import { Component } from "react";
import ContactList from "./components/ContactList/ContactList";
import shortid from "shortid";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import s from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    let duplicate = this.state.contacts.find(
      (contact) => contact.name === name
    );

    if (duplicate) {
      alert("Такой контакт уже существует!");
    } else {
      const contact = {
        name,
        number,
        id: shortid.generate(),
      };

      this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const VisibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1 className={s}>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2 className={s}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={VisibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
