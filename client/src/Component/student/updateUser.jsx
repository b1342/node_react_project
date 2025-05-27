import React, { useState,useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import usersService from '../../services/userServices'
import { useSelector } from 'react-redux';
import { Toast } from "primereact/toast";
export default function UpdateUserDialog({ user, setChange }) {
    const { token, role } = useSelector((state) => state.token);
const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [fields, setFields] = useState({
        _id: user._id,
        name: user.name,
        identity_number: user.identity_number,
        phone: user.phone,
        address: user.address,
        email: user.email,
        date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : null,
        status: user.status
    });
    const [errors, setErrors] = useState({});

    const statusOptions = [
        { label: "סטודנט", value: "student" },
        { label: "מנהל", value: "manager" },
        { label: "צוות", value: "staff" }
    ];

    // בכל פתיחה של הדיאלוג, עדכן את השדות מהמשתמש
    const openDialog = () => {
        setFields({
            _id: user._id,
            name: user.name,
            identity_number: user.identity_number,
            phone: user.phone,
            address: user.address,
            email: user.email,
            date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : null,
            status: user.status
        });
        setErrors({});
        setVisible(true);
    };

    const validate = () => {
        const errs = {};
        if (!fields.name) errs.name = "יש להזין שם";
        if (!fields.identity_number || !/^\d{9}$/.test(fields.identity_number)) errs.identity_number = "יש להזין תעודת זהות תקינה (9 ספרות)";
        if (!fields.phone || !/^0\d{8,9}$/.test(fields.phone)) errs.phone = "יש להזין טלפון תקין";
        if (!fields.address) errs.address = "יש להזין כתובת";
        if (!fields.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fields.email)) errs.email = "יש להזין מייל תקין";
        if (!fields.date_of_birth) errs.date_of_birth = "יש לבחור תאריך לידה";
        if (!fields.status) errs.status = "יש לבחור סטטוס";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (field, value) => {
        setFields({ ...fields, [field]: value });
        setErrors({ ...errors, [field]: undefined });
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const uuser = await usersService.updateUser(token, fields, role);
                setChange((prev) => !prev);
                setVisible(false);
            } catch (err) {
    toast.current.show({
        severity: 'error',
        summary: 'שגיאה',
        detail: 'קיים כבר משתמש עם ID כזה',
        life: 4000
    });            }
        }
    };

    return (
        <>
        <Toast ref={toast} position="top-center" />
            <Button label="עדכון" onClick={openDialog} />
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                header="עדכון משתמש"
                style={{ width: '95vw', maxWidth: 500 }}
                contentStyle={{ padding: 0 }}
            >
                <div className="flex flex-column gap-3 p-4" style={{ direction: "rtl" }}>
                    <div>
                        <label>שם</label>
                        <InputText
                            value={fields.name}
                            onChange={e => handleChange("name", e.target.value)}
                            className={errors.name ? "p-invalid w-full" : "w-full"}
                        />
                        {errors.name && <small className="p-error">{errors.name}</small>}
                    </div>
                    <div>
                        <label>תעודת זהות</label>
                        <InputText
                            value={fields.identity_number}
                            onChange={e => handleChange("identity_number", e.target.value)}
                            className={errors.identity_number ? "p-invalid w-full" : "w-full"}
                        />
                        {errors.identity_number && <small className="p-error">{errors.identity_number}</small>}
                    </div>
                    <div>
                        <label>טלפון</label>
                        <InputText
                            value={fields.phone}
                            onChange={e => handleChange("phone", e.target.value)}
                            className={errors.phone ? "p-invalid w-full" : "w-full"}
                        />
                        {errors.phone && <small className="p-error">{errors.phone}</small>}
                    </div>
                    <div>
                        <label>כתובת</label>
                        <InputText
                            value={fields.address}
                            onChange={e => handleChange("address", e.target.value)}
                            className={errors.address ? "p-invalid w-full" : "w-full"}
                        />
                        {errors.address && <small className="p-error">{errors.address}</small>}
                    </div>
                    <div>
                        <label>מייל</label>
                        <InputText
                            value={fields.email}
                            onChange={e => handleChange("email", e.target.value)}
                            className={errors.email ? "p-invalid w-full" : "w-full"}
                        />
                        {errors.email && <small className="p-error">{errors.email}</small>}
                    </div>
                    <div>
                        <label>תאריך לידה</label>
                        <Calendar
                            value={fields.date_of_birth}
                            onChange={e => handleChange("date_of_birth", e.value)}
                            className={errors.date_of_birth ? "p-invalid w-full" : "w-full"}
                            dateFormat="dd/mm/yy"
                            showIcon
                            placeholder="בחר תאריך"
                        />
                        {errors.date_of_birth && <small className="p-error">{errors.date_of_birth}</small>}
                    </div>
                    <div>
                        <label>סטטוס</label>
                        <Dropdown
                            value={fields.status}
                            options={statusOptions}
                            onChange={e => handleChange("status", e.value)}
                            placeholder="בחר סטטוס"
                            className={errors.status ? "p-invalid w-full" : "w-full"}
                        />
                        {errors.status && <small className="p-error">{errors.status}</small>}
                    </div>
                    {errors.general && (
                        <div>
                            <small className="p-error">{errors.general}</small>
                        </div>
                    )}
                    <div className="flex gap-2 justify-content-end mt-3">
                        <Button label="שמירה" icon="pi pi-check" onClick={handleSubmit} />
                        <Button label="ביטול" icon="pi pi-times" severity="secondary" onClick={() => setVisible(false)} />
                    </div>
                </div>
            </Dialog>
        </>
    );
}