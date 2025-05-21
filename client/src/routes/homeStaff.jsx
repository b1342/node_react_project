import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import Login from '../homeComp/login'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { logOut } from '../redux/tokenSlice';
import { Navigate,useNavigate } from 'react-router-dom';
export default function HomeStaff() {
    const { token, role, user } = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const itemRenderer = (item) => (

        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'בית',
            icon: 'pi pi-home',
            command:()=>{
                navigate('./');
               }
        },
        {
            label: 'תלמידים',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./student')
               }
        },
        {
            label: 'מבצעים',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./plan')
               }
        },
        {
            label: 'גלריה',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'מהזמן האחרון',
                    icon: 'pi pi-bolt',
                    command:()=>{
                        navigate('./gallery', { state: { type: 'from_the_last_time' } });
                       }
                },
                {
                    label: 'יום בישיבה',
                    icon: 'pi pi-server',
                    command:()=>{
                        navigate('./gallery', { state: { type: 'day_in_yeshiva' } });
                       }
                    
                },
                {
                    label: 'סיומים',
                    icon: 'pi pi-pencil',
                    command:()=>{
                        navigate('./gallery', { state: { type: 'syumim' } });
                       }
                    
                },
                {
                    label: 'טיולים',
                    icon: 'pi pi-pencil',
                    command:()=>{
                        navigate('./gallery', { state: { type: 'trips' } });
                       }
                    
                },
                {
                    separator: true
                }
            ]
        },
        
    ];
    const logout = () => {
        dispatch(logOut());
        navigate('./')
    }
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            
            <Avatar label={user.name} size="large" shape="circle" className="mr-2" />
            <h3>{role}</h3>
            <Button onClick={() => { logout() }}> להתנתקות </Button>
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
