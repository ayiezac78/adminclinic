import axios from 'axios';
import React, {useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs';


const Login = (props) => {
//set state of variables using usestate hooks
const [state, setState] = useState({
  email: '',
  password: '',
  message: '',
  loggedIn: false,
  navigate: useNavigate(),
  showPassword: false
})

const  handleSubmit = (e) => {
  e.preventDefault();
  const data = {
    email: state.email,
    password: state.password
  }
  axios.post('/login', data)
  .then(res => {
    // console.log(res);
    //store token in local storage
    localStorage.setItem('token', res.data.token);
    //set state of loggedIn to true
    setState({...state, loggedIn: true});
    //passed the response data user to props for header
    props.setUser(res.data.user);
    setState({...state, navigate: useNavigate()});
  })
  .catch(err => {
    // console.log(err);
    setState({...state, message: err.response.data.message});
    document.getElementById('submitForm').reset();
  })
}

//show error message for frontend
let err_message = "";
if (state.message) {
  err_message = (
    <div className="alert alert-error shadow-lg mb-2">
      <div>
        <span>{state.message}</span>
      </div>
    </div>
  );
}

if (state.loggedIn) {
  return state.navigate('/welcome');
}

if(localStorage.getItem('token')) {
  return <Navigate replace to="/welcome" />
}

const handleShowPassword = () => {
  setState({...state, showPassword: !state.showPassword});
};

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 text-warning">
              Note: If you forgot your email or password, please contact the IT administrator.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            id="submitForm"
            className="max-w-sm mx-auto my-8 bg-gray-500 rounded-lg shadow-md p-6"
          >
            {err_message}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                for="email"
              >
                Email
              </label>
              <input
                className="input input-bordered w-full"
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                required
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 font-medium mb-2"
                for="password"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  className="input input-bordered w-full pr-10"
                  id="password"
                  name="password"
                  type={state.showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-1/20 right-0 pr-3 flex items-center"
                  onClick={() =>
                    setState({ ...state, showPassword: !state.showPassword })
                  }
                >
                  {state.showPassword ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </button>
              </div>
            </div>
            <button className="btn btn-primary w-full" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login