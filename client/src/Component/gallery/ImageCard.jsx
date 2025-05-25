import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useDispatch, useSelector } from 'react-redux';
import galleryService from '../../services/galleryService';
import UpdateStatus from './updateStatus';

export default function ImageCard({ image, setChange }) {
  const { token, role, user } = useSelector((state) => state.token);

  const changePublic = () => {
    galleryService.changeImagePublicStatus(image._id, image.public, token);
    setChange((prev) => !prev);
  };

  const deleteOne = () => {
    galleryService.deleteImageFromGallery(image._id, token);
    setChange((prev) => !prev);
  };

  const header = (
    <div
      style={{
        width: '100%',
        height: '220px',
        overflow: 'hidden',
        borderRadius: '8px',
      }}
      className="image-hover"
    >
      <Image
        src={image.itemImageSrc}
        alt={image.alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
          transition: 'transform 0.2s',
        }}
        preview
      />
    </div>
  );

  const footer = (
    <div style={{ padding: '8px', textAlign: 'center' }}>
      <h2 style={{ margin: '8px 0', fontSize: '1.2rem' }}>{image.title}</h2>
      <div
        className="card-footer-buttons"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          minHeight: '40px',
          flexWrap: 'wrap',
        }}
      >
        <UpdateStatus image={image} setChanges={setChange}/>
        <Button
          label="מחיקה"
          severity="danger"
          icon="pi pi-trash"
          size="small"
          onClick={deleteOne}
          className="footer-button"
        />
        {role === 'manager' && (
          <Button
            label={`public- ${image.public}`}
            severity="secondary"
            icon="pi pi-times"
            size="small"
            onClick={changePublic}
            className="footer-button"
          />
        )}
      </div>
    </div>
  );

  return (
    <Card
      header={header}
      footer={role !== null ? footer : null}
      style={{ margin: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
    />
  );
}
