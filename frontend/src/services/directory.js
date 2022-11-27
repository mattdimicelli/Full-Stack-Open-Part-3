import axios from 'axios';
const URL = '/api/persons';

const getAllEntries = () => {
    return axios.get(URL).then(res=> res.data);
};

const newEntry = (entry) => {
    return axios.post(URL, entry).then(res => res.data);
}

const deleteEntry = id => axios.delete(URL + `/${id}`).then(res => res.data);

const updateEntry = (updatedEntry) => {
    return axios.put(URL + `/${updatedEntry.id}`, updatedEntry)
    .then(res => res.data);
};

export default { getAllEntries, newEntry, deleteEntry, updateEntry };