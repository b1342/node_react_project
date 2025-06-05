import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import usersService from '../services/userServices'
import { useSelector } from 'react-redux';
import UserDialog from '../Component/student/addStudent';
// import StudentAchievementDialog from './student/studentAchievement';
import UpdateUserDialog from '../Component/student/updateUser';
const Staff = ({}) => {
const { token,role } = useSelector((state) => state.token);
    const [students, setStudents] = useState([]);
    const[change,setChange]=useState(false)
     const type='staff'


    const getUsersData = async(type) => {
        const student=await usersService.getUsersByType(type,token)
        setStudents(student);
        console.log(students);  
    }

    useEffect(() => {
        getUsersData(type);
    }, []);

    useEffect(() => {
        getUsersData(type);
    }, [change,setChange]);

    const deleteUser = async (_id) => {
    await usersService.deleteUser(_id, token);
    setChange(prev => !prev); 
};
    const deleteu=(user)=>{
        return (
            console.log(user),
            <Button label="מחק" icon="pi pi-trash" className="p-button-danger" onClick={() => deleteUser(user._id)} />
        )
}
    const plans=()=>{

    }


const update = (rowData) => {
   return <UpdateUserDialog user={rowData} setChange={setChange}/>
}
    const usersTable = (users) => {
        return (
            <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="שם"></Column>
                <Column field="identity_number" header="מספר זהות"></Column>
                <Column field="phone" header="טלפון"></Column>
                <Column field="address" header="כתובת"></Column>
                <Column field="email" header="כתובת מייל"></Column>
                <Column field="date_of_birth" header="תאריך לידה"></Column>
                <Column field="status" header="סטטוס"></Column>
                <Column header="מחיקה" body={deleteu}></Column>
                <Column header="עדכון" body={update}></Column>
            </DataTable>
        )
    }

    return (
        <div>
           {role ==='manager'?<UserDialog setChange={setChange}/>:<></>} 
            {usersTable(students)}
        </div>
    );
};

export default Staff;