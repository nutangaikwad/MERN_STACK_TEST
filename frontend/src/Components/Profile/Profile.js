import React from 'react'
import styles from '../Register/register.module.css'
import './profile.css';

const Profile = ({data}) => {
  
  return (
    <>
    <div className="container">
      <div className="row profile">
          <div className="profile-content">
            <h3 className='p-2 text-success mt-5'>Profile</h3>
            <div className='container col-md-12 p-2'>
                <div className='card mb-4'>
                    <div className='card-body'>
                        <div className='col-md-12 p-3'>
                            <div className="form-group mb-3">
                                <p className={styles['label-text']}>First Name</p>
                                <input type="text" className='form-control' name='first_name' value={data?.name}  required/>
                            </div>
                            <div className="form-group mb-3">
                                <p className={styles['label-text']}>Email</p>
                                <input type="email" className='form-control' name='email' value={data?.email} placeholder="Email" required/>
                            </div>
                            <div className="form-group mb-3">
                                <p className={styles['label-text']}>Mobile</p>
                                <input type="text" className='form-control' name='mobile' value={data?.phone} placeholder="Mobile" required/>
                            </div>
                            <div className="form-group mb-3">
                                    <p className={styles['label-text']}>Gender</p>
                                    <input type="radio" className="ms-2 me-2"id="Female" value="Female" name="gender" checked={data?.gender == 'female' ?'checked' :''}/>
                                    <label for="Female">Female</label>
                                    <input type="radio" className="ms-2 me-2" id="Male" value="male" name="gender"  checked={data?.gender == 'male' ?'checked' :''} />
                                    <label for="Male">Male</label>
                                    <input type="radio" className="ms-2 me-2" id="Other" value="other" name="gender" checked={data?.gender == 'other' ?'checked' :''}/>
                                    <label for="Other">Other</label>

                                </div>     
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>










    </>
  )
}

export default Profile