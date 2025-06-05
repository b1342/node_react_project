import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import galleryService from '../../services/galleryService';
import { useDispatch,useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
export default function UploadImageDialog({setChange}) {
  const { token, role, user } = useSelector((state) => state.token);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const items = [
    { label: 'מהזמן האחרון', value: 'from_the_last_time' },
    { label: 'סיומים', value: 'syumim' },
    { label: 'טיולים', value: 'trips' },
    { label: 'יום בישיבה', value: 'day_in_yeshiva' },
      ...(role === 'manager'
    ? [
        { label: 'זמני תפילות', value: 'zmaney_tfilot' },
        { label: 'מראי מקומות', value: 'marhey_mekomot' }
      ]
    : [])
    
  ];
    const handleFileSelect = (e) => {
        setFile(e.files && e.files[0]);
    };

    const handleUpload = async () => {
    if (file && title) {
        const formData = new FormData();
        formData.append('image', file); 
        formData.append('title', title);
        status && formData.append('status', status);
        await galleryService.createNewGalleryItem(formData, token);
        setVisible(false);
        setTitle('');
        setFile(null);
        setChange(prev => !prev); 
    }
};

    return (
        <>
            <Button label="הוסף תמונה" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog visible={visible} onHide={() => setVisible(false)} header="העלאת תמונה חדשה" style={{ width: '30vw' }}>
                <div className="flex flex-column gap-3">
                    <InputText
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="כותרת תמונה"
                    />
                    <FileUpload
                        name="image"
                        accept="image/*"
                        maxFileSize={1000000000000000000}
                        customUpload
                        uploadHandler={() => {}}
                        chooseLabel="בחר תמונה"
                        mode="basic"
                        auto={false}
                        onSelect={handleFileSelect}
                        emptyTemplate={<p className="m-0">גרור תמונה לכאן או לחץ לבחירה</p>}
                    />
                          <Dropdown
                            value={status}
                            options={items}
                            onChange={(e) => setStatus(e.value)}
                            placeholder="בחר סטטוס"
                            style={{ minWidth: 120, fontSize: '0.85rem' }}
                        />
                    <Button
                        label="העלה"
                        icon="pi pi-upload"
                        onClick={handleUpload}
                        disabled={!title || !file}
                    />
                </div>
            </Dialog>
        </>
    );
}