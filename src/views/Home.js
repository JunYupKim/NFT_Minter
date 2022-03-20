import React from 'react';
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Cta from '../components/sections/Cta';
import Inputs from '../components/sections/Inputs'; 
import NFTs from '../components/sections/NFTs'; 

const Home = () => {
  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <Inputs /> 
      <NFTs topDivider/>
      <Cta split />
    </>
  );
}

export default Home;