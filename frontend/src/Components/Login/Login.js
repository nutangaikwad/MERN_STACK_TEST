import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ({ getUserInfo }) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Login) {
                    let id = res?.data?.data[0]?.id
                    localStorage.setItem("id", id)
                    getUserInfo(id)
                    navigate('/profile')
                } else {
                    alert('Incorrect Email or Password!');
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <div className='container col-md-4 p-2 mt-5'>
                <div className='card shadow p-4 mb-4'>
                    <div className='card-body'>
                        <div className='col-md-12 p-1'>
                            <form action='' onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <p className={styles['label-text']}>Email</p>
                                    <input type="email"
                                        name='email'
                                        className='form-control'
                                        onChange={handleInput}
                                        placeholder="Enter Email" required />
                                </div>
                                <div className="form-group mb-3">
                                    <p className={styles['label-text']}>Password</p>
                                    <input type="password"
                                        name='password'
                                        className='form-control'
                                        onChange={handleInput}
                                        placeholder="Password" required />
                                </div>

                                <Button type="submit" className='col-md-6 bg-success'>
                                    Login
                                </Button>
                                <p className='mt-2'>don't have an account <Link to='/'>Register Here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login