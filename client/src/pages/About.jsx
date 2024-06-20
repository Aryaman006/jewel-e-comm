import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-10" style={{marginTop:'50px'}}>
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8" style={{color:'brown'}}>About Horcrux</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden" style={{maxWidth:'1100px'}}>
        <div className="md:flex" style={{marginTop:'50px', padding:'20px'}}>
          <div className="md:w-full px-6 py-8">
            <p className="text-gray-600 mb-4">
              At HORCRUX Jewelry, we believe in the timeless elegance of jewelry. 
              Our journey began over two decades ago, fueled by a passion for craftsmanship and a dedication to quality.
              We strive to create pieces that not only dazzle with their beauty but also resonate with personal stories and emotions.
            </p>
            <p className="text-gray-600 mb-4">
              Our collections are inspired by the beauty of nature, the rich heritage of cultures around the world, 
              and the ever-evolving trends in fashion. Each piece is meticulously crafted by skilled artisans, 
              using only the finest materials to ensure exceptional quality and durability.
            </p>
            <p className="text-gray-600">
              Whether you're celebrating a special occasion, expressing your love, or simply treating yourself, 
              we invite you to explore our exquisite collection and find the perfect piece that speaks to you.
              Thank you for choosing HOECRUX Jewelry for your precious moments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
