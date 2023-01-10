import { useSelector } from "react-redux";
import { selectError, selectIsLoading } from "redux/selectors";
import ContactList from "./ContactList/contactlist";
import { FilterContacts } from "./Filter/filter";
import Phonebook from "./Phonebook/phonebook";



export const App = () => {

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        margin: '0 auto',
        paddingLeft: '40px',
        paddingRight: '40px',
        backgroundSize: '20px 20px',
        background: '#d4d5d6 ',
      }}
    >

      <Phonebook />
      <FilterContacts />
      {isLoading && !error && <p style={{ color: "tomato" }}>Loading...</p>}
      <ContactList />
    </div >
  );
};

