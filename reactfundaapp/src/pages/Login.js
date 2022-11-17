import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

function Login() {

    const navigate = useNavigate();
    
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('email', loginInput.email);
        data.append('password', loginInput.password);
        // const data = {
        //     email: loginInput.email,
        //     password: loginInput.password,
        // }
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.post(`http://127.0.0.1:8000/api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
                else if (res.data.status === 401) {
                    setLogin({ ...loginInput, error_list: '', });
                    swal("Warning", res.data.message, "warning");
                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <>
            <div className="container py-10">
                <div className="row justify-content-center d-flex">
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className="card-header">
                                <h4 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>Login
                                    <Link to={'/'} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-end">Back</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={loginSubmit}>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <div className="my-1 flex rounded-md shadow-sm">
                                                <input
                                                    name="email"
                                                    onChange={handleInput}
                                                    value={loginInput.email}
                                                    type="email"
                                                    className="form-control focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                />
                                            </div>
                                                <span className='text-sm font-medium text-danger'>{loginInput.error_list.email}</span>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    name="password"
                                                    onChange={handleInput}
                                                    value={loginInput.password}
                                                    type="password"
                                                    className="form-control focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                />
                                            </div>
                                                <span className='text-sm font-medium text-danger'>{loginInput.error_list.password}</span>
                                            <div className='form-group '>
                                                <button type="submit" className='inline-flex justify-center py-2 px-4 border border-transparent 
                                                shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3 float-end'>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
