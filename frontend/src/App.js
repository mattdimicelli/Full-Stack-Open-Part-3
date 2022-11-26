import { useState, useEffect } from 'react';
import directoryService from './services/directory.js';
import PhoneDirectory from './components/PhoneDirectory';
import Search from './components/Search';
import Notification from './components/Notification';

const App = () => {
  const [ entries, setEntries ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');
  const [ message, setMessage ] = useState({ text: '', success: true });

  useEffect(() => {
    directoryService.getAllEntries()
    .then(setEntries);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const duplicateEntry = entries.find(entry => entry.name === newName);
    if (duplicateEntry) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new
      one?`)) {
        directoryService.updateEntry({ ...duplicateEntry, number: newNumber })
        .then(updatedEntry => setEntries(entries.map(entry => entry.id !== updatedEntry.id ? entry:  updatedEntry)))
        .catch(err => {
          if (err.response.status === 404) {
            setMessage({ text: `${newName}'s information has already been removed from the server`, success: false });
          }
        });
        setMessage({text: `${newName}'s phone number updated`, success: false });
        setTimeout(() => setMessage({ text: '', success: true }), 5000);
        setNewName('');
        setNewNumber('');
        return;
      }
      return;
    }
    
    directoryService.newEntry({ name: newName, number: newNumber })
    .then(entry => setEntries(entries.concat(entry)));
    setMessage({ text: `${newName} successfully added`, success: true });
    setTimeout(() => setMessage({ text: '', success: true }), 5000);
    setNewName('');
    setNewNumber('');
  }

  const handleChangeName = e => { setNewName(e.currentTarget.value); };
  const handleChangeNumber = e => { setNewNumber(e.currentTarget.value); };
  const handleChangeSearch = e => { setNewSearch(e.currentTarget.value); };
  const handleDelete = (id) => {
    if (window.confirm('Delete this entry?')) {
      directoryService.deleteEntry(id)
      .then(entry => { 
        setEntries(entries.filter(entry => entry.id !== id));
        setMessage({ text: 'Entry deleted successfully', success: true });
        setTimeout(() => setMessage({ text: '', success: true }), 5000);
      })
      .catch(err => {
        console.error(err);
        setMessage({ text: `Error deleting entry`, success: false });
        setTimeout(() => setMessage({ text: '', success: true }), 5000);
      });
    };
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search newSearchHandler={handleChangeSearch} newSearchValue={newSearch} />
      <h3>Add Entry</h3>
      <form onSubmit={handleSubmit}>
        <label>Enter name: <input onChange={handleChangeName} value={newName} /> </label>
        <div><label>Enter number: <input onChange={handleChangeNumber} value={newNumber} /> </label> </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Results</h2>
      <PhoneDirectory entries={entries} newSearch={newSearch} handleDelete={handleDelete} />
    </div>
  )
}

export default App


