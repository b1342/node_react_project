
import Home from './routes/home.jsx'

import { Route, Routes } from 'react-router-dom'
import PublicGallery from './homeComp/gallery.jsx';
import DaveningTimes from './homeComp/daveningTimes.jsx';
import ReferenceSources from './homeComp/referenceSources.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch,useSelector } from 'react-redux';
import Gallery from './Component/gallery.jsx';
import Achievement from './Component/achievement.jsx'
import Plan from './Component/plan.jsx'
import Staff from './Component/staff.jsx';
import Student from './Component/student.jsx';
import HonePage from './routes/homeManager.jsx';
function App() {
      const { token, role, user } = useSelector((state) => state.token);

    return (
        <div className="App">
            <Home/>
            <Routes>
                <Route path='/' element={<HonePage />} />
                <Route path='/daveningTimes' element={<DaveningTimes />} />
                <Route path='/referenceSources' element={<ReferenceSources />} />
                <Route path='/gallery' element={<Gallery/>} />
                <Route path='/achievement' element={<Achievement />} />
                <Route path='/plan' element={<Plan/>} />
                <Route path='/student' element={<Student />} />
                <Route path='/staff' element={<Staff/>} />
            </Routes>
        </div>);
}

export default App;

