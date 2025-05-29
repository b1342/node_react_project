import React, { useState, useEffect } from 'react';
import planServices from '../services/planServices';
import PlanCard from './plan/planCard';
import { useSelector } from 'react-redux';
import AddPlan from './plan/addPlan';


const Plan = () => {
    const { token,role } = useSelector((state) => state.token);
    const [plans, setPlans] = useState([]);
    const [change, setChange] = useState(false);

    const getPlansData = async () => {
        const plansData = await planServices.getAllPlans(token);
        setPlans(plansData);
    };

    useEffect(() => {
        getPlansData();
    }, [change]);

    return (
      <>
      {role!=="student" && <AddPlan setChange={setChange}/>}
      
        <div className="plans-grid">
            {plans.map((plan) => (<PlanCard plan={plan} setChange={setChange}/>))}
        </div></>
    );
};

export default Plan;