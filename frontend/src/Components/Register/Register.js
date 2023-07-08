import React from 'react'
import Button from 'react-bootstrap/Button'
import styles from './register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

const Register = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .required('Required'),
        gender: Yup.string()
            .required('Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "too short")
            .max(10, "too long")
            .required("Required"),
        password: Yup.string()
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            gender: '',
            status: 'pending',
            password: '',
            email: '',
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            console.log(values)
            handleSubmit(values)
            alert(JSON.stringify(values, null, 2));
        },
    });

    const navigate = useNavigate();
 
    const handleSubmit = (values) => {
        axios.post('http://localhost:8081/signup', values)
            .then(res => {
                console.log(res);
                navigate('/login');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <div className='container col-md-4 p-2 mt-4'>
                <div className='card border shadow p-2 mb-4'>
                    <div className='card-body'>
                        <div className='col-md-12 p-3'>
                            <form action='' onSubmit={formik.handleSubmit}>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className='form-control'
                                        name="name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        onBlur={formik.handleBlur}

                                        placeholder="Name" />
                                    {formik.errors.name && formik.touched.name ? (
                                        <div className={styles['error_message']}>{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        className='form-control'
                                        name='email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                        placeholder="Email" />
                                    {formik.errors.email && formik.touched.email ? (
                                        <div className={styles['error_message']}>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='phone'
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                        onBlur={formik.handleBlur}
                                        placeholder="Mobile"  />
                                    {formik.errors.phone && formik.touched.phone ? (
                                        <div className={styles['error_message']}>{formik.errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-3">
                                    <p className={styles['label-text']}>Gender</p>
                                    <input
                                        type="radio"
                                        className="me-2 ms-2"
                                        value="Female"
                                        name="gender"
                                        onChange={formik.handleChange}
                                        defaultChecked={formik.values.gender === "Female"}
                                    />
                                    <label for="Female">Female</label>
                                    <input
                                        type="radio"
                                        id="Male"
                                        className="me-2 ms-2"
                                        value="male" name="gender"
                                        onChange={formik.handleChange}
                                        defaultChecked={formik.values.gender === "male"}
                                    />
                                    <label for="Male">Male</label>
                                    <input type="radio"
                                        id="Other"
                                        className="me-2 ms-2"
                                        value="other" name="gender"
                                        onChange={formik.handleChange}
                                        defaultChecked={formik.values.gender === "male"}
                                    />
                                    <label for="Other">Other</label>
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        className='form-control'
                                        name='password'
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                        placeholder="Password" />
                                         {formik.errors.password && formik.touched.password ? (
                                        <div className={styles['error_message']}>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <Button type="submit" className='col-md-12 bg-success'>
                                    Register
                                </Button>
                                <p className='mt-2'>Already have an account <Link to='/login'>Login Here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register