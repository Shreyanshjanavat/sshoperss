import React, { useState } from 'react';
import './CSS/Loginsignup.css';

const Loginsinup = () => {
  const [state, setState] = useState("Login");
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: ""
  });

  const changehandler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const Login = async () => {
    console.log("Login data saved", formdata);
    
    let responsedata;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => {
        responsedata = data;
        if (responsedata.success) {
          localStorage.setItem('auth-token', responsedata.token);
          window.location.replace('/');
        }
      });

  };

  const Signup = async () => {
    console.log("Signup data saved", formdata);
    let responsedata;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => {
        responsedata = data;
        if (responsedata.success) {
          localStorage.setItem('auth-token', responsedata.token);
          window.location.replace('/');
        }
      });
  };

  return (
    <div className='loginsinup'>
      <div className="loginsinup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign up" ? <input type='text' value={formdata.username} onChange={changehandler} name="username" placeholder='enter your name' /> : null}
          <input type='email' value={formdata.email} onChange={changehandler} name="email" placeholder='enter your email' />
          <input type='password' value={formdata.password} onChange={changehandler} name="password" placeholder='enter your password' />
        </div>
        <button onClick={() => (state === 'Login' ? Login() : Signup())}>Continue</button>
        {state === "Sign up" ?
          <p className='Loginsignup-login'>Already have an account? <span onClick={() => setState("Login")}>Login here</span></p> :
          <p className='Loginsignup-login'>Create An account <span onClick={() => setState("Sign up")}>click here</span></p>
        }
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='' />
          <p>By continuing I agree to terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Loginsinup;
