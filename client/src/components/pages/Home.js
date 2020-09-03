import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
//We call authContext here because we want to load user even if we wanna refresh the page
//The page refreshes but after component loads we load user again.
const Home = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  useEffect(() => {
    authContext.loadUser();
    contactContext.getContacts();
    //eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
