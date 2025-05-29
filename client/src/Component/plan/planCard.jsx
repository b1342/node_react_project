import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import planServices from '../../services/planServices';
import participantServices from '../../services/participants_planServices';
import { useSelector } from 'react-redux';
import UpdatePlan from './updatePlan';
const PlanCard=({plan ,setChange}) =>{
    

 const { token,role ,user} = useSelector((state) => state.token);
    const deletep = async() => {
        console.log(plan);
        
            console.log(plan);
            if (!window.confirm("האם אתה בטוח שברצונך למחוק את התכנית?")) {
                return;
            }
           
                await planServices.deletePlan(plan._id,token);
                window.location.reload();
     }
     const joinme=async()=>{
        try {
        await participantServices.createParticipant({userId:user._id, planId:plan._id},token)
        setChange(prev => !prev);
        }
        catch (error) {
            console.error("Error joining plan:", error);
            if (error.response && error.response.status === 402)
            alert("אי אפשר להצטרף יותר מפעם אחת!");
        }
     }

    const footer = (
        <>
        {role!=="student" ?(<><UpdatePlan plan={plan} setChange={setChange}/>
        <Button label="מחיקה " severity="danger" icon="pi pi-trash" style={{ marginLeft: '0.5em' }} onClick={deletep}/></>)
        
            :(<Button label="הצטרפות" severity="success" icon="pi pi-check" style={{ marginLeft: '0.5em' }} onClick={joinme}/>) 
            }
           
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title={`${plan.name} :שם המבצע`} footer={footer} className="md:w-25rem">
                <p className="m-0">
                    {`${plan.description} :תאור המבצע  `}
                </p>
                <h3>{`מספר משתתפים:${plan.number_of_particpants}`}</h3>
            </Card>
        </div>
    )
}
export default PlanCard