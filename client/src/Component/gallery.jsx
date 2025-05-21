import React from 'react';
import { useLocation } from 'react-router-dom';

const Gallery = () => {
  const location = useLocation();
  const {type } = location.state || {};
  return (
    <div>
      <h1>{type}</h1>
      <h1>Gallery</h1>
      <p>Welcome To Gallery</p>
    </div>
  );
};

export default Gallery;