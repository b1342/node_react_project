import React, { useState,useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import planServices from '../../services/planServices';

const UpdatePlan = ({plan,setChange}) => {
  const { token } = useSelector((state) => state.token);

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(plan.name);
  const [description, setDescription] = useState(plan.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setName('');
    setDescription('');
    setError(null);
  };
  useEffect(() => {
    if (visible) {
      setName(plan.name);
      setDescription(plan.description);
      setError(null);
    }
  }, [visible, plan]);
  const handleUpdatePlan = async () => {
    if (!name.trim()|| !description.trim()) {
      setError("שם המבצע ותאור המבצע הם שדות חובה.");
      return;
    }
    setLoading(true);
    setError(null);

    await planServices.updatePlan({
     _id: plan._id,
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
      <Button label="עדכון" icon="pi pi-pencil" onClick={() => setVisible(true)} />
{console.log(plan)}
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
            <Button label="עדכן" icon="pi pi-check" onClick={handleUpdatePlan} loading={loading} />
          </div>
        }
      >
        <div className="field">
          <label htmlFor="name">שם המבצע </label>
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
          <label htmlFor="description">תאור המבצע </label>
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

export default UpdatePlan;
