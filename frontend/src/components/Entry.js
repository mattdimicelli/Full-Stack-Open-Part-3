const Entry = ({name, number, entryId, handleDelete}) => {
    return (
      <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={() => handleDelete(entryId)}>Delete</button></td>
      </tr>
    );
}

export default Entry;