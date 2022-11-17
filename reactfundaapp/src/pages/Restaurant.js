import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Section from '../components/Section';

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
        var RestaurantSections = this.state.restaurants.map((item) => {
            return (
                <Section
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    address={item.address}
                    phone={item.phone}
                    description={item.description}
                    img={"http://127.0.0.1:8000/uploads/" + item.image}
                />
            )
        })
        return (
            <>
                <Navbar cur={0} />
                <div
                    style={{
                        backgroundImage: "url(" + "https://www.bombaybrasseriebirmingham.co.uk/wp-content/uploads/2014/05/indian-food-served-on-table.jpg" + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                    className="py-40"
                >
                    <h1 className="mt-10 text-7xl font-bold leading-tight text-white text-center">
                        Restaurant Recommendation
                    </h1>
                    <h2 className="mt-3 mb-10 text-2xl  leading-tight text-white text-center">
                        Place where you can find your favourite restaurant!
                    </h2>
                </div>
                <div>
                    <div
                        // style={{
                        //     backgroundImage: "url(" + "https://img.freepik.com/free-vector/gradient-purple-hexagonal-background_52683-61875.jpg?w=2000" + ")",
                        //     backgroundPosition: 'center',
                        //     backgroundSize: 'cover',
                        //     backgroundRepeat: 'no-repeat'
                        // }}
                        className="grid grid-cols-3 gap-1"
                    >

                        {RestaurantSections}
                    </div>
                </div>
            </>
        );
    }
}


export default Restaurant;