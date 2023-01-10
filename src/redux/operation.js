
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const isDublicate = ({ name, phone }, contacts) => {
    const normalizedName = name.toLowerCase();
    const normalizedPhone = phone.toLowerCase();

    const result = contacts.find((item) => {
        return (normalizedName === item.name.toLowerCase() && item.phone.toLowerCase() === normalizedPhone);
    });
    return Boolean(result);
};



const instance = axios.create({
    baseURL: "https://63bc69c2fa38d30d85c755c1.mockapi.io",
});

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const { data } = await instance.get("/contacts");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const addContact = createAsyncThunk(
    "contacts/add",
    async (contact, thunkAPI) => {
        try {
            const response = await instance.post(
                "/contacts", contact);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
    {
        condition: (data, { getState }) => {
            const { contacts } = getState();
            if (isDublicate(data, contacts.items)) {
                const mesage = alert(`${data.name}  is already in contacts.`);
                return mesage(data);
            }
        }
    },
);

export const deleteContact = createAsyncThunk(
    "contacts/delete",
    async (contactID, thunkAPI) => {
        try {
            const response = await instance.delete(
                `/contacts/${contactID}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
