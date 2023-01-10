import { nanoid } from '@reduxjs/toolkit';
import style from 'components/Filter/filter.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from 'redux/filtersSlice';
import { selectFilter } from 'redux/selectors';


export function FilterContacts() {

    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    const filterId = nanoid();

    const handleChange = (e) => {
        const { value } = e.target;
        dispatch(setFilter(value));
    }

    return (
        <div className={style.box} >
            <p> Find contacts by name</p>
            <label htmlFor={filterId}>
                <input type="text" name="filter" onChange={handleChange} value={filter} />
            </label>
        </div >
    )
};

