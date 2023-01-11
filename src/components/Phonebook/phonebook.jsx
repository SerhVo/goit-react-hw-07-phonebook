
import { nanoid } from 'nanoid';
import style from 'components/Phonebook/phonebook.module.css'
import { useState } from 'react';
import { addContact } from 'redux/operation';
import { useDispatch } from 'react-redux';
import { Notify } from 'notiflix';


function Phonebook() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();

    const nameId = nanoid();
    const numberId = nanoid();

    const handleChange = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setPhone(value);
                break;

            default:
                return;
        }
    }

    const onAddContact = (contact) => {
        const action = addContact(contact);
        Notify.success('Contact added successfully!')
        dispatch(action);
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddContact({ name, phone });
        setName("");
        setPhone("");
    }



    return (
        <div className={style.box}>
            <h1>Phonebook</h1>
            <form onSubmit={handleSubmit}>
                Name
                <div>

                    <label htmlFor={nameId}></label>
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        id={nameId}
                        onChange={handleChange}
                    />
                </div>
                Number
                <div>
                    <label htmlFor={numberId}></label>
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={phone}
                        id={numberId}
                        onChange={handleChange}
                    /></div>
                <button type="submit">Add contact</button>
            </form>
        </div>
    )

}
export default Phonebook;