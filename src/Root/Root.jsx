import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer/Footer';
import 'aos/dist/aos.css';
import AOS from 'aos';
import LoadingSpinner from '../Components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';

AOS.init();

const Root = () => {
    const { state } = useNavigation();
    return (

        <div>
            <Navbar></Navbar>
            {state == "loading" ? <LoadingSpinner></LoadingSpinner> : <Outlet></Outlet>}
            <Footer></Footer>
            <Toaster position="top-center"
                reverseOrder={false}></Toaster>
        </div>
    );
};

export default Root;