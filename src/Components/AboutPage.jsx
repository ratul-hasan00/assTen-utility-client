import React from "react";
import aboutImage from '../assets/logo (2).png'; // Add a relevant image in your assets

const AboutPage = () => {
return ( <div className="min-h-screen bg-base-200 dark:bg-base-300 py-10 px-4">
{/* Hero Section */} <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-16"> <div className="md:w-1/2"> <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">
About BillHub </h1> <p className="text-base-content dark:text-base-100 text-lg mb-4">
BillHub is your all-in-one Utility Bill Management System. We help users track, manage, and pay their bills like Electricity, Gas, Water, and Internet securely and efficiently. Our goal is to simplify your life and ensure you never miss a payment. </p> <p className="text-base-content dark:text-base-100 text-lg">
With BillHub, you can view your current and past bills, get PDF reports, and pay current month bills with ease. We focus on security, usability, and responsive design for all devices. </p> </div> <div className="md:w-1/2 flex justify-center"> <img  
         src={aboutImage}  
         alt="About BillHub"  
         className="rounded-2xl shadow-lg w-full max-w-md object-cover"  
       /> </div> </section>


  {/* Features Section */}  
  <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">  
    <div className="bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-transform">  
      <h2 className="text-2xl font-bold mb-2 text-pink-500">Track Bills</h2>  
      <p className="text-base-content dark:text-base-100">View and manage all your utility bills in one place, with instant updates.</p>  
    </div>  
    <div className="bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-transform">  
      <h2 className="text-2xl font-bold mb-2 text-pink-500">Pay Safely</h2>  
      <p className="text-base-content dark:text-base-100">Pay current month bills securely using our streamlined payment system.</p>  
    </div>  
    <div className="bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-transform">  
      <h2 className="text-2xl font-bold mb-2 text-pink-500">Reports & History</h2>  
      <p className="text-base-content dark:text-base-100">Download PDF reports for all paid bills and track your monthly expenses easily.</p>  
    </div>  
  </section>  

  {/* Team / Extra Info Section */}  
  <section className="max-w-7xl mx-auto text-center">  
    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 text-transparent bg-clip-text">Our Mission</h2>  
    <p className="text-base-content dark:text-base-100 mb-6 text-lg">  
      At BillHub, we aim to provide a seamless and efficient utility bill management experience for everyone. Our responsive design ensures usability on any device, from mobile phones to desktops.  
    </p>  
    <p className="text-base-content dark:text-base-100 text-lg">  
      Whether you are an individual or a household, BillHub helps you stay on top of your payments, saves time, and avoids late fees.  
    </p>  
  </section>  
</div>  


);
};

export default AboutPage;
