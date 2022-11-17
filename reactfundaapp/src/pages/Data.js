import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Navbar from '../components/Navbar';

class Restaurant extends Component {

    state = {
        restaurants: [],
        loading: true,
    }
    async componentDidMount() {

        const res = await axios.get('http://127.0.0.1:8000/api/restaurants');
        if (res.data.status === 200) {
            this.setState({
                restaurants: res.data.restaurants,
                loading: false,
            });
        }
    }

    deleteRestaurant = async (e, id) => {

        const thidClikedFunda = e.currentTarget;
        thidClikedFunda.innerText = "Deleting"
        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-restaurant/${id}`)
            .then((res) => {
                thidClikedFunda.closest("tr").remove();
                swal({
                    title: "Deleted!",
                    text: res.data.message,
                    icon: "success",
                    button: "OK",
                });
            })
            .catch((e) => {
                console.error("Failure", e);
            })
    }

    render() {

        var restaurant_HTMLTABLE = "";
        if (this.state.loading) {
            restaurant_HTMLTABLE = <tr><td colSpan="7"> <h2>Loading...</h2> </td></tr>;
        }
        else {
            restaurant_HTMLTABLE =
                this.state.restaurants.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td className='font-sans text-xl'>{item.id}</td>
                            <td className='font-sans text-xl'>{item.name}</td>
                            <td className='font-sans text-xl'>{item.address}</td>
                            <td className='font-sans text-xl'>{item.phone}</td>
                            <td className='font-sans text-xl'>{item.description}</td>
                            <td><img src={"http://127.0.0.1:8000/uploads/" + item.image} className="img-fluid img-bordered" width="200px" /></td>
                            <td>
                                <Link to={`edit-restaurant/${item.id}`} className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-1 mb-2 dark:focus:ring-yellow-900'>Edit</Link>
                                <Link to={`restaurant-info/${item.id}`} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-1 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Info</Link>
                                <button type="button" onClick={(e) => this.deleteRestaurant(e, item.id)} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-1 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Delete</button>
                            </td>
                        </tr>
                    )
                })
        }

        return (
            <>
                <Navbar cur={1}/>
                <div className="container py-20">

                    <div className="row justify-content-center">
                        <div className='col-md-11'>
                            <div className='card'>
                                <div className="card-header">
                                    <h4 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>Restaurant Data
                                        <Link to={'add-restaurant'} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-end">Add Restaurant</Link>
                                    </h4>
                                </div>
                                <div className='card-body'>
                                    <table className='table table-bordered table-striped'>
                                        <thead>
                                            <tr>
                                                <th className='text-xl'>ID</th>
                                                <th className='text-xl'>Name</th>
                                                <th className='text-xl'>Address</th>
                                                <th className='text-xl'>Phone</th>
                                                <th className='text-xl'>Description</th>
                                                <th className='text-xl col-md-2'>Image</th>
                                                <th className='text-xl col-md-2 w-60'>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {restaurant_HTMLTABLE}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Restaurant;