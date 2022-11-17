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

    componentDidMount() {
        const res = axios.get(`http://127.0.0.1:8000/api/edit-restaurant/${res_id}`)
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
        console.log(res.data);
    }

    render() {
        return (
            <div>
                <GetId />
                <Navbar cur={1} />
                <div className="container">
                    
                    <div className="shadow-xl backdrop-blur-sm m-20 rounded-lg border-2 border-blue-50">
                        <div className="grid grid-flow-row grid-cols-3 gap-5 ">
                            <img src={this.state.imgSrc} className="rounded-lg p-2 h-80 w-100 object-cover" alt="" loading="lazy" />
                            <div className="col-span-2 mr-10">
                                <div className="flex">
                                    <h1 className='py-3 text-4xl font-bold leading-tight'>{this.state.name}</h1>
                                </div>
                                <div className="flex">
                                    <img src="https://icon-library.com/images/address-icon-png/address-icon-png-5.jpg"
                                        className='h-4 w-auto align-middle mt-1' />
                                    <p className='align-middle mx-1'>{this.state.address}</p>
                                </div>
                                <div className="flex">
                                    <img src="http://cdn.onlinewebfonts.com/svg/img_322946.png"
                                        className='h-4 w-auto align-middle mt-1' />
                                    <p className='align-middle mx-1'>{this.state.phone}</p>
                                </div>
                                <hr className="my-2" />
                                <div>
                                    <p className=''>
                                        {this.state.description}
                                    </p>
                                    <Link to={'/'} class="mt-2 mr-2 inline-block px-2 py-2 border-2 border-blue-600 text-blue-600 
                                    font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 
                                    focus:outline-none focus:ring-0 transition duration-150 ease-in-out float-end">
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditRestaurant;