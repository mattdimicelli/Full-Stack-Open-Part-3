const Notification = ({ message }) => {
    const { success, text } = message;
    let style = { 
      background: 'lightgrey', 
      fontSize: 20, 
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
    if (!success) {
      style.color = 'red';
    } 
    else if (success) {
      style.color = 'green';
    }
  
  
    return text === '' ? null : <div style={style}>{text}</div>;
  } 

export default Notification;