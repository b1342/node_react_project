import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import UpdateAchievement from '../Component/achievement/updateAchievement ';

export default function Achievement({ userId = '', change, setChange }) {
  const { token, role, user } = useSelector((state) => state.token);
  const [products, setProducts] = useState([]);

  const id = role === 'student' ? user._id : userId;

  const columns = [
    { field: 'userId.name', header: 'שם' },
    { field: 'userId.phone', header: 'פלאפון' },
    { field: 'achievement', header: '👍 הישג' },
    { field: 'date', header: 'תאריך' },
  ];

  const getAchievements = async () => {
    try {
      const achievements = await axios.get(
        `http://localhost:1111/api/achievements/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(achievements.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  useEffect(() => {
    getAchievements();
  }, []);

  useEffect(() => {
    getAchievements();
  }, [change]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1111/api/achievements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChange((prev) => !prev);
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  const deleteAchievementButton = (rowData) => (
    <Button
      label="מחק"
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={() => handleDelete(rowData._id)}
    />
  );

  const updateAchievementButton = (rowData) => (
    <UpdateAchievement
      achievementt={{
        _id: rowData._id,
        achievement: rowData.achievement,
        date: rowData.date,
      }}
      setChange={setChange}
    />
  );

  // יצירת מערך עמודות כולל עמודות מותנות
  const columnComponents = columns.map((col) => (
    <Column key={col.field} field={col.field} header={col.header} />
  ));

  if (role !== 'student') {
    columnComponents.push(
      <Column key="delete" header="מחיקה" body={deleteAchievementButton} />,
      <Column key="update" header="עדכון" body={updateAchievementButton} />
    );
  }

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
        {columnComponents}
      </DataTable>
    </div>
  );
}
