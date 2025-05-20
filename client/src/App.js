
import Home from './routes/home.jsx'

import { Route, Routes } from 'react-router-dom'
import Gallery from './homeComp/gallery.jsx';
import DaveningTimes from './homeComp/daveningTimes.jsx';
import ReferenceSources from './homeComp/referenceSources.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch,useSelector } from 'react-redux';
import HomeStudent from './routes/homeStudent.jsx';
import HomeManager from './routes/homeManager.jsx';
import HomeStaff from './routes/homeStaff.jsx';
export const baseURL = 'http://localhost:0011/api/';

function App() {
      const { token, role, user } = useSelector((state) => state.token);

    return (
        <div className="App">
          {  role=="student"?<HomeStudent />:role=="manager"?<HomeManager/>:role=="staff"?<HomeStaff/>:<Home></Home>}
            <Routes>
                <Route path='home/gallery' element={<Gallery/>} />
                <Route path='home/daveningTimes' element={<DaveningTimes />} />
                <Route path='home/referenceSources' element={<ReferenceSources />} />
            </Routes>
        </div>);
}

export default App;

