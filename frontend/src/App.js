import React,{useState,useEffect} from 'react'
import './App.css'
import { Routes, Route , useNavigate} from 'react-router-dom'
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile'
import Register from './Components/Register/Register'
import UpdateProfile from './Components/UpdateProfile'
import axios from 'axios'
import Layout from './Layout'
import ChangePassword from './Components/ChangePassword'
import ProtectedRoute from "./Routes";

const App = () => {
  const navigate = useNavigate()
  const [isloggedIn,setIsLoggedIn] = useState(false)
  const checkIfLoggedIn = async () => {
   let value = localStorage.getItem("data")
   debugger
    if (value && value !="undefined") {
      setIsLoggedIn(true)
      navigate("/profile");
    }
  };
  const [data, setData] = useState();

  useEffect(() => {
    checkIfLoggedIn();
  }, [data]);

  const getUserInfo = (userID) => {
    let id 
    if(userID){
      id = userID
    }else {
     id = JSON.parse(localStorage.getItem("id"))
    }
    axios.get(`http://localhost:8081/get/user/${id}`)
    .then(res => {
      setData(res.data[0]);
      localStorage.setItem("data",JSON.stringify(res.data[0]))
    })
    .catch(err => console.log(err));
  }
  useEffect(() => {
    getUserInfo()
    },[]);
  return (
    <>
    <Routes>
    <Route element={<ProtectedRoute isAllowed={isloggedIn} />}>
    <Route element={<Layout  data={data}/>}>
     <Route key="profile" path='/profile' element={<Profile data={data} />} />
       <Route key="update-profile" path='/update-profile' element={<UpdateProfile data={data} getUserInfo={getUserInfo} />} />
       <Route key="change-password" path='/change-password' element={<ChangePassword data={data} getUserInfo={getUserInfo} />} />
       </Route>
      </Route>
      <Route key="register" path='/' element={<Register />} />
       <Route key="login" path='/login' element={<Login  getUserInfo={getUserInfo}/>} />
    </Routes>
    
</>

  )
}

export default App
