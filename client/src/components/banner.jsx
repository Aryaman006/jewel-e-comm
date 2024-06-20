import React from 'react';

const Banners = ({images}) => {
    
    return (
        <section className="relative flex items-center justify-center bg-cover bg-center h-96" style={{ backgroundImage: 'url(/images/banner.jpg)', marginBottom:"5rem" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <img src={images} alt="" style={{zIndex:'0'}}/>
        </section>
    );
};

export default Banners;
