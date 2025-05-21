import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';

export default function DynamicColumnsDemo() {

  const { token, role, user } = useSelector((state) => state.token);
    const [products, setProducts] = useState([]);
    const columns = [
      { field: 'userId.name', header: 'שם' },
      { field: 'userId.phone', header: 'פלאפון'},
      { field: 'achievement', header: '👍 הישג ' },
      { field: 'date', header: 'תאריך' }

    ];

    const getAchievements=async ()=>{
      const achievements=await axios.get(`http://localhost:1111/api/achievements/${user._id}`,{headers:{Authorization:`Bearer ${token}`}})
      console.log(achievements.data)
      setProducts(achievements.data)
    }

    useEffect(()=>{
      getAchievements()
    },[])
    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );
}