
import Home from './routes/home.jsx'

import { Route, Routes } from 'react-router-dom'
import Gallery from './routes/gallery.jsx';
import DaveningTimes from './routes/daveningTimes.jsx';
import ReferenceSources from './routes/referenceSources.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch,useSelector } from 'react-redux';
import HomeStudent from './routes/homeStudent.jsx';
export const baseURL = 'http://localhost:0011/api/';

function App() {
      const { token, role, user } = useSelector((state) => state.token);

    return (
        <div className="App">
          {  role=="student"?<HomeStudent />:<Home></Home>}
            <Routes>
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/daveningTimes' element={<DaveningTimes />} />
                <Route path='/referenceSources' element={<ReferenceSources />} />
            </Routes>
        </div>);
}

export default App;

