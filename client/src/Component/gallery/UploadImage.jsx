import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import galleryService from '../../services/galleryService';
import { useDispatch,useSelector } from 'react-redux';

export default function UploadImageDialog({setChange}) {
  const { token, role, user } = useSelector((state) => state.token);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const handleFileSelect = (e) => {
        setFile(e.files && e.files[0]);
    };

    const handleUpload = async () => {
    if (file && title) {
        const formData = new FormData();
        formData.append('image', file); 
        formData.append('title', title);
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