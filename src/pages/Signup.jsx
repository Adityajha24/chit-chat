import React, { useEffect, useState } from 'react';
import signStyle from '../css/Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {

  const navigate = useNavigate()

  const [uemail, setUEmail] = useState('');
  const [upassword, setUPassword] = useState('');
  const [name, setName] = useState('');

  const [cardShifted, setCardShifted] = useState(false); // new state

  function createUser() {
      if (name.trim() == '' || uemail.trim() == '' || upassword.trim() == '') {
        alert("Please fill the details")
      }
  
      else {
        axios.post("http://localhost:8080/signup", {
          email: uemail,
          name: name,
          password: upassword
        })
          .then((res) => {
            if (res.data) {
              navigate("/login")
            }
            else {
              alert("Email already registered")
              setUEmail('')
            }
          })
      }
    }
  

  useEffect(() => {
    document.body.classList.add('loaded');
    setCardShifted(true); // triggers form move
    return () => {
      document.body.classList.remove('loaded');
    };
  }, []);

  return (
    <div id={signStyle.main}>

      <img
        src="../public/CHIT_CHAT.png"
        alt="Sliding visual"
        className="slide-image"
      />

      <div
        id={signStyle.card}
        style={{
          transform: cardShifted ? 'translateX(-40px)' : 'translateX(0)',
        }}
      >
        <h1>Signup</h1>

        <input
          type="text"
          name="userName"
          value={name}
          placeholder="Enter User Name."
          onChange={(event) => setName(event.target.value)}
          className={signStyle.inputField}
        />

        <input
          type="email"
          name="userEmail"
          value={uemail}
          placeholder="Enter User Email."
          onChange={(event) => setUEmail(event.target.value)}
          className={signStyle.inputField}
        />

        <input
          type="password"
          name="userPassword"
          value={upassword}
          placeholder="Enter User Password"
          onChange={(event) => setUPassword(event.target.value)}
          className={signStyle.inputField}
        />

        <button onClick={createUser} className={signStyle.button}>Signup</button>

        <Link to="/signup" className={signStyle.linkText}>
          Already registered? Login
        </Link>

      </div>
    </div>
  );
}

export default Signup;
