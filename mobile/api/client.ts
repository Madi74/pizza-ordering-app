import axios from "axios";

export const client = axios.create({
    baseURL: 'https://homework-72-f3f29-default-rtdb.europe-west1.firebasedatabase.app/'
});
