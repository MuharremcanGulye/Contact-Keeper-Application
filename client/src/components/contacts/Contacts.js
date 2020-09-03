import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  const { contacts, filtered, getContacts, loading } = contactContext;

  if (contacts.lenght === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contacts;
