import React from "react";
import { Link } from 'react-router-dom';

export default function Section(props) {
    return (
        <section>
            <div class="m-3 lg:flex lg:flex-wrap w-70">
                <div class="p-4 ">
                    <div class="bg-white rounded-lg shadow-md">
                        <div style={{
                            height: '300',

                        }}>
                            <img src={props.img} class="rounded-t-lg w-100 h-20 object-cover" />
                        </div>
                        <div class="p-8 ">
                            <h2 class="text-2xl font-bold text-gray-800">{props.name}</h2>
                            <div class="flex justify-between">
                                {/* <span class="inline-flex text-gray-500"><svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>Jon doe</span> */}
                            </div>
                            <p className="mt-2 text-justify text-gray-600 overflow-hidden h-24 ">
                                {props.description}
                            </p>
                            <div class="flex items-center mt-4">
                                <Link
                                    to={`restaurant-info/${props.id}`}
                                    class="inline-flex items-center px-4 py-2 text-indigo-800 bg-indigo-200 cursor-pointer md:mb-2 lg:mb-0">Read
                                    More
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-1" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}