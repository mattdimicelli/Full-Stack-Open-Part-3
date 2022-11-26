import Entry from './Entry';

const PhoneDirectory = ({ entries, newSearch, handleDelete }) => {
    const filtered = entries.filter(entry => entry.name.toLowerCase().includes(newSearch.toLowerCase()));
    const rows = filtered.map(entry => ( <Entry key={entry.id} name={entry.name} number={entry.number} entryId={entry.id} handleDelete={handleDelete} /> ))
    return (
      <table>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  };

export default PhoneDirectory;