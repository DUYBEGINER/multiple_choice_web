import React from 'react';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import {AuthContext} from '../context/AuthProvider';

import Footer from '../components/Footer';



function HomePage() {
    const {loading} = React.useContext(AuthContext);

    React.useEffect(() => {
       console.log("Loading state: ", loading);
    }, [loading]);

    return (
            <div>
                <NavBar />
                <Hero />
            </div>
    );
}

export default HomePage;