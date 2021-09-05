import { useState, useEffect } from "react";
import ContactList from "./components/ContactList/ContactList";
import shortid from "shortid";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import s from "./App.module.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    let duplicate = contacts.find((contact) => contact.name === name);

    if (duplicate) {
      alert("Такой контакт уже существует!");
    } else {
      const contact = {
        name,
        number,
        id: shortid.generate(),
      };

      setContacts((prevState) => [contact, ...prevState]);
    }
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <>
      <h1 className={s}>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2 className={s}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </>
  );
}
