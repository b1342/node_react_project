import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import usersService from '../../services/userServices'
import { useSelector } from 'react-redux';

export default function UserDialog({setChange}) {
    const { token,role } = useSelector((state) => state.token);

    const [visible, setVisible] = useState(false);
    const [fields, setFields] = useState({
        name: "",
        identity_number: "",
        password: "",
        phone: "",
        address: "",
        email: "",
        date_of_birth: null,
        status: ""
    });
    const [errors, setErrors] = useState({});

 const statusOptions = [
    { label: "סטודנט", value: "student" },
    { label: "מנהל", value: "manager" },
    { label: "צוות", value: "staff" }
];

    const validate = () => {
        const errs = {};
        if (!fields.name) errs.name = "יש להזין שם";
        if (!fields.identity_number || !/^\d{9}$/.test(fields.identity_number)) errs.identity_number = "יש להזין תעודת זהות תקינה (9 ספרות)";
        if (!fields.password || fields.password.length < 6) errs.password = "סיסמה חייבת להכיל לפחות 6 תווים";
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

    const handleSubmit = async() => {
        if (validate()) {
            console.log("Submitting user data:", fields);
           const user= await usersService.createUser(token,fields,role)
           setChange((prev) => !prev);
           console.log(user)
            setVisible(false);
            setFields({
                name: "",
                identity_number: "",
                password: "",
                phone: "",
                address: "",
                email: "",
                date_of_birth: null,
                status: ""
            });
            setErrors({});
        }
    };

    return (
        <>
            <Button label="הוסף משתמש" onClick={() => setVisible(true)} />
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                header="הוספת משתמש חדש"
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
                        <label>סיסמה</label>
                        <InputText
                            type="password"
                            value={fields.password}
                            onChange={e => handleChange("password", e.target.value)}
                            className={errors.password ? "p-invalid w-full" : "w-full"}
                        />
                        {errors.password && <small className="p-error">{errors.password}</small>}
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
                    <div className="flex gap-2 justify-content-end mt-3">
                        <Button label="שמירה" icon="pi pi-check" onClick={handleSubmit} />
                        <Button label="ביטול" icon="pi pi-times" severity="secondary" onClick={() => setVisible(false)} />
                    </div>
                </div>
            </Dialog>
        </>
    );
}