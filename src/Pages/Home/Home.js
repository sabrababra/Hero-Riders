import React from 'react';
import About from './About';
import Address from './Address';
import Banner from './Banner';
import OurServices from './OurServices';

const Home = () => {
    return (
        <div>
            <Banner
                title='Rider or Learner'
                text='Take your time to learn the basics, practice regularly, and seek guidance from a professional instructor to build confidence and skills for safe and responsible driving.'
                buttonName='Find out more'
                height='min-h-screen'
            />
            <Address />
            <About />
            <Banner
                title='Driving Lesson Learner'
                text='Always wear appropriate safety gear and follow traffic rules to ensure a safe and enjoyable ride.'
                buttonName='Ask a Question'
                height='h-[400px]'
            />

            <OurServices />
        </div>
    );
};

export default Home;