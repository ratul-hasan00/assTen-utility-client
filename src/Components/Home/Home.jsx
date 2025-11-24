import React from 'react';
import Banner from '../HomeDetails/Banner';
import Category from '../HomeDetails/Category';
import StatsSection from '../HomeDetails/StatsSection';
import HowItWorks from '../HomeDetails/HowItWorks';
import Recent from '../HomeDetails/Recent';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Recent></Recent>
            <StatsSection></StatsSection>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;