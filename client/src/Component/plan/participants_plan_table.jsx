import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Achievement from '../achievement'; 
import AddAchievement from '../achievement/addAchievement'; 
import Participants_plan from '../participants_plan';

const Participants_plan_table = ({type, id,setChange }) => {
    const [visible, setVisible] = useState(false);
   

    const dialogFooter = (
        <Button label="סגור" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
    );

    return (
        <>
{type==="plan"?(<><Button label="הצג משתתפים" icon="pi pi-star" className="p-button-success" onClick={() => setVisible(true)} /></>)
:(<><Button label="הצג מבצעים" icon="pi pi-star" className="p-button-success" onClick={() => setVisible(true)} /></>)}
            
            <Dialog
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
                modal
                footer={dialogFooter}
            >
                <Participants_plan type={type} id={id} setChange={setChange} />
            </Dialog>
        </>
    );
}

export default Participants_plan_table;