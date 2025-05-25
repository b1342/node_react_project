import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { Button } from 'primereact/button';
import Login from '../homeComp/login'
import { useDispatch,useSelector } from 'react-redux';
import { logOut } from '../redux/tokenSlice';
import {useNavigate } from 'react-router-dom';
export default function Home() {
      const { token, role, user } = useSelector((state) => state.token);
      const dispatch = useDispatch();
      const navigate =useNavigate();
    //   const itemRenderer = (item) => (
        
    //     <a className="flex align-items-center p-menuitem-link">
    //         <span className={item.icon} />
    //         <span className="mx-2">{item.label}</span>
    //         {item.badge && <Badge className="ml-auto" value={item.badge} />}
    //         {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    //     </a>
    // );
    const items = [
        {
            label: 'בית',
            icon: 'pi pi-home',
            command:()=>{
                navigate('./')
               }
        },
        ,
        ...(role === null ? [{
        label: ' זמני תפילות',
        icon: 'pi pi-star',
            command: () => {
                navigate('./daveningTimes')
            }
        },{
            label: 'מראי מקומות',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./referenceSources')
               }
         }] : []),
         ...(role==="staff"|role==="manager" ? [
        {
            label: 'תלמידים',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./student')
               }     
        }] : []),
        ...(role!==null ? [
        {
            label: 'מבצעים',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./plan')
               }
        }] : []),
        ...(role==="manager" ? [
        {
            label: 'אנשי צוות',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./staff')
               }
        }] : []),
        ...(role==="student" ? [
        {
            label: 'הישגים',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./achievement')
               }
        }] : []),
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
        }
    ];
    const logout = () => {
            dispatch(logOut());
            navigate('./')
               
        }
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (

        <div className="flex align-items-center gap-2">
           { role == null ?<Login/>:
           <><Avatar label={user.name} size="large" shape="circle" className="mr-2" />
                   <h3>{role}</h3>
                   <Button onClick={() => { logout() }}> להתנתקות </Button></>}
           
        </div> 
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
        