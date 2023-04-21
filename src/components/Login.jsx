import axios from 'axios';
import React, {useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Login = (props) => {
//set state of variables using usestate hooks
const [state, setState] = useState({
  email: '',
  password: '',
  message: '',
  loggedIn: false,
  navigate: useNavigate()
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
  return (
    <form onSubmit={handleSubmit} id='submitForm' className="max-w-sm mx-auto my-8 bg-gray-500 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-medium mb-4">Login</h2>
      {err_message}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" for="email">
          Email
        </label>
        <input
          className="input input-bordered w-full"
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email"
          required
          onChange={(e) =>setState({...state, email: e.target.value})}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" for="password">
          Password
        </label>
        <input
          className="input input-bordered w-full"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          onChange={(e) =>setState({...state, password: e.target.value})}
        />
      </div>
      {/* <div class="mb-6">
    <label class="inline-flex items-center text-gray-700 font-medium">
      <input class="form-checkbox" type="checkbox" name="remember-me">
      <span class="ml-2">Remember me</span>
    </label>
  </div> */}
      <button className="btn btn-primary w-full" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login




// import React, { useState } from "react";
// import Dashboard from "./Dashboard";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import admin_img from '../assets/images/undraw_thought_process_re_om58.svg'
// import LoadingSpinner from "../components/LoadingSpinner";
// import { useForm } from "react-hook-form";

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const viewPassword = () => {
//     setShowPassword(prevState => !prevState);
//   }

//   const onSubmit = (data) => {
//     setLoading(true);
//     const url = `/receptionist_accounts?email=${data.email_address}&password=${data.password}`;
//     axios.get(url)
//       .then((response) => {
//         const admin = response.data.find((item) => {
//           return item.email_address === data.email_address && item.password === data.password;
//         });
//         if (admin) {
//           localStorage.setItem("token", admin.token);
//           setLoggedIn(true);
//           toast.success('log in');
//           navigate("/dashboard", { state: { adminEmail: data.email_address } });
//         } else {
//           // setLoggedIn(false);
//           errorMessage();
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Error retrieving data");
//         if (err) {
//           setLoggedIn(false); //if admin fails to fetch the data from json db he cannot proceed to admin dashboard
//           navigate("/")
//         }
//       })
//       .finally(() => setLoading(false));
//   };

//   const errorMessage = () => {
//     toast.error('Invalid email or password, Please try again', {
//       position: "top-left",
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   }

//   if (loggedIn) {
//     return <Dashboard/>;
//   }
//   // const formatDate = (date) => {
//   //   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//   // }


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-2">
//         <input
//           type="email"
//           {...register('email_address', { required: true })}
//           placeholder="Email"
//           className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email_address ? 'border-red-500' : ''}`}
//         />
//         {errors.email_address && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
//       </div>
//       <div className="mb-2">
//         <input
//           type={showPassword ? "text" : "password"}
//           {...register('password', { required: true })}
//           placeholder="Password"
//           className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
//         />
//         <label onClick={viewPassword} htmlFor="toggleShowHide" className="text-xs cursor-pointer" >{showPassword ? "Hide Password":"Show Password"}</label>
//         {errors.password && <p className="text-red-500 text-xs mt-1">Password is required.</p>}
//       </div>
//       <button className="w-full bg-[#164B2F] p-2 rounded-full text-[#ECFEF2] hover:opacity-90">{loading ? <LoadingSpinner/> : 'Login'}</button>
//       <ToastContainer limit={1}/>
//     </form>
//   );
// };

// export default Login;
