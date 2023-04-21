import React, {useState, useEffect} from 'react'
import Nav from './Nav';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Protected from './Protected';
import Dashboard from '../components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Welcome from '../components/Welcome';

const Header = () => {
  const [user, setUser] = useState({});

  useEffect(() =>{
    const token = localStorage.getItem('token');

    axios.get('/user', {
      headers: {'Authorization': `Bearer ${token}`}
    })
    .then((res)=>{
      // console.log(res);
      setUser(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <BrowserRouter>
      <div>
        <Nav user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/welcome' element={<Welcome user={user} setUser={setUser}/>}/>
          <Route path='/profile/*' element={
            <Protected>
              <Profile user={user} setUser={setUser}/>
            </Protected>
          }/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default Header