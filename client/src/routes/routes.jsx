import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';  
import { Button } from 'primereact/button';
import Login from '../homeComp/login'
import { useDispatch,useSelector } from 'react-redux';
import { logOut } from '../redux/tokenSlice';
import {useNavigate } from 'react-router-dom';
const Routerss=()=> {
      const { token, role, user } = useSelector((state) => state.token);
      const dispatch = useDispatch();
      const navigate =useNavigate();
    const items = [
        ...(role === null ? [{
            label: 'בית',
            icon: 'pi pi-home',
            command:()=>{
                navigate('./')
               }
        }
        ,
        {
        label: ' זמני תפילות',
        icon: 'pi pi-star',
            command: () => {
                navigate('./gallery', { state: { type: 'zmaney_tfilot' } })
            }
        },{
            label: 'מראי מקומות',
            icon: 'pi pi-star',
            command:()=>{
                navigate('./gallery' ,{ state: { type: 'marhey_mekomot' } })
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
                ...(role === 'manager' ? [{
                    label: 'מראי מקומות',
                    icon: 'pi pi-pencil',
                    command:()=>{
                        navigate('./gallery', { state: { type: 'marhey_mekomot' } });
                       }
                    
                },
                {
                    label: 'זמני תפילות',
                    icon: 'pi pi-pencil',
                    command:()=>{
                        navigate('./gallery', { state: { type: 'zmaney_tfilot' } });
                       }
                    
                }] : []),
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
    const start = <img alt="logo" src="/bircatFavicon.jpg" height="40" className="mr-2"></img>;
    const end = (

        <div className="flex align-items-center gap-2">
           { role == null ?<Login/>:
           <><Avatar label={user.name} size="large" shape="circle" className="mr-2" />
                   <h3>{role==='manager'?'מנהל':role==='staff'?'איש צוות ':'תלמיד'}</h3>
                   <Button onClick={() => { logout() }}> להתנתקות </Button></>}
           
        </div> 
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
export default Routerss;        