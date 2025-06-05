import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Achievement from '../../routes/achievement'; // ודא נתיב נכון
import AddAchievement from '../achievement/addAchievement'; // ודא נתיב נכון

const StudentAchievementDialog = ({ userId }) => {
    const [visible, setVisible] = useState(false);
    const [change, setChange] = useState(false);

    const dialogFooter = (
        <Button label="סגור" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
    );

    return (
        <>
            <Button label="הצג הישגים" icon="pi pi-star" className="p-button-warning" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
                modal
                footer={dialogFooter}
            >
                <AddAchievement userId={userId} setChange={setChange}/>
                {userId ? (
                    <Achievement userId={userId} change={change} setChange={setChange}/>
                ) : (
                    <p>לא נבחר משתמש להצגת הישגים.</p>
                )}
            </Dialog>
        </>
    );
}

export default StudentAchievementDialog;