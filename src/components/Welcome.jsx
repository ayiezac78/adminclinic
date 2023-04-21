import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome back {name}</h1>
          <p className="py-6">To view who's patient is pending the appointment.</p>
          <Link to="/dashboard" className="btn btn-primary">View Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome