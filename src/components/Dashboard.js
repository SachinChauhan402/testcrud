import React, { useState, useEffect } from 'react';
import "../css/Dashboard.css"
import { useNavigate } from 'react-router-dom';
import Edit from './Edit';

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userList, setUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editUser, setEditUser] = useState(null);

  const editUserDetails = (index) => {
    const userToEdit = userList[index];
    setEditUser({ ...userToEdit, index });
    navigate('/edit', { state: { user: userToEdit } });
    
  };

  console.log(userList)

  useEffect(() => {
    const storedUserList = localStorage.getItem('userList');
    if (storedUserList) {
      setUserList(JSON.parse(storedUserList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList , editUserDetails]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const createUser = () => {
    if (name && email) {
      if (email.includes("@")) {
        const newUser = {
          name: name,
          email: email
        };

        setUserList([...userList, newUser].sort((a, b) => a.name.localeCompare(b.name)));

        setName('');
        setEmail('');
        setErrorMessage('');
      } else {
        setErrorMessage("Please enter a valid email");
      }
    } else {
      setErrorMessage('Please enter both name and email');
    }
  };

  const deleteListUser = (index) => {
    const newListUsers = [...userList];
    newListUsers.splice(index, 1);
    setUserList(newListUsers);
    navigate("/");
  };





  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createUser();
    }
  };

//   const myFunction = () => {
//     console.log("Dashboard")
//   }

  return (
    <div className='dashboard'>
      <h2>Create User</h2>
      <form>
        <label>
          Name
          <input className='inputone' type="text" value={name} onChange={handleNameChange} onKeyDown={handleKeyPress} placeholder='Please enter your name' />
        </label>
        <label>
          Email
          <input className='inputtwo' type="email" value={email} onChange={handleEmailChange} onKeyDown={handleKeyPress} placeholder='Please enter your email' />
        </label>
        <button className='btn' type="button" onClick={createUser}>
          Create User
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <div className="user-list">
        <h2>User List</h2>
        <ol>
          {userList.map((user, index) => (
            <li key={index}>
              <span style={{ marginRight: "5rem" }}>{user.name}</span>
              <span style={{ marginRight: "5rem" }}>{user.email}</span>
              <span className='btns'>
                <button className='btn1' onClick={() => editUserDetails(index)}>Edit</button>
              </span>
              <span className='btndelete'>
                <button className='btn2' onClick={() => deleteListUser(index)}>Delete</button>
              </span>
            </li>
          ))}
        </ol>
      </div>

    
        <Edit userList={userList}   />
  
    </div>
  );
};

export default Dashboard;
