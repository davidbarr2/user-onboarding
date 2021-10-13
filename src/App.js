import './App.css';
import Form from './components/Form';
import React, {useState} from 'react';

function App() {

  const [users,setUsers] = useState([])

  return (
    <div className="App">
      <Form users={users} setUsers={setUsers}></Form>
      {
        users && users.map(user => (
          <h2>{user.name}</h2>
        ))
      }
    </div>
  );
}

export default App;
