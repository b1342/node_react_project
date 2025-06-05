import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import usersService from '../services/userServices'
import { useSelector } from 'react-redux';
import Participants_planservices from '../services/participants_planServices';

const Participants_plan = ({type, id, setChange}) => {
    const { token,role,user } = useSelector((state) => state.token);
    const [participant, setParticipant] = useState([]);
    const[changes,setChanges]=useState(false)
    


    const getParticipantsData = async(type) => {
        role === 'student' ?
        await Participants_planservices.getAllByStudentId(user._id, token).then((data) => {
            setParticipant(data);
        })
        : type === 'plan' ? 
        await Participants_planservices.getAllByPlanId(id, token).then((data) => {
            setParticipant(data);
        })
        : await Participants_planservices.getAllByStudentId(id, token).then((data) => {
            setParticipant(data);
        });
    }

    useEffect(() => {
        getParticipantsData(type);
    }, []);

    useEffect(() => {
        getParticipantsData(type);
    }, [changes]);

    const deleteUser = async (_id) => {
    await Participants_planservices.deleteParticipant(_id, token)
    setChanges(prev => !prev); 
    setChange(prev => !prev);
};
    const deleteu=(rowData)=>{
        return (
            console.log(user),
            <Button label="מחק" icon="pi pi-trash" className="p-button-danger" onClick={() => deleteUser(rowData._id)} />
        )
}

const updateUpScore = async (_id) => {

    console.log(_id);
    await Participants_planservices.updateUpScore({_id}, token)
    setChanges(prev => !prev);
}

const update = (rowData) => {
    return (<>{console.log(rowData._id)}
        <Button label="הוסף נקודות" icon="pi pi-plus" className="p-button-success" onClick={() => {updateUpScore(rowData._id)}} />
      </>  
    );
}

const updatedownScore = async (_id) => {

    console.log(_id);
    await Participants_planservices.updateDownScore({_id}, token)
    setChanges(prev => !prev);
}

const updatedown =  (rowData) => {
   return (
    <Button label="הורד נקודות" icon="pi pi-minus" className="p-button-warning" onClick={()=>{updatedownScore(rowData._id)}} />
    )}


    const participantTable = (part) => {
        console.log(part)
        return (
            <DataTable value={part} tableStyle={{ minWidth: '50rem' }}>
                <Column field="userName" header="שם פרטי"></Column>
                <Column field="planName" header="שם המבצע"></Column>
                <Column field="score" header="מספר נקודות"></Column>
                {role !== 'student' ? <Column header="הוסף נקודות" body={update}></Column> : <></>}
                 {role !== 'student' ? <Column header="הורד נקודות" body={updatedown}></Column> : <></>}
                <Column header="הסרה מהמבצע" body={deleteu}></Column>
            </DataTable>
        )
    }

    return (
        <div>

            {participantTable(participant)}
        </div>
    );
};

export default Participants_plan;