import React,{useState,useEffect} from 'react'
import '../Profile/profile.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avtar from '../../avtar.png'
import DeactiveMessage from '../Modal/DeactiveMessage';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

;
const Sidebar = ({data}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.clear()
    navigate('/login')
  }

  const AccountDeactivate = () => {
    let values = {id:data?.id}
    axios.post('http://localhost:8081/deactivate/profile', values)
      .then(res => {
          if(res.data.Status === "Success") {
            alert("account deactivated")
            handleClose()
            handleLogout()
          } else {
            console.log("Failed");
          }
  })
}


  return (
    <div>
          <div className="profile-sidebar">
            <div className="profile-userpic mt-5 text-center">
            {!data?.profile_pic ? <img src={Avtar} height="150" width="150"/> : <img style={{'borderRadius' : '150px'}} src={`http://localhost:8081/images/`+ data?.profile_pic} height="150" width="150"/> }
            </div>
            <div className="profile-usertitle">
              <div className="profile-usertitle-name">
              </div>
            </div>
            <div className="profile-usermenu">
              <ul className="nav">
                <li className="">
                  <Link to="/profile">
                    <i className="fa fa-user" />
                    Profile </Link>
                </li>
                <OverlayTrigger trigger="click" placement="right" overlay={
                  <Popover id="popover-basic" style={{padding:'10px'}}>
                 <div>{data?.status}</div>
                </Popover>
                }>
  
                <li>
                   <Link> <i className="fa fa-calendar-check" />
                    Status
                    </Link> 
                </li>
                </OverlayTrigger>

                <li>
             
                <Link to='/update-profile' > <i className="fa fa-edit" />
                   Change Profile Picture </Link>
                </li>
                <li>
                 
                <Link to='change-password'  >  <i className="fa fa-key" />
                    Change Password 
                    </Link>
                </li>
                <li onClick={handleLogout}>
                  <Link>  <i className="fa fa-sign-out" />
                    <span > Logout </span></Link>
                </li>
                <li onClick={handleShow}>
                  <Link>  <i className="fa fa-trash" />
                    Delete Account </Link>
                </li>
              </ul>
            </div>
          </div>
          <DeactiveMessage
          AccountDeactivate={AccountDeactivate}
        show={show}
        onHide={handleClose}
      />
      
        </div>
  )
}

export default Sidebar
