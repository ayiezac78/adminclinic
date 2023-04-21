import React from 'react'
import {BsFillCalendar2CheckFill} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'
import { Link } from 'react-router-dom'


const Nav = (props) => {

  //logout function
  const logout = () => {
    localStorage.clear();
    props.setUser(null);
  }
  //variables that hold the data
  let buttons, profile;
  if(localStorage.getItem('token')){
    //change the content of the buttons
    buttons = (
      <div>
        <Link to="/login" onClick={logout}>Logout</Link>
      </div>
    );
    profile = (
      <div>
        <ul className='flex'>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    );
  }else{
    buttons = (
      <div>
        <Link to="/login">Login</Link>
      </div>
    );
  }
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost normal-case text-xl">AWR cLinic</Link>
    {/* <Link to="/" className="btn btn-ghost normal-case text-xl">Home</Link> */}
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
        <Link>
        {profile}
        </Link>
      <li>{buttons}</li>
    </ul>
  </div>
</div>
  );
}

export default Nav