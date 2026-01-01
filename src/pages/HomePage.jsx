import React, {useContext} from 'react';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';

import {AuthContext} from '../context/AuthContext';

function HomePage() {
    const { user } = useContext(AuthContext);
    return (
            <div className="min-h-screen flex flex-col">
                <NavBar user={user} />
                <Hero />
                <main className="container mx-auto flex px-4 py-6 gap-6 flex-wrap">
                    <SectionHeader />
                    <div className="h-[500px]"></div>
                </main>
                <p>HAPPY NEW YEAR</p>
                <Footer />
            </div>
    );
}

export default HomePage;