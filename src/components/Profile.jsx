import React from 'react'
import { Link } from 'react-router-dom';

const Profile = (props) => {
  //create a variables to hold extracted data from props
  let name, email;
  if(props.user){
    name = props.user.name;
    email = props.user.email;
  }
  return (
    <div className="max-w-sm mx-auto my-8 bg-gray-500 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-medium mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" for="name">
          Role: {name}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" for="email">
          Email: {email}
        </label>
      </div>
    </div>
    
  )
}

export default Profile