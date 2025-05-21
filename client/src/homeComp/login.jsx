import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser,setRole } from '../redux/tokenSlice';
import { Navigate,useNavigate } from 'react-router-dom';
const Login = () => {
      const { token, role, user } = useSelector((state) => state.token);

    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:1111/api/auth/login', {
                identity_number: username,
                password
            }
        //     ,
        // {  headers:{"Authorization":`Bearer ${token}`}}
    );
            dispatch(setUser(res.data.user));
            dispatch(setRole(res.data.role));
            dispatch(setToken(res.data.accessToken));
            setError('');
            setVisible(false);
                navigate('./')
            // // כאן אפשר לשמור את הטוקן ב-localStorage או לבצע ניווט
            // localStorage.setItem('token', res.data.token);
            // window.location.reload(); // רענון הדף לאחר התחברות
        } catch (err) {
            setError('שם משתמש או סיסמה שגויים');
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Button label="התחברות" icon="pi pi-sign-in" onClick={() => setVisible(true)} />
            <Dialog
                header="התחברות למערכת"
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                style={{ minWidth: '350px' }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם משתמש
                            </label>
                            <InputText
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="שם משתמש"
                            />
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="password" className="text-primary-50 font-semibold">
                                סיסמה
                            </label>
                            <InputText
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="סיסמה"
                            />
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className="flex align-items-center gap-2">
                            <Button
                                label="התחבר"
                                onClick={handleLogin}
                                text
                                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                            />
                            <Button
                                label="ביטול"
                                onClick={() => setVisible(false)}
                                text
                                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                            />
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    );
};

export default Login;