import React from 'react'
import { Link } from 'react-router-dom'
import { BsCalendar3Week } from 'react-icons/bs';

const Welcome = (props) => {
  let name, email;
  if(props.user){
    name = props.user.name;
    email = props.user.email;
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome {name}!</h1>
          <p className="py-6">To view who's patient is pending for the appointment.</p>
          <Link to="/dashboard" className="btn btn-primary">View Appointment's List <BsCalendar3Week className='h-5 w-5 ml-3'/></Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome