import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPatientDetails from './components/AddPatientDetails';
import Device from './components/Device';
import Patient from './components/Patient';
import Nurse from './components/Nurse';
import AddDeviceDetails from './components/AddDeviceDetails';
import AddNurseDetail from './components/AddNurseDetail';
import MainHeader from './MainHeader'
import HomePage from './HomePage';
import Error from './Error';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import UserDevice from './components/UserDevice';
import UserPatient from './components/UserPatient';
import UserNurse from './components/UserNurse';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthWrapper from './AuthWrapper';
import NurseDetail from './components/NurseDetails';
import UserPatients from './components/NurseAssignedPatientDetails';
import NurseDevice from './components/NurseAssignedDevice';

import UpdatePatient from './components/UpdatePatient';
import UpdateNurse from './components/UpdateNurse';
import UpdateDevice from './components/UpdateDevice';
import GoogleSignIn from './components/GoogleSignIn';




function App(props) {
    return <BrowserRouter>
    <ToastContainer/>
        <Routes>
            <Route index element={<SignupForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='google' element={<GoogleSignIn/>}/>
               
                <Route path='/' element={<AuthWrapper><MainHeader/></AuthWrapper>}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/patient' element={<Patient />} />
                <Route path='/nurse' element={<Nurse />} />
                <Route path='/device' element={<Device />} />
                <Route path='/addpatient' element={<AddPatientDetails />} />
                <Route path='/addnurse' element={<AddNurseDetail />} />
                <Route path='/adddevice' element={<AddDeviceDetails />} />
                <Route path='/UserDevice' element={<UserDevice />} />
                <Route path='/userPatient' element={<UserPatient />} />
                <Route path='/UserNurse' element={<UserNurse />} />
                <Route path='/nurseDetail' element={<NurseDetail/>}/>
                <Route path='/nurseAssignedPatientDetail' element={<UserPatients/>}/>
                <Route path ='/nurseAssignedDevice' element={<NurseDevice/>}/>
                <Route path='/update' element={<UpdatePatient/>}/>
                <Route path='updateNurse' element={<UpdateNurse/>} />
                <Route path='updateDevice' element={<UpdateDevice/>}/>
               
            </Route>
          

            <Route path='*' element={<Error />} />
        </Routes>

    </BrowserRouter>

}

export default App;
