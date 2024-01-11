import React from 'react';
import './CSS/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const history = useNavigate();

  // State variables for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for signup
  const [name, setName] = useState('');

  // Function to handle login form submission
  async function submit(e) {
    e.preventDefault();

    try {
      // Sending a POST request to the server for login
      await axios
        .post('http://localhost:4000/users/', {
          email,
          password,
        })
        .then((res) => {
          if (res.data === 'exist') {
            // If user exists, navigate to welcome page
            history('/welcome', { state: { id: email } })();
          } else if (res.data === 'notexist') {
            // If user does not exist, show an alert
            alert('Please Signup...');
          }
        })
        .catch((e) => {
          alert("Success")
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  // Function to handle signup form submission
  async function submitSignup(e) {
    e.preventDefault();

    try {
      // Sending a POST request to the server for signup
      await axios
        .post('http://localhost:4000/users/signup', {
          name,
          email,
          password,
        })
        .then((res) => {
          if (res.data === 'exist') {
            // If user already exists, show an alert
            alert('User already exists');
          } else if (res.data === 'notexist') {
            // If signup is successful, navigate to welcome page
            history('/welcome', { state: { id: email } })();
          }
        })
        .catch((e) => {
          alert("Success")
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src="images/communication.png" alt="" />
          <div className="text">
            <span className="text-1">Every new friend is a new adventure</span>
            <span className="text-2">Let's get connected </span>
          </div>
        </div>
        <div className="back">
          {/*<img className="backImg" src="images/backImg.jpg" alt="" />*/}
          <div className="text">
            <span className="text-1">Complete miles of journey with one step</span>
            <span className="text-2">Let's get started</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          {/* Login Form */}
          <div className="login-form">
            <div className="title">Login</div>
            <form>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="text">Forgot password?</div>
                <div className="button input-box">
                  <input type="submit" value="Submit" onClick={submit} />
                </div>
                <div className="text sign-up-text">
                  Don't have an account?{' '}
                  <label htmlFor="flip">
                    Signup now
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Signup Form */}
          <div className="signup-form">
            <div className="title">Signup</div>
            <form>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="button input-box">
                  <input type="submit" value="Submit" onClick={submitSignup} />
                </div>
                <div className="text sign-up-text">
                  Already have an account?{' '}
                  <label htmlFor="flip">Login now</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Link to="/">BACK TO HOME</Link>
    </div>
  );
}

export default LoginPage;
