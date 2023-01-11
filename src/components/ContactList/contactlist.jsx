import style from 'components/Filter/filter.module.css'
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filtersSlice';
import { deleteContact, fetchContacts } from 'redux/operation';
import { selectFilteredContacts } from 'redux/selectors';

export default function ContactList() {

    const dispatch = useDispatch();
    const contacts = useSelector(selectFilteredContacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);



    const removeContact = (id) => {
        const action = deleteContact(id);
        dispatch(action);
        Notify.info('Contact deleted!');
        if (contacts.length === 1) {
            dispatch(setFilter(""));
            Notify.warning('No more contacts');
        }
    }



    const elem = contacts.map(({ name, phone, id }) => {
        return <li key={id}> {name} , {phone} <button className={style.btn} onClick={() => removeContact(id)}>delete</button> </li>
    })
    return (
        <div className={style.box}>
            <h2>Contacts</h2>
            <ol>{elem}</ol>

        </div>
    )
}

ContactList.prototype = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,

        })).isRequired

}