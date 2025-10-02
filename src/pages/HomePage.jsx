import React from 'react';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';

import Footer from '../components/Footer';

import SectionHeader from '../components/SectionHeader';

function HomePage() {
   
    return (
            <div className="min-h-screen ">
                <NavBar />
                <Hero />
                <main className="container mx-auto flex px-4 py-6 gap-6 flex-wrap">
                    <SectionHeader />
                    
                    <SectionHeader />
                    <SectionHeader />
                </main>
            </div>
    );
}

export default HomePage;