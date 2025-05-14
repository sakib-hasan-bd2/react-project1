import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  let [arr, setarr] = useState([]);
  let [task, settask] = useState('');
  let [error, seterror] = useState('');
  let [isEdit, setisEdit] = useState(false);
  let [editindex, seteditindex] = useState('');

  let handelTask = e => {
    settask(e.target.value);
    seterror('');
  };

  let handelSubmit = () => {
    if (task == '') {
      seterror('please enter a task');
    } else {
      let newarr = [...arr];
      newarr.push(task);
      setarr(newarr);
      settask('');
    }
  };

  let handelEdit = (item, index) => {
    settask(item);
    setisEdit(true);
    seteditindex(index);
  };

  let handelupdate = () => {
    if (task == '') {
      seterror('please enter a task');
    } else {
      let newarr = [...arr];
      newarr[editindex] = task;
      setarr(newarr);
      settask('');
      setisEdit(false);
    }
  };

  let handelDelete = index => {
    let newarr = [...arr];
    newarr.splice(index, 1);
    setarr(newarr);
  };

  return (
    <>
      <input onChange={handelTask} value={task} type="text" />
      {isEdit ? (
        <button onClick={handelupdate}>update</button>
      ) : (
        <button onClick={handelSubmit}>submit</button>
      )}
      <br />
      {error && <small>{error}</small>}
      <ul>
        {arr.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handelEdit(item, index)}>Edit</button>
            <button onClick={() => handelDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
