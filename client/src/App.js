
import Routerss from './routes/routes.jsx'

import { Route, Routes } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch,useSelector } from 'react-redux';
import Gallery from './routes/gallery.jsx';
import Achievement from './routes/achievement.jsx'
import Plan from './routes/plan.jsx'
import Staff from './routes/staff.jsx';
import Student from './routes/student.jsx';
import HonePage from './routes/homePage.jsx';
function App() {
      const { token, role, user } = useSelector((state) => state.token);

    return (
        <div className="App">
            <Routerss/> 
            <Routes>
                <Route path='/' element={<HonePage />} />
                <Route path='/' element={<HonePage />} />
                <Route path='/daveningTimes' element={<Gallery />} />
                <Route path='/referenceSources' element={<Gallery />} />
                <Route path='/gallery' element={<Gallery/>} />
                <Route path='/achievement' element={<Achievement />} />
                <Route path='/plan' element={<Plan/>} />
                <Route path='/student' element={<Student />} />
                <Route path='/staff' element={<Staff/>} />
            </Routes>
        </div>);
}

export default App;

