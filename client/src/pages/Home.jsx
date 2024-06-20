import React from 'react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { NavLink } from 'react-router-dom';
import RingAnimation from '../components/ringAnimation';
import Banners from '../components/banner';
import GenderCategorySection from '../components/categorySection'
import ItemCategorySection from '../components/itemCategory';
import Divider from '../components/divider';
// import Register from './Register';
// import Login from './Login';

function Home() {
  
    const images = ['/banner1.jpg'];
    return (
        <div style={{marginTop:"100px"}}>
        <Banners images={images}/>
        <Divider/>
        <GenderCategorySection/>
        <Divider/>
        <ItemCategorySection/>
        </div>
    );
}

export default Home;