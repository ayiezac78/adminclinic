import {useState} from 'react'

const Dashboard = () => {
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">AWR cLinic</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Patient's Appointments</a></li>
      <li><a>Item 3</a></li>
      <li tabIndex={0}>
        <a>
          Settings
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-base-100">
          <li><a>Edit Profile</a></li>
          <li><a>Logout</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
  )
}

export default Dashboard