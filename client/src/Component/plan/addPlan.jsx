import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import planServices from '../../services/planServices';

const AddPlan = ({setChange}) => {
  const { token } = useSelector((state) => state.token);

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setName('');
    setDescription('');
    setError(null);
  };

  const handleAddPlan = async () => {
    if (!name.trim()|| !description.trim()) {
      setError("שם המבצע ותאור המבצע הם שדות חובה.");
      return;
    }
    setLoading(true);
    setError(null);

    await planServices.createPlan({
    name,
   description
}, token);
      setChange(prev => !prev); 
      console.log(`setChange `);
      resetForm();
      setVisible(false);
      setLoading(false);
  };

  return (
    <>
      <Button label="הוסף משימה" icon="pi pi-plus" onClick={() => setVisible(true)} />

      <Dialog
        header="הוספת הישג חדש"
        visible={visible}
        style={{ width: '30vw' }}
        modal
        className="p-fluid"
        onHide={() => {
          resetForm();
          setVisible(false);
        }}
        footer={
          <div>
            <Button label="ביטול" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" disabled={loading} />
            <Button label="הוסף" icon="pi pi-check" onClick={handleAddPlan} loading={loading} />
          </div>
        }
      >
        <div className="field">
          <label htmlFor="achievement">שם המבצע </label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            className="p-inputtext-sm"
          />
        </div>

        <div className="field mt-3">
          <label htmlFor="date">תאור המבצע </label>
          <InputText
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            autoFocus
            className="p-inputtext-sm"
          />
        </div>
        

        {error && <small style={{ color: 'red' }}>{error}</small>}
      </Dialog>
    </>
  );
};

export default AddPlan;
