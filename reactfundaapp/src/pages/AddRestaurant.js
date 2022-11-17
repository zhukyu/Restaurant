import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import swal from 'sweetalert';

class AddRestaurant extends Component {
    state = {
        name: "",
        address: "",
        phone: "",
        description: "",
        image: "",
        error_list: [],
    }

    handleInput = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleImage(files) {
        this.setState({
            image: files[0],
        })
        // access img
        this.src = files[0].path;
        var file = files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result],
            })
        }.bind(this);
    }
    saveRestaurant = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('address', this.state.address);
        data.append('phone', this.state.phone);
        data.append('description', this.state.description);
        data.append('image', this.state.image);

        const res = await axios.post('http://127.0.0.1:8000/api/add-restaurant', data)
            .then((res) => {

                if (res.data.status === 200) {
                    swal({
                        title: "Success!",
                        text: res.data.message,
                        icon: "success",
                        button: "OK",
                    });
                    document.getElementById('image').value = '';
                    this.setState({
                        name: '',
                        address: '',
                        phone: '',
                        description: '',
                        image: '',
                        imgSrc: '',
                        error_list: [],
                    });
                }
                else {
                    this.setState({
                        error_list: res.data.validate_err,
                    });
                }
            })
            .catch((e) => {
                console.error("Failure", e);
            });
    }

    render() {
        return (
            <>
                <Navbar cur={1} />
                <div className="container py-10">
                    <div className="row justify-content-center d-flex">
                        <div className='col-md-8'>
                            <div className='card'>
                                <div className="card-header">
                                    <h4 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>Add Restaurant
                                        <Link to={'/data'} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-end">Back</Link>
                                    </h4>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={this.saveRestaurant}>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Restaurant Name
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        name="name"
                                                        onChange={this.handleInput}
                                                        value={this.state.name}
                                                        type="text"
                                                        className="form-control focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    />
                                                </div>
                                                <span className='text-sm font-medium text-danger'>{this.state.error_list.name}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Address
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        name="address"
                                                        onChange={this.handleInput}
                                                        value={this.state.address}
                                                        type="text"
                                                        className="form-control focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    />
                                                </div>
                                                <span className='text-sm font-medium text-danger'>{this.state.error_list.address}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        name="phone"
                                                        onChange={this.handleInput}
                                                        value={this.state.phone}
                                                        type="text"
                                                        className="form-control focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    />
                                                </div>
                                                <span className='text-sm font-medium text-danger'>{this.state.error_list.phone}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    name="description"
                                                    onChange={this.handleInput}
                                                    value={this.state.description}
                                                    rows={3}
                                                    className="form-control shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <span className='text-sm font-medium text-danger'>{this.state.error_list.description}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Image
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={(e) => this.handleImage(e.target.files)}
                                                        type='file'
                                                        id='image'
                                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                        placeholder="www.example.com"
                                                    />
                                                </div>
                                                <span className='text-sm font-medium text-danger'>{this.state.error_list.image}</span>
                                            </div>
                                        </div>
                                        <div className='form-group my-3'>
                                            <img src={this.state.imgSrc} id="loadedImg" className="img-fluid img-bordered" width="200px" />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <button type="submit" className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Save Restaurant</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AddRestaurant;