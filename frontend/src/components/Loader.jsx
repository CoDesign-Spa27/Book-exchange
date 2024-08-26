// components/Loader.js
import React from 'react';
import Lottie from 'react-lottie-player';
import loader from '../assets/Loader.json'
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
           <Lottie
      loop
      animationData={loader}
      play
      style={{ width: 120, height: 120 }}
    />
       
    </div>
  );
};

export default Loader;
