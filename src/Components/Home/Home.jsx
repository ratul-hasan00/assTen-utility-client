import React from 'react';
import Banner from '../HomeDetails/Banner';
import Category from '../HomeDetails/Category';
import StatsSection from '../HomeDetails/StatsSection';
import HowItWorks from '../HomeDetails/HowItWorks';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <StatsSection></StatsSection>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;