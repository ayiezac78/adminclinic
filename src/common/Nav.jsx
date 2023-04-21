import React, {useState} from 'react'
import {BsPersonFillGear, BsCalendar3Week, BsBoxArrowRight, BsBoxArrowLeft} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'
import { Link } from 'react-router-dom'


const Nav = (props) => {
  const [newAppointmentsCount, setNewAppointmentsCount] = useState(0);


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
        <Link className='btn gap-2' to="/login" onClick={logout}>Logout <BsBoxArrowRight className="h-6 w-6"/></Link>
      </div>
    );
    profile = (
      <div>
        <ul className='flex'>
          <div className="tooltip tooltip-left" data-tip="Patient's Appointments Lists">
             <li><Link to="/dashboard"><BsCalendar3Week className='h-6 w-6'/></Link></li>
          </div>
          <div className="tooltip tooltip-left" data-tip="Profile Settings">
            <li>
              <Link to="/profile"><BsPersonFillGear className='h-6 w-6'/></Link>
            </li>
          </div>
        </ul>
      </div>
    );
  }else{
    buttons = (
      <div className='navbar-end flex'>
        <Link className='btn' to="/login">Login <BsBoxArrowLeft className="h-6 w-6 ml-2"/></Link>
      </div>
    );
  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          AWR cLinic
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {profile}
          {buttons}
        </ul>
      </div>
    </div>
  );
}

export default Nav