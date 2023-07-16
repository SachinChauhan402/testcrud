import React, { useState, useEffect } from 'react';
import "../css/Dashboard.css";
import { useNavigate, useLocation } from 'react-router-dom';


const Edit = ({ props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const user = location.state?.user || {};

//   myFunction()
console.log(props)


  const navigate = useNavigate();

  useEffect(() => {
    setName(user.name || '');
    setEmail(user.email || '');
  }, [user.name, user.email]);

  const saveUserDetails = () => {
    if (name && email) {
      if (email.includes("@")) {
        const updatedUser = {
        //   ...editUser,
          name: name,
          email: email
        };
            // console.log(editUser)
            // console.log(first)
        // updateUser(updatedUser)
       
      } else {
        setErrorMessage("Please enter a valid email");
      }
      
    } else {
      setErrorMessage('Please enter both name and email');
    }
    
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className='dashboard'>
      <h2>Edit User Details</h2>
      <form>
        <label>
          Name
          <input className='inputone' type="text" value={name} onChange={handleNameChange} onKeyDown={handleKeyPress} placeholder='Please enter your name' />
        </label>
        <label>
          Email
          <input className='inputtwo' type="email" value={email} onChange={handleEmailChange} placeholder='Please enter your email' />
        </label>
        <button className='btn' type="button" onClick={saveUserDetails}>
          Update User
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Edit;
