import React, { Component, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Navbar from '../components/Navbar';

var res_id = null;

export function GetId() {
    const params = useParams();
    res_id = params.id;
}
class EditRestaurant extends Component {
    state = {
        name: "",
        address: "",
        phone: "",
        description: "",
        image: "",
        imgSrc: "",
        oldImgSrc: "",
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleImage(files) {
        this.setState({
            oldImgSrc: this.state.image,
            image: files[0],
        })
        //access img
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

    async componentDidMount() {
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-restaurant/${res_id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    this.setState({
                        name: res.data.restaurant.name,
                        address: res.data.restaurant.address,
                        phone: res.data.restaurant.phone,
                        description: res.data.restaurant.description,
                        image: res.data.restaurant.image,
                        imgSrc: `http://127.0.0.1:8000/uploads/${this.state.image}`,
                    });
                }
                else if (res.data.status === 404) {
                    swal({
                        title: "Warning!",
                        text: res.data.message,
                        icon: "warning",
                        button: "OK",
                    });
                }
            })
            .catch((e) => {
                console.error("Failure", e);
            });
    }

    updateRestaurant = async (e) => {
        e.preventDefault();

        document.getElementById('updatebtn').disabled = true;
        document.getElementById('updatebtn').innerText = "Updating";

        const data = new FormData();
        data.append('name', this.state.name);
        data.append('address', this.state.address);
        data.append('phone', this.state.phone);
        data.append('description', this.state.description);
        data.append('image', this.state.image);
        data.append('oldImgSrc', this.state.oldImgSrc);
        data.append("_method", 'PUT');
        const res = await axios.post(`http://127.0.0.1:8000/api/update-restaurant/${res_id}`, data)
            .then((res) => {
                if (res.data.status === 200) {
                    swal({
                        title: "Success!",
                        text: res.data.message,
                        icon: "success",
                        button: "OK",
                    });
                    document.getElementById('updatebtn').disabled = false;
                    document.getElementById('updatebtn').innerText = "Update";
                }
                else if (res.data.status === 404) {
                    document.getElementById('updatebtn').disabled = false;
                    document.getElementById('updatebtn').innerText = "Update";
                    swal({
                        title: "Warning!",
                        text: res.data.message,
                        icon: "warning",
                        button: "OK",
                    });
                }
                else {
                    document.getElementById('updatebtn').disabled = false;
                    document.getElementById('updatebtn').innerText = "Update";
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
                                    <h4>Edit Restaurant
                                    <Link to={'/data'} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-end">Back</Link>
                                    </h4>
                                </div>
                                <div className='card-body'>
                                    <GetId />
                                    <form onSubmit={this.updateRestaurant}>
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
                                            <button id="updatebtn" type="submit" className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Update Restaurant</button>
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

export default EditRestaurant;