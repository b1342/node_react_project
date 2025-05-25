import React, { useState } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { useSelector } from 'react-redux';
import galleryService from '../../services/galleryService';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
export default function UpdateStatus({ image ,setChanges}) {
  const { token } = useSelector((state) => state.token);
    const [change, setChange] = useState('');
  const items = [
    { label: 'מהזמן האחרון', value: 'from_the_last_time' },
    { label: 'סיומים', value: 'syumim' },
    { label: 'טיולים', value: 'trips' },
    { label: 'יום בישיבה', value: 'day_in_yeshiva' },
  ];

  const changeStatus = () => {
    console.log('Changing status to:', change);
    galleryService.changeImageStatus(image._id, change, token);
    setChanges((prev) => !prev);
    setChange('')
  };

   return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Dropdown
        value={change}
        options={items}
        onChange={(e) => setChange(e.value)}
        placeholder="בחר סטטוס"
        style={{ minWidth: 120, fontSize: '0.85rem' }}
      />
      <Button
        label="שנה סטטוס"
        icon="pi pi-plus"
        onClick={changeStatus}
        disabled={!change}
        style={{ fontSize: '0.85rem', height: 32, padding: '2px 8px' }}
        className="footer-button"
      />
    </div>
  );
}
