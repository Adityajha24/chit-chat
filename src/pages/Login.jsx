import React, { useEffect, useState } from 'react';
import loginStyle from '../css/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate()
  const [uemail, setUEmail] = useState('');
  const [upassword, setUPassword] = useState('');
  const [cardShifted, setCardShifted] = useState(false); // new state

  function verifyUser(){
      if(uemail.trim()!='' && upassword.trim()!=''){
          axios.post(`http://localhost:8080/login?email=${uemail}&password=${upassword}`)
          .then((res)=>{
              if(res.data){
                  navigate("/chat", {
                    state:{
                      name: res.data.name,
                      email: res.data.email
                    }
                  })
              }
              else{
                alert("account does not exist or wrong credentials")
              }
          })
      }
      else{
        alert("Please fill the details")
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
    <div id={loginStyle.main}>

      <img
        src="../public/CHIT_CHAT.png"
        alt="Sliding visual"
        className="slide-image"
      />

      <div
        id={loginStyle.card}
        style={{
          transform: cardShifted ? 'translateX(-40px)' : 'translateX(0)',
        }}
      >
        <h1>Login</h1>

        <input
          type="email"
          name="userEmail"
          value={uemail}
          placeholder="Enter User Email."
          onChange={(event) => setUEmail(event.target.value)}
          className={loginStyle.inputField}
        />

        <input
          type="password"
          name="userPassword"
          value={upassword}
          placeholder="Enter User Password"
          onChange={(event) => setUPassword(event.target.value)}
          className={loginStyle.inputField}
        />

        <button onClick={verifyUser} className={loginStyle.button}>Login</button>

        <Link to="/signup" className={loginStyle.linkText}>
          If not a user? Sign up
        </Link>

      </div>
    </div>
  );
}

export default Login;
