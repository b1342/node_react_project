import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import achievementServices from '../../services/achievementServices';

const AddAchievement = ({ userId ,setChange}) => {
  const { token } = useSelector((state) => state.token);

  const [visible, setVisible] = useState(false);
  const [achievement, setAchievement] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setAchievement('');
    setDate(null);
    setError(null);
  };

  const handleAddAchievement = async () => {
    if (!achievement.trim()) {
      setError("תיאור הישג הוא שדה חובה.");
      return;
    }

    if (!userId || !token) {
      setError("חסרים פרטי משתמש או טוקן.");
      return;
    }

    setLoading(true);
    setError(null);

    // try {
      await achievementServices.createAchivement({
    userId,
    achievement,
    date: date,
}, token);
      setChange(prev => !prev); 
      console.log(`setChange `);
      resetForm();
      setVisible(false);
    setLoading(false);
  };

  return (
    <>
      <Button label="הוסף הישג" icon="pi pi-plus" onClick={() => setVisible(true)} />

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
            <Button label="הוסף" icon="pi pi-check" onClick={handleAddAchievement} loading={loading} />
          </div>
        }
      >
        <div className="field">
          <label htmlFor="achievement">תיאור הישג</label>
          <InputText
            id="achievement"
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            required
            autoFocus
            className="p-inputtext-sm"
          />
        </div>

        <div className="field mt-3">
          <label htmlFor="date">תאריך (אופציונלי)</label>
          <Calendar
            id="date"
            value={date}
            onChange={(e) => setDate(e.value)}
            showIcon
            dateFormat="dd/mm/yy"
            placeholder="בחר תאריך"
            className="p-inputtext-sm"
          />
        </div>

        {error && <small style={{ color: 'red' }}>{error}</small>}
      </Dialog>
    </>
  );
};

export default AddAchievement;
