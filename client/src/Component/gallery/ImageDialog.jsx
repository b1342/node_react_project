import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const statusOptions = [
  { label: 'פעיל', value: 'active' },
  { label: 'לא פעיל', value: 'inactive' },
  { label: 'ממתין', value: 'pending' },
];

const ImageDialog = ({ visible, image, onHide, onDelete, onStatusChange }) => {
  const confirmDelete = () => {
    confirmDialog({
      message: 'האם אתה בטוח שברצונך למחוק את התמונה?',
      header: 'אישור מחיקה',
      acceptLabel: 'מחק',
      rejectLabel: 'ביטול',
      accept: onDelete,
    });
  };

  return (
    <>
      <Dialog visible={visible} onHide={onHide} header={image?.title} style={{ width: '30vw' }}>
        <img src={image?.url} alt="" className="w-full mb-3" />
        <Dropdown
          value={image?.status}
          options={statusOptions}
          onChange={(e) => onStatusChange(e.value)}
          placeholder="בחר סטטוס"
          className="w-full mb-3"
        />
        <Button label="מחק" icon="pi pi-trash" className="p-button-danger" onClick={confirmDelete} />
      </Dialog>
      <ConfirmDialog />
    </>
  );
};

export default ImageDialog;