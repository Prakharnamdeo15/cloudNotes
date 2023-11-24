import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            // console.log(localStorage.getItem('token'))
            props.showAlert("Logged in successfully ", "success")
            navigate("/")

        }
        else{
            props.showAlert("enter valid credentials ", "danger")

        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className="container form">
            <h2>Login to proceed to CloudNotes</h2></div>
        <div className='container form'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>
        </>
    )
}

export default Login