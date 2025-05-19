import { useState } from 'react';
import './App.css';

function App() {
  let [arr, setarr] = useState([]);
  let [task, setTask] = useState('');
  let [error, seterror] = useState('');
  let [isEdit, setisEdit] = useState(false);
  let [editindex, seteditindex] = useState(null);

  
  let handelTask = e => {
    setTask(e.target.value);
    seterror('');
  };

  
  let handelSubmit = () => {
    if (task === '') {
      seterror('Please enter a task');
    } else {
      let newarr = [...arr];
      newarr.push({ text: task, completed: false }); 
      setarr(newarr);
      setTask('');
    }
  };

  
  let handelEdit = (item, index) => {
    setTask(item.text);
    setisEdit(true);
    seteditindex(index);
  };

  
  let handelupdate = () => {
    if (task === '') {
      seterror('Please enter a task');
    } else {
      let newarr = [...arr];
      newarr[editindex] = { ...newarr[editindex], text: task };
      setarr(newarr);
      setTask('');
      setisEdit(false);
    }
  };

  
  let handelDelete = index => {
    let newarr = [...arr];
    newarr.splice(index, 1);

    if (editindex === index) {
      setisEdit(false);
      setTask('');
      seteditindex(null);
    } else if (editindex > index) {
      seteditindex(editindex - 1);
    }

    setarr(newarr);
  };

  
  let toggleComplete = index => {
    let newarr = [...arr];
    newarr[index].completed = !newarr[index].completed; 
    setarr(newarr);
  };

  return (
    <>
      <input className='input-task'
        value={task}
        onChange={handelTask}
        type="text"
        placeholder="Enter task"
      />
      {isEdit ? (
        <button onClick={handelupdate}>Update</button>
      ) : (
        <button onClick={handelSubmit}>Submit</button>
      )}
      <br />
      {error && <small style={{ color: 'red' }}>{error}</small>}

      <ul>
        {arr.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(index)}
            />
            <span
              style={{
                textDecoration: item.completed ? 'line-through' : 'none',
              }}
            >
              {item.text}
            </span>
            <button className='edit-button' onClick={() => handelEdit(item, index)}>Edit</button>
            <button onClick={() => handelDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
