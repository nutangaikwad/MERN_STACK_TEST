import React,{useState} from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
const ChangePassword = ({data,getUserInfo}) => {
  const[error,setError] = useState(false)
    const [values, setValues] = useState({  
     new_password:'',
     confirm_password:"",
     id:data?.id
      })
    const handleInput = (event) => {
      setError(false)
        setValues(prev => ({...prev, [event.target.name] :  [event.target.value]}))
    }
    const handleSubmit = () => {
      if(values?.new_password[0] !== values?.confirm_password[0]){
        setError(true)
        return
      }
      
      axios.post('http://localhost:8081/change/password', values)
      .then(res => {
        alert("Password Updated SuccessFully")
          if(res.data.Status === "Success") {
            console.log("Succeded");
          } else {
            console.log("Failed");
          }
      })
      .catch(err => console.log(err));
    }
    
  return (
    <div>
        <div className="container">
      <div className="row profile">
          <div className="profile-content">
            <h3 className='p-2 text-success mt-5'>Change Password</h3>
            <div className='container col-md-12 p-2'>
                <div className='card mb-4'>
                    <div className='card-body'>
                        <div className='col-md-12 p-3'>
                            <div className="form-group mb-3">
                                <p >New Password</p>
                                <input type="password" className='form-control' name='new_password' onChange={handleInput}  required/>
                            </div>
                            <div className="form-group mb-3">
                                <p>Confirm Password</p>
                                <input type="password" className='form-control' name='confirm_password'  onChange={handleInput}  required/>
                               {error ? <span style={{color:'red',fontSize:"13px"}}>Password should be same</span> :""}

                            </div>
                            <Button type="submit" className='col-md-4 bg-primary' onClick={handleSubmit}>
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChangePassword
