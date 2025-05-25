import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import galleryService from '../services/galleryService';
import { useSelector } from 'react-redux';
import { Galleria } from 'primereact/galleria';
import ImageCard from './gallery/ImageCard';
import UploadImageDialog from './gallery/UploadImage';
const Gallery = () => {
  const { token,role } = useSelector((state) => state.token);
  const location = useLocation();
  const { type } = location.state || {};
  const [images, setImages] = useState([]);
  const[change, setChange] = useState(false);

  useEffect(() => {
    if (type && token) {
      galleryService.getSpecificGallery(type, token).then((data) => {
        console.log("data:", data); 
        const mapped = data.map(img => ({
          ...img,
          itemImageSrc: `http://localhost:1111/${img.image.replaceAll('\\', '/')}`,
          alt: img.filename || ""
        }));
        setImages(mapped);
        console.log("images:", mapped);
      });
    }
    else{
      galleryService.getSpecificPublicGallery(type).then((data) => {
        const mapped = data.map(img => ({
          ...img,
          itemImageSrc: `http://localhost:1111/${img.image.replaceAll('\\', '/')}`,
          alt: img.filename || ""
        }));
        setImages(mapped);
        console.log("images:", mapped);
      });
    }
  }, [type, token, change]);

    return (
      <>
     {role!==null&&<UploadImageDialog setChange={setChange}/> }
    <div className="card flex justify-content-center" style={{ width: '100%' }}>
      
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0px',
          margin: '0 auto',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              flex: '1 1 33%',
              maxWidth: '33.3333%',
              minWidth: '250px',
              boxSizing: 'border-box',
              padding: '8px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ImageCard image={image} setChange={setChange}/>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Gallery;